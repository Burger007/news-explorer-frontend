import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import NewsCard from "../NewsCard/NewsCard";

function Main() {
  return (
    <main className="main">
      <section className="main__hero">
        <h1 className="main__title">What&apos;s going on in the world?</h1>
        <p className="main__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm />
      </section>
      <div
        style={{
          maxWidth: 400,
          margin: "40px auto",
          background: "#f5f6f7",
          padding: 24,
        }}
      >
        <NewsCard
          type="search"
          isLoggedIn={false}
          article={{
            keyword: "nature",
            title: "A Special 'Sit Spot' in Nature",
            text: "Test paragraph to check how the card cuts long text after four lines on desktop and three on tablet.",
            date: "2020-11-04T10:00:00Z",
            source: "Treehugger",
            link: "https://www.treehugger.com",
            image: null,
          }}
        />
      </div>
    </main>
  );
}

export default Main;
