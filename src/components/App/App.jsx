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

  function handleRegister() {
    openModal("success");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          onSignInClick={() => openModal("login")}
        />
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
