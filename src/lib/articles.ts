import glob from 'fast-glob'
import { join } from 'path';
import { existsSync } from 'fs';

interface Article {
  title: string
  description: string
  author: string
  date: string
  lang?: string
}

export interface ArticleWithSlug extends Article {
  slug: string
  hasTranslation: boolean
}

async function importArticle(
  articleFilename: string,
  locale: string = 'en'
): Promise<ArticleWithSlug | null> {
  try {
    let articleModule;
    let slug: string;
    
    // Check if this is already a locale-specific file (e.g., "slug/en/page.mdx")
    if (articleFilename.includes(`/${locale}/page.mdx`)) {
      articleModule = await import(`../app/articles/${articleFilename}`);
      slug = articleFilename.replace(`/${locale}/page.mdx`, '');
    } else if (articleFilename.endsWith('/page.mdx')) {
      // Legacy structure - try to load based on locale
      const baseSlug = articleFilename.replace('/page.mdx', '');
      slug = baseSlug;
      
      // Try to import the locale-specific version first
      const localeSpecificPath = `${baseSlug}/${locale}/page.mdx`;
      try {
        articleModule = await import(`../app/articles/${localeSpecificPath}`);
      } catch (error) {
        // If locale-specific doesn't exist, try the original structure
        if (locale === 'en') {
          // For English, try the main page.mdx
          articleModule = await import(`../app/articles/${articleFilename}`);
        } else {
          // For French, try translated.mdx
          const translatedPath = articleFilename.replace('/page.mdx', '/translated.mdx');
          try {
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
          } catch (translatedError) {
            return null; // No translation available
          }
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

    // Check if there are other locale versions
    const folder = slug;
    const otherLocale = locale === 'en' ? 'fr' : 'en';
    const otherLocalePath = join('./src/app/articles', folder, otherLocale, 'page.mdx');
    const translatedFile = join('./src/app/articles', folder, 'translated.mdx');
    
    const hasTranslation = existsSync(otherLocalePath) || existsSync(translatedFile);

    return {
      slug: folder,
      ...article,
      hasTranslation,
    }
  } catch (error) {
    console.error(`Error importing article ${articleFilename}:`, error);
    return null;
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
    // Combine all unique article slugs
    const allFiles = [...legacyFiles, ...localeFiles];
    const uniqueSlugs = new Set<string>();
    const filesToProcess: string[] = [];
    
    for (const file of allFiles) {
      let slug: string;
      if (file.includes('/en/page.mdx')) {
        slug = file.replace('/en/page.mdx', '');
      } else {
        slug = file.replace('/page.mdx', '');
      }
      
      if (!uniqueSlugs.has(slug)) {
        uniqueSlugs.add(slug);
        // Prefer the EN locale version if it exists, otherwise use legacy
        const enFile = `${slug}/en/page.mdx`;
        if (localeFiles.includes(enFile)) {
          filesToProcess.push(enFile);
        } else {
          filesToProcess.push(file);
        }
      }
    }
    
    let articles = await Promise.all(
      filesToProcess.map(filename => importArticle(filename, 'en'))
    );
    return articles
      .filter((article): article is ArticleWithSlug => article !== null)
      .sort((a, z) => +new Date(z.date) - +new Date(a.date))
  }

  // For a specific locale, get unique slugs and prefer locale-specific files
  const allFiles = [...legacyFiles, ...localeFiles];
  const uniqueSlugs = new Set<string>();
  const filesToProcess: string[] = [];
  
  for (const file of allFiles) {
    let slug: string;
    if (file.includes(`/${locale}/page.mdx`)) {
      slug = file.replace(`/${locale}/page.mdx`, '');
    } else if (file.includes('/en/page.mdx') || file.includes('/fr/page.mdx')) {
      // Skip other locale files
      continue;
    } else {
      slug = file.replace('/page.mdx', '');
    }
    
    if (!uniqueSlugs.has(slug)) {
      uniqueSlugs.add(slug);
      // Prefer the specific locale version if it exists
      const localeFile = `${slug}/${locale}/page.mdx`;
      if (localeFiles.includes(localeFile)) {
        filesToProcess.push(localeFile);
      } else {
        filesToProcess.push(`${slug}/page.mdx`); // Try legacy structure
      }
    }
  }

  let articles = await Promise.all(
    filesToProcess.map(filename => importArticle(filename, locale))
  );

  // Filter out null results and sort by date
  return articles
    .filter((article): article is ArticleWithSlug => article !== null)
    .sort((a, z) => +new Date(z.date) - +new Date(a.date))
}

// Legacy function for backward compatibility
export async function getArticle(slug: string, locale: string = 'en') {
  try {
    const localeSpecificPath = `${slug}/${locale}/page.mdx`;
    let articleModule;
    
    try {
      articleModule = await import(`../app/articles/${localeSpecificPath}`);
    } catch (error) {
      // Fallback to old structure
      if (locale === 'en') {
        articleModule = await import(`../app/articles/${slug}/page.mdx`);
      } else {
        const mainModule = await import(`../app/articles/${slug}/page.mdx`);
        const translatedModule = await import(`../app/articles/${slug}/translated.mdx`);
        
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
  } catch (error) {
    throw new Error(`Article not found: ${slug} in ${locale}`);
  }
}
