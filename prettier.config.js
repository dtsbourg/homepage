/** @type {import('prettier').Options} */
module.exports = {
  singleQuote: true,
  semi: false,
  plugins: ['prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: ['*.md', '*.mdx'],
      options: {
        // Wrap prose to avoid single long lines in articles.
        proseWrap: 'always',
        printWidth: 100,
      },
    },
  ],
}
