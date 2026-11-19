import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { getKeywordsSummary } from "../../utils/articles";
import "./SavedNewsHeader.css";

function SavedNewsHeader({ savedArticles }) {
  const currentUser = useContext(CurrentUserContext);
  const count = savedArticles.length;

  return (
    <section className="saved-news=header">
      <p className="saved-news-header__label">Saved articles</p>
      <h1 className="saved-news-header__title">
        {currentUser.name}, you have{count} saved articles
        {count === 1 ? "" : "s"}
      </h1>
      {count > 0 && (
        <p className="saved-news-header__keywords">
          By keywords:{" "}
          <span className="saved-news-header__keywords-accent">
            {getKeywordsSummary(savedArticles)}
          </span>
        </p>
      )}
    </section>
  );
}

export default SavedNewsHeader;
