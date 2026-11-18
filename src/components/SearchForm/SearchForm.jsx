import { useState } from "react";
import { EMPTY_KEYWORD_MESSAGE } from "../../utils/constants";
import "./SearchForm.css";

function SearchForm({ onSearch, isSearching }) {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");

  function handleChange(evt) {
    setKeyword(evt.target.value);
    setError("");
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) {
      setError(EMPTY_KEYWORD_MESSAGE);
      return;
    }

    if (onSearch) onSearch(trimmedKeyword);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <input
        className="search-form__input"
        type="text"
        name="keyword"
        placeholder="Enter topic"
        aria-label="Topic to search"
        value={keyword}
        onChange={handleChange}
        required
      />
      <button
        className="search-form__button"
        type="submit"
        disabled={isSearching}
      >
        Search
      </button>
      {error && <span className="search-form__error">{error}</span>}
    </form>
  );
}

export default SearchForm;
