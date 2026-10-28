#!/usr/bin/env node

// Downscales source images that are far larger than the site ever displays.
// next/image already serves optimized variants, so this only keeps the repo
// and build inputs small. Idempotent: resized files fall under MAX_EDGE and
// are skipped on the next run.
//
// Usage: npm run images:compress

const fg = require('fast-glob')
const path = require('path')
const fs = require('fs').promises
const sharp = require('sharp')

const ROOT = path.join(__dirname, '..')
const PATTERNS = [
  'src/app/_articles/**/*.{jpg,jpeg,png}',
  'src/images/**/*.{jpg,jpeg,png}',
]
// Article prose is ~670px wide, so 2400px covers 3x displays.
const MAX_EDGE = 2400
// Leave small files (mostly screenshots and charts) alone.
const MIN_BYTES = 300 * 1024

function mb(bytes) {
  return (bytes / 1024 / 1024).toFixed(2)
}

async function compressImage(file) {
  const { size } = await fs.stat(file)
  const { width, height } = await sharp(file).metadata()

  if (Math.max(width, height) <= MAX_EDGE || size < MIN_BYTES) {
    return null
  }

  // rotate() applies EXIF orientation before metadata is stripped
  let pipeline = sharp(file)
    .rotate()
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .keepIccProfile()

  pipeline = /\.png$/i.test(file)
    ? pipeline.png({ compressionLevel: 9 })
    : pipeline.jpeg({ quality: 82, mozjpeg: true })

  const output = await pipeline.toBuffer()

  if (output.length >= size) {
    return null
  }

  await fs.writeFile(file, output)
  return { file: path.relative(ROOT, file), before: size, after: output.length }
}

async function main() {
  const files = await fg(PATTERNS, { cwd: ROOT, absolute: true })
  const results = []

  for (const file of files) {
    try {
      const result = await compressImage(file)
      if (result) {
        results.push(result)
        console.log(
          `${result.file}: ${mb(result.before)}MB → ${mb(result.after)}MB`,
        )
      }
    } catch (error) {
      console.error(`Error compressing ${file}:`, error.message)
    }
  }

  if (results.length === 0) {
    console.log('All images are already within limits.')
    return
  }

  const before = results.reduce((sum, r) => sum + r.before, 0)
  const after = results.reduce((sum, r) => sum + r.after, 0)
  console.log(
    `\n${results.length} images: ${mb(before)}MB → ${mb(after)}MB (${(
      (1 - after / before) *
      100
    ).toFixed(0)}% smaller)`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
