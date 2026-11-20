export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getKeywordsSummary(articles) {
  const counts = {};
  articles.forEach(({ keyword }) => {
    const name = capitalize(keyword);
    counts[name] = (counts[name] || 0) + 1;
  });
  const keywords = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

  if (keywords.length <= 3) return keywords.join(", ");
  return `${keywords[0]}, ${keywords[1]}, and ${keywords.length - 2} other`;
}
export function normalizeArticles(rawArticles, keyword) {
  const seenLinks = new Set();
  const articles = [];

  rawArticles.forEach((item) => {
    const isRemoved = !item.title || item.title === "[Removed]";
    if (isRemoved || !item.url || seenLinks.has(item.url)) return;
    seenLinks.add(item.url);
    articles.push({
      keyword,
      title: item.title,
      text: item.description || "",
      date: item.publishedAt,
      source: item.source?.name || "",
      link: item.url,
      image: item.urlToImage,
    });
  });

  return articles;
}
