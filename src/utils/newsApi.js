import {
  NEWS_API_BASE_URL,
  NEWS_API_KEY,
  PAGE_SIZE,
  SEARCH_PERIOD_DAYS,
} from "./constants";

function toIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

function checkResponse(res) {
  return res.ok
    ? res.json()
    : Promise.reject(new Error(`Error: ${res.status}`));
}

export function searchNews(keyword) {
  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setDate(toDate.getDate() - SEARCH_PERIOD_DAYS);

  const params = new URLSearchParams({
    q: keyword,
    from: toIsoDate(fromDate),
    to: toIsoDate(toDate),
    pageSize: PAGE_SIZE,
    apiKey: NEWS_API_KEY,
  });

  return fetch(`${NEWS_API_BASE_URL}?${params}`).then(checkResponse);
}
