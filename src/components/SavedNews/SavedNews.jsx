import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import "./SavedNews.css";

function SavedNews({ savedArticles, onDeleteClick }) {
  return (
    <main className="saved-news">
      <SavedNewsHeader savedArticles={savedArticles} />
      {savedArticles.length > 0 && (
        <section className="saved-news__cards">
          <NewsCardList
            articles={savedArticles}
            type="saved"
            onDeleteClick={onDeleteClick}
          />
        </section>
      )}
    </main>
  );
}

export default SavedNews;
