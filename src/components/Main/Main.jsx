import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";
import About from "../About/About";

function Main({
  onSearch,
  isSearching,
  hasSearched,
  searchError,
  articles,
  visibleCount,
  onShowMore,
  isLoggedIn,
}) {
  return (
    <main className="main">
      <section className="main__hero">
        <h1 className="main__title">What&apos;s going on in the world?</h1>
        <p className="main__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm onSearch={onSearch} isSearching={isSearching} />
      </section>
      <SearchResults
        isSearching={isSearching}
        hasSearched={hasSearched}
        error={searchError}
        articles={articles}
        visibleCount={visibleCount}
        onShowMore={onShowMore}
        isLoggedIn={isLoggedIn}
      />
      <About />
    </main>
  );
}

export default Main;
