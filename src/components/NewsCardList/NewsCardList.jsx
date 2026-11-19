import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({
  articles,
  type,
  isLoggedIn,
  savedArticles = [],
  onSaveClick,
  onDeleteClick,
}) {
  return (
    <ul className="news-card-list">
      {articles.map((article) => (
        <li className="news-card-list__item" key={article._id || article.link}>
          <NewsCard
            article={article}
            type={type}
            isLoggedIn={isLoggedIn}
            isSaved={savedArticles.some((item) => item.link === article.link)}
            onSaveClick={onSaveClick}
            onDeleteClick={onDeleteClick}
          />
        </li>
      ))}
    </ul>
  );
}
export default NewsCardList;
