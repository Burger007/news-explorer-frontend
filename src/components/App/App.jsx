import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import { searchNews } from "../../utils/newsApi";
import { normalizeArticles } from "../../utils/articles";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";
import {
  CARDS_PER_STEP,
  LOGIN_ERROR_MESSAGE,
  REGISTER_ERROR_MESSAGE,
  SEARCH_ERROR_MESSAGE,
  TOKEN_KEY,
} from "../../utils/constants";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isCheckingToken, setIsCheckingToken] = useState(() =>
    Boolean(localStorage.getItem(TOKEN_KEY)),
  );
  const [currentUser, setCurrentUser] = useState({});

  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_STEP);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState("");

  const [savedArticles, setSavedArticles] = useState([]);

  const [activeModal, setActiveModal] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;
    auth
      .checkToken(token)
      .then((res) => {
        setCurrentUser(res.data);
        setIsLoggedIn(true);
        return api.getItems();
      })
      .then((items) => setSavedArticles(items))
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setIsCheckingToken(false));
  }, []);

  const isLoginRequested = Boolean(location.state?.openLogin);
  const visibleModal = activeModal || (isLoginRequested ? "login" : "");

  const closeModal = useCallback(() => {
    setActiveModal("");
    setFormError("");
    if (isLoginRequested) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [isLoginRequested, location.pathname, navigate]);

  function openModal(name) {
    setFormError("");
    setActiveModal(name);
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

  function handleLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem(TOKEN_KEY, data.token);
        return auth.checkToken(data.token);
      })
      .then((res) => {
        setCurrentUser(res.data);
        setIsLoggedIn(true);
        closeModal();
        return api.getItems();
      })
      .then((items) => setSavedArticles(items))
      .catch(() => setFormError(LOGIN_ERROR_MESSAGE));
  }

  function handleRegister({ email, password, name }) {
    auth
      .register(email, password, name)
      .then(() => openModal("success"))
      .catch(() => setFormError(REGISTER_ERROR_MESSAGE));
  }

  function handleSignOut() {
    localStorage.removeItem(TOKEN_KEY);
    setIsLoggedIn(false);
    setCurrentUser({});
    setSavedArticles([]);
    navigate("/");
  }

  function handleDeleteClick(article) {
    api
      .deleteArticle(article._id)
      .then(() =>
        setSavedArticles((items) =>
          items.filter((item) => item._id !== article._id),
        ),
      )
      .catch(console.error);
  }

  function handleSaveClick(article) {
    if (!isLoggedIn) {
      openModal("register");
      return;
    }
    const savedArticle = savedArticles.find(
      (item) => item.link === article.link,
    );
    if (savedArticle) {
      handleDeleteClick(savedArticle);
      return;
    }
    api
      .saveArticle(article)
      .then((newArticle) => setSavedArticles((items) => [newArticle, ...items]))
      .catch(console.error);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          onSignInClick={() => openModal("login")}
          onSignOut={handleSignOut}
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
                savedArticles={savedArticles}
                onSaveClick={handleSaveClick}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                isCheckingToken={isCheckingToken}
              >
                <SavedNews
                  savedArticles={savedArticles}
                  onDeleteClick={handleDeleteClick}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />

        {visibleModal === "login" && (
          <LoginModal
            onClose={closeModal}
            onLogin={handleLogin}
            onSwitch={() => openModal("register")}
            submitError={formError}
          />
        )}
        {visibleModal === "register" && (
          <RegisterModal
            onClose={closeModal}
            onRegister={handleRegister}
            onSwitch={() => openModal("login")}
            submitError={formError}
          />
        )}
        {visibleModal === "success" && (
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
