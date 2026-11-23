import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";
import NewsCardList from "../NewsCardList/NewsCardList";
import "./SearchResults.css";

function SearchResults({
  isSearching,
  hasSearched,
  error,
  articles,
  visibleCount,
  onShowMore,
  isLoggedIn,
  savedArticles,
  onSaveClick,
}) {
  if (!hasSearched) return null;

  function renderContent() {
    if (isSearching) return <Preloader />;
    if (error) return <p className="search-results__error">{error}</p>;
    if (articles.length === 0) return <NotFound />;
    return (
      <>
        <h2 className="search-results__title">Search results</h2>
        <NewsCardList
          articles={articles.slice(0, visibleCount)}
          type="search"
          isLoggedIn={isLoggedIn}
          savedArticles={savedArticles}
          onSaveClick={onSaveClick}
        />
        {visibleCount < articles.length && (
          <button
            type="button"
            className="search-results__more"
            onClick={onShowMore}
          >
            Show more
          </button>
        )}
      </>
    );
  }

  return <section className="search-results">{renderContent()}</section>;
}

export default SearchResults;
