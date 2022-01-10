import { blogArticles } from '../src/Layout/structure'

const articles = blogArticles.reverse()

const items = articles
  .map(
    (article) =>
      `    <item>
      <title>${article.title}</title>
      <link>https://catchts.com${article.url}</link>
      <guid>${article.url}</guid>
      <pubDate>${new Date(article.date).toISOString()}</pubDate>
      <description>${article.description}</description>
    </item>`,
  )
  .join('\n')

export const rss = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
  <channel>
    <title>Catch TS</title>
    <link>https://catchts.com</link>
    <description>Here you can find some non-trivial typescript examples taken from real life.</description>
    ${items}
  </channel>
</rss>`
