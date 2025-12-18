#!/usr/bin/env node

const { glob } = require('glob')
const path = require('path')
const fs = require('fs').promises
const sharp = require('sharp')

const ARTICLES_DIR = path.join(__dirname, '..', 'src', 'app', 'articles')
const MARKERS_DIR = path.join(
  __dirname,
  '..',
  'node_modules',
  '.cache',
  'image-compression',
)

async function getImageFiles() {
  const patterns = ['**/*.jpg', '**/*.jpeg', '**/*.png']

  const files = []
  for (const pattern of patterns) {
    const matches = await glob(pattern, {
      cwd: ARTICLES_DIR,
      absolute: true,
      nodir: true,
    })
    files.push(...matches)
  }

  return files
}

async function isAlreadyCompressed(filePath) {
  const relativePath = path.relative(ARTICLES_DIR, filePath)
  const markerPath = path.join(MARKERS_DIR, relativePath + '.marker')
  try {
    const markerStat = await fs.stat(markerPath)
    const fileStat = await fs.stat(filePath)
    // If marker exists and is newer than the file, skip compression
    return markerStat.mtime > fileStat.mtime
  } catch {
    return false
  }
}

async function markAsCompressed(filePath) {
  const relativePath = path.relative(ARTICLES_DIR, filePath)
  const markerPath = path.join(MARKERS_DIR, relativePath + '.marker')
  await fs.mkdir(path.dirname(markerPath), { recursive: true })
  await fs.writeFile(markerPath, new Date().toISOString())
}

async function compressImage(filePath) {
  if (await isAlreadyCompressed(filePath)) {
    console.log(
      `⏭️  Skipping ${path.relative(ARTICLES_DIR, filePath)} (already compressed)`,
    )
    return null
  }

  const ext = path.extname(filePath).toLowerCase()

  const originalStats = await fs.stat(filePath)
  const originalSize = originalStats.size

  try {
    const image = sharp(filePath)
    const metadata = await image.metadata()

    // Compress based on file type
    if (ext === '.jpg' || ext === '.jpeg') {
      await image.jpeg({ quality: 85, mozjpeg: true }).toFile(filePath + '.tmp')
    } else if (ext === '.png') {
      await image
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(filePath + '.tmp')
    } else {
      return null
    }

    // Replace original with compressed
    await fs.rename(filePath + '.tmp', filePath)

    const newStats = await fs.stat(filePath)
    const newSize = newStats.size
    const savings = (((originalSize - newSize) / originalSize) * 100).toFixed(1)

    // Only mark as compressed if we actually saved space
    if (newSize < originalSize) {
      await markAsCompressed(filePath)

      return {
        path: path.relative(ARTICLES_DIR, filePath),
        originalSize,
        newSize,
        savings: parseFloat(savings),
      }
    } else {
      // If the compressed version is larger, we still mark it to avoid recompressing
      await markAsCompressed(filePath)
      console.log(
        `⚠️  ${path.relative(ARTICLES_DIR, filePath)}: compressed version was larger, keeping original`,
      )
      return null
    }
  } catch (error) {
    console.error(
      `❌ Error compressing ${path.relative(ARTICLES_DIR, filePath)}:`,
      error.message,
    )
    // Clean up temp file if it exists
    try {
      await fs.unlink(filePath + '.tmp')
    } catch {}
    return null
  }
}

async function main() {
  console.log('🔍 Finding images in articles...')
  const imageFiles = await getImageFiles()
  console.log(`📸 Found ${imageFiles.length} images\n`)

  const results = []

  for (const file of imageFiles) {
    const result = await compressImage(file)
    if (result) {
      results.push(result)
      const originalMB = (result.originalSize / 1024 / 1024).toFixed(2)
      const newMB = (result.newSize / 1024 / 1024).toFixed(2)
      console.log(
        `✅ ${result.path}: ${originalMB}MB → ${newMB}MB (${result.savings}% reduction)`,
      )
    }
  }

  if (results.length > 0) {
    console.log('\n📊 Summary:')
    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0)
    const totalNew = results.reduce((sum, r) => sum + r.newSize, 0)
    const totalSavings = (
      ((totalOriginal - totalNew) / totalOriginal) *
      100
    ).toFixed(1)

    console.log(`   Total compressed: ${results.length} images`)
    console.log(
      `   Original size: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB`,
    )
    console.log(`   New size: ${(totalNew / 1024 / 1024).toFixed(2)}MB`)
    console.log(`   Total savings: ${totalSavings}%`)
  } else {
    console.log('\n✨ All images are already compressed!')
  }
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
