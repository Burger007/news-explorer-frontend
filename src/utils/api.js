import { SAVED_ARTICLES_KEY } from "./constants";

function readSavedArticles() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_ARTICLES_KEY)) || [];
  } catch {
    return [];
  }
}

function writeSavedArticles(articles) {
  localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(articles));
}

function generateId() {
  return Array.from({ length: 24 }, () =>
    Math.floor(Math.random() * 16).toString(16),
  ).join("");
}

export function getItems() {
  return Promise.resolve(readSavedArticles());
}

export function saveArticle(article) {
  const savedArticle = { ...article, _id: generateId() };
  writeSavedArticles([savedArticle, ...readSavedArticles()]);
  return Promise.resolve(savedArticle);
}

export function deleteArticle(articleId) {
  writeSavedArticles(
    readSavedArticles().filter((item) => item._id !== articleId),
  );
  return Promise.resolve({ message: "Article deleted" });
}
