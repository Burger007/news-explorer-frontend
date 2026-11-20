export const NEWS_API_KEY = "ac3ee6251ec64ab497f90a647bacce08";

export const NEWS_API_BASE_URL = import.meta.env.PROD
  ? "https://news-api-proxy.up.railway.app/news/v2/everything"
  : "https://newsapi.org/v2/everything";

export const PAGE_SIZE = 100;
export const SEARCH_PERIOD_DAYS = 7;
export const CARDS_PER_STEP = 3;

export const SEARCH_ERROR_MESSAGE =
  "Sorry, something went wrong during the request. Please try again later.";

export const EMPTY_KEYWORD_MESSAGE = "Please enter a keyword";
