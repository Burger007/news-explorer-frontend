import React, { useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import LoginModal from "../LoginModal/LoginModal";

function App() {
  const [isLoggedIn] = React.useState(false);
  const [currentUser] = React.useState({});

  const [activeModal, setActiveModal] = React.useState("");
  const [formError, setFormError] = React.useState("");

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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          onSignInClick={() => openModal("login")}
        />{" "}
        <Routes>
          <Route path="/" element={<Main />} />
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
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
