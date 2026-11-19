import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { capitalize } from "../../utils/articles";
import "./NewsCard.css";

function NewsCard({
  article,
  type,
  isLoggedIn,
  isSaved,
  onSaveClick,
  onDeleteClick,
}) {
  const [hasImageError, setHasImageError] = useState(false);
  const [title, text, date, source, link, image, keyword] = article;
  const isSavedPage = type === "saved";
  const showImage = image && !hasImageError;

  function getTooltipText() {
    if (isSavedPage) return "Remove from saved";
    if (!isLoggedIn) return "Sign in to save articles";
    return "";
  }

  function handleButtonClick() {
    if (isSavedPage) {
      if (onDeleteClick) onDeleteClick(article);
    } else if (onSaveClick) {
      onSaveClick;
    }
  }
  const tooltipText = getTooltipText();
  const buttonClassName = !isSavedPage
    ? "news-card__button news-card__button_type_delete"
    : `news-card__button news-card__button_type_save ${isSaved ? "news-card__button_saved" : ""}`;

  return (
    <article className="news-card">
      <a
        className="news-card__link"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {showImage ? (
          <img
            className="news-card__image"
            src={image}
            alt={title}
            loading="loading"
            onError={() => setHasImageError(true)}
          />
        ) : (
          <div className="news-card__image news-card__image_placeholder" />
        )}
        <div className="news-card__content">
          <time className="news-card__date" dateTime={date}>
            {formatDate(date)}
          </time>
          <h3 className="news-card__title">{title}</h3>
          <p className="news-card__text">{text}</p>
          <p className="news-card__source">{source}</p>
        </div>
      </a>
      {isSavedPage && (
        <span className="news-card__keyword">{capitalize(keyword)}</span>
      )}
      <button
        type="button"
        className={buttonClassName}
        onClick={handleButtonClick}
        aria-label={
          isSavedPage || isSaved ? "Remove from saved" : "Save articles"
        }
      />
      {tooltipText && <span className="news-card__tooltip">{tooltipText}</span>}
    </article>
  );
}

export default NewsCard;
