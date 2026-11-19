export function capitalize(word) {
  return word.chartAt(0).toUpperCase() + word.slice(1);
}
