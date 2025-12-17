import glob from 'fast-glob'
import { dirname, join, relative, resolve } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

interface Article {
  title: string
  description: string
  author: string
  date: string
  lang?: string
  slug: string
}

export interface ArticleWithSlug extends Article {
  slug: string
  hasTranslation: boolean
  folder: string
}

// Cache for slug -> folder mapping
let slugToFolderCache: Map<string, string> | null = null;

async function buildSlugToFolderMap(): Promise<Map<string, string>> {
  if (slugToFolderCache) {
    return slugToFolderCache;
  }

  const slugToFolder = new Map<string, string>();
  
  // Get all article files
  const localeFiles = await glob('*/{en,fr}/page.mdx', {
    cwd: './src/app/articles',
  });
  
  const legacyFiles = await glob('*/page.mdx', {
    cwd: './src/app/articles',
  });

  // Process locale-specific files first (prioritize these)
  for (const file of localeFiles) {
    if (file.includes('/en/page.mdx')) {
      const folder = file.replace('/en/page.mdx', '');
      const articleModule = await import(`../app/articles/${file}`);
      const slug = articleModule.article?.slug || folder;
      if (!slugToFolder.has(slug)) {
        slugToFolder.set(slug, folder);
      }
    }
  }
  
  // Process legacy files (only if slug not already mapped)
  for (const file of legacyFiles) {
    const folder = file.replace('/page.mdx', '');
    const articleModule = await import(`../app/articles/${file}`);
    const slug = articleModule.article?.slug || folder;
    if (!slugToFolder.has(slug)) {
      slugToFolder.set(slug, folder);
    }
  }
  
  slugToFolderCache = slugToFolder;
  return slugToFolder;
}

async function importArticle(
  articleFilename: string,
  locale: string = 'en'
): Promise<ArticleWithSlug | null> {
  let articleModule;
  let folder: string;
  
  // Check if this is already a locale-specific file (e.g., "folder/en/page.mdx")
  if (articleFilename.includes(`/${locale}/page.mdx`)) {
    articleModule = await import(`../app/articles/${articleFilename}`);
    folder = articleFilename.replace(`/${locale}/page.mdx`, '');
  } else if (articleFilename.endsWith('/page.mdx')) {
    // Legacy structure - try to load based on locale
    const baseFolder = articleFilename.replace('/page.mdx', '');
    folder = baseFolder;
    
    // Try to import the locale-specific version first
    const localeSpecificPath = `${baseFolder}/${locale}/page.mdx`;
    try {
      articleModule = await import(`../app/articles/${localeSpecificPath}`);
    } catch {
      // If locale-specific doesn't exist, try the original structure
      if (locale === 'en') {
        // For English, try the main page.mdx
        articleModule = await import(`../app/articles/${articleFilename}`);
      } else {
        // For French, try translated.mdx
        const translatedPath = articleFilename.replace('/page.mdx', '/translated.mdx');
        const mainModule = await import(`../app/articles/${articleFilename}`);
        const translatedModule = await import(`../app/articles/${translatedPath}`);
        
        // Combine metadata from main with content from translated
        articleModule = {
          article: {
            ...mainModule.article,
            lang: 'fr'
          },
          default: translatedModule.default
        };
      }
    }
  } else {
    return null;
  }

  const { article } = articleModule as {
    default: React.ComponentType
    article: Article
  };

  if (!article) {
    return null;
  }

  // Use slug from article metadata, fallback to folder name
  const slug = article.slug || folder;

  // Check if there are other locale versions
  const otherLocale = locale === 'en' ? 'fr' : 'en';
  const otherLocalePath = join('./src/app/articles', folder, otherLocale, 'page.mdx');
  const translatedFile = join('./src/app/articles', folder, 'translated.mdx');
  
  const hasTranslation = existsSync(otherLocalePath) || existsSync(translatedFile);

  // Destructure to exclude slug from article (we use our computed slug instead)
  const { slug: _articleSlug, ...articleWithoutSlug } = article;

  return {
    ...articleWithoutSlug,
    slug,
    folder,
    hasTranslation,
  }
}

export async function getAllArticles(locale?: string) {
  // Get both legacy structure and new locale structure files
  let legacyFiles = await glob('*/page.mdx', {
    cwd: './src/app/articles',
  });
  
  let localeFiles = await glob('*/{en,fr}/page.mdx', {
    cwd: './src/app/articles',
  });

  // If no locale is specified, use the original behavior (English only)
  if (!locale) {
    // Build a map of folders to their preferred file path
    const folderToFile = new Map<string, string>();
    
    // First pass: collect all locale-specific files (prioritize these)
    for (const file of localeFiles) {
      if (file.includes('/en/page.mdx')) {
        const folder = file.replace('/en/page.mdx', '');
        folderToFile.set(folder, file);
      }
    }
    
    // Second pass: add legacy files only if not already present
    for (const file of legacyFiles) {
      const folder = file.replace('/page.mdx', '');
      if (!folderToFile.has(folder)) {
        folderToFile.set(folder, file);
      }
    }
    
    // Convert map to array of files to process
    const filesToProcess = Array.from(folderToFile.values());
    
    let articles = await Promise.all(
      filesToProcess.map(filename => importArticle(filename, 'en'))
    );
    
    // Deduplicate by slug (in case multiple folders have same slug)
    const seenSlugs = new Set<string>();
    return articles
      .filter((article): article is ArticleWithSlug => {
        if (article === null) return false;
        if (seenSlugs.has(article.slug)) return false;
        seenSlugs.add(article.slug);
        return true;
      })
      .sort((a, z) => +new Date(z.date) - +new Date(a.date))
  }

  // For a specific locale, get unique folders and prefer locale-specific files
  const allFiles = [...legacyFiles, ...localeFiles];
  const uniqueFolders = new Set<string>();
  const filesToProcess: string[] = [];
  
  for (const file of allFiles) {
    let folder: string;
    if (file.includes(`/${locale}/page.mdx`)) {
      folder = file.replace(`/${locale}/page.mdx`, '');
    } else if (file.includes('/en/page.mdx') || file.includes('/fr/page.mdx')) {
      // Skip other locale files
      continue;
    } else {
      folder = file.replace('/page.mdx', '');
    }
    
    if (!uniqueFolders.has(folder)) {
      uniqueFolders.add(folder);
      // Prefer the specific locale version if it exists
      const localeFile = `${folder}/${locale}/page.mdx`;
      if (localeFiles.includes(localeFile)) {
        filesToProcess.push(localeFile);
      } else {
        filesToProcess.push(`${folder}/page.mdx`); // Try legacy structure
      }
    }
  }

  let articles = await Promise.all(
    filesToProcess.map(filename => importArticle(filename, locale))
  );

  // Deduplicate by slug and filter out nulls, then sort by date
  const seenSlugs = new Set<string>();
  return articles
    .filter((article): article is ArticleWithSlug => {
      if (article === null) return false;
      if (seenSlugs.has(article.slug)) return false;
      seenSlugs.add(article.slug);
      return true;
    })
    .sort((a, z) => +new Date(z.date) - +new Date(a.date))
}

export async function getArticle(slug: string, locale: string = 'en') {
  // Build slug -> folder mapping
  const slugToFolder = await buildSlugToFolderMap();
  const folder = slugToFolder.get(slug);
  
  if (!folder) {
    throw new Error(`Article not found: ${slug} in ${locale}`);
  }
  
  const localeSpecificPath = `${folder}/${locale}/page.mdx`;
  let articleModule;
  
  try {
    articleModule = await import(`../app/articles/${localeSpecificPath}`);
  } catch {
    // Fallback to old structure
    if (locale === 'en') {
      articleModule = await import(`../app/articles/${folder}/page.mdx`);
    } else {
      const mainModule = await import(`../app/articles/${folder}/page.mdx`);
      const translatedModule = await import(`../app/articles/${folder}/translated.mdx`);
      
      articleModule = {
        article: {
          ...mainModule.article,
          lang: 'fr'
        },
        default: translatedModule.default
      };
    }
  }

  return articleModule;
}

function toPosixPath(p: string) {
  return p.replace(/\\/g, '/')
}

type ImageImport = {
  name: string
  from: string
}

function extractImageImports(mdx: string): ImageImport[] {
  const imports: ImageImport[] = []
  const importRe =
    /^import\s+([A-Za-z0-9_$]+)\s+from\s+['"]([^'"]+\.(?:png|jpe?g|webp|gif|svg))['"];?\s*$/gm

  let match: RegExpExecArray | null
  while ((match = importRe.exec(mdx)) !== null) {
    imports.push({ name: match[1], from: match[2] })
  }

  return imports
}

function extractFirstUsedImageName(mdx: string, importNames: Set<string>) {
  const usageRe =
    /<(Image|Figure)\b[^>]*\bsrc=\{([A-Za-z0-9_$]+)\}[^>]*>/g

  let match: RegExpExecArray | null
  while ((match = usageRe.exec(mdx)) !== null) {
    const name = match[2]
    if (importNames.has(name)) return name
  }

  return null
}

/**
 * Returns a Next-emitted image `src` (e.g. `/_next/static/media/...`) for the first
 * image used in an article MDX, or null if none can be resolved.
 *
 * Intended for server-side metadata (OG/Twitter cards).
 */
export async function getArticleOgImageSrc(
  slug: string,
  locale: string = 'en',
): Promise<string | null> {
  try {
    const slugToFolder = await buildSlugToFolderMap()
    const folder = slugToFolder.get(slug)
    if (!folder) return null

    const articlesRootAbs = join(process.cwd(), 'src', 'app', 'articles')

    const mdxCandidates = [
      join(articlesRootAbs, folder, locale, 'page.mdx'),
      join(articlesRootAbs, folder, 'page.mdx'),
    ]

    const mdxAbsPath = mdxCandidates.find(p => existsSync(p))
    if (!mdxAbsPath) return null

    const mdx = await readFile(mdxAbsPath, 'utf8')
    const imageImports = extractImageImports(mdx)
    if (imageImports.length === 0) return null

    const importMap = new Map(imageImports.map(i => [i.name, i.from]))
    const firstUsedName = extractFirstUsedImageName(
      mdx,
      new Set(importMap.keys()),
    )

    const importFrom = firstUsedName
      ? importMap.get(firstUsedName) ?? null
      : imageImports[0].from

    if (!importFrom) return null

    const imageAbsPath = resolve(dirname(mdxAbsPath), importFrom)
    if (!imageAbsPath.startsWith(articlesRootAbs)) return null

    const relFromArticlesRoot = toPosixPath(relative(articlesRootAbs, imageAbsPath))

    // Import from src/lib/articles.ts -> src/app/articles/<...>
    const mod = (await import(
      `../app/articles/${relFromArticlesRoot}`
    )) as unknown as { default?: unknown }

    const img: any = (mod as any).default ?? mod
    if (typeof img === 'string') return img
    if (img && typeof img.src === 'string') return img.src
    return null
  } catch {
    return null
  }
}
