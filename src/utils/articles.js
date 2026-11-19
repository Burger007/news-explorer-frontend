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
