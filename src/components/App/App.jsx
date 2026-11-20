import React, { useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import { searchNews } from "../../utils/newsApi";
import { normalizeArticles } from "../../utils/articles";
import { CARDS_PER_STEP, SEARCH_ERROR_MESSAGE } from "../../utils/constants";

function App() {
  const [isLoggedIn] = React.useState(false);
  const [currentUser] = React.useState({});

  const [activeModal, setActiveModal] = React.useState("");
  const [formError, setFormError] = React.useState("");
  const [articles, setArticles] = React.useState([]);
  const [visibleCount, setVisibleCount] = React.useState(CARDS_PER_STEP);
  const [isSearching, setIsSearching] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);
  const [searchError, setSearchError] = React.useState("");

  const closeModal = useCallback(() => {
    setActiveModal("");
    setFormError("");
  }, []);

  function openModal(name) {
    setFormError("");
    setActiveModal(name);
  }

  function handleLogin() {
    closeModal();
  }

  function handleRegister() {
    openModal("success");
  }

  function handleSearch(keyword) {
    setHasSearched(true);
    setIsSearching(true);
    setSearchError("");
    setArticles([]);
    setVisibleCount(CARDS_PER_STEP);

    searchNews(keyword)
      .then((data) => setArticles(normalizeArticles(data.articles, keyword)))
      .catch(() => setSearchError(SEARCH_ERROR_MESSAGE))
      .finally(() => setIsSearching(false));
  }

  function handleShowMore() {
    setVisibleCount((count) => count + CARDS_PER_STEP);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          onSignInClick={() => openModal("login")}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                onSearch={handleSearch}
                isSearching={isSearching}
                hasSearched={hasSearched}
                searchError={searchError}
                articles={articles}
                visibleCount={visibleCount}
                onShowMore={handleShowMore}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedNews />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
        {activeModal === "login" && (
          <LoginModal
            onClose={closeModal}
            onLogin={handleLogin}
            onSwitch={() => openModal("register")}
            submitError={formError}
          />
        )}
        {activeModal === "register" && (
          <RegisterModal
            onClose={closeModal}
            onRegister={handleRegister}
            onSwitch={() => openModal("login")}
            submitError={formError}
          />
        )}
        {activeModal === "success" && (
          <SuccessModal
            onClose={closeModal}
            onSignInClick={() => openModal("login")}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
