import React from "react";
import { Routes, Route } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Footer from "../Footer/Footer";

import Header from "../Header/Header";

function App() {
  const [isLoggedIn] = React.useState(false);
  const [currentUser] = React.useState({});

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLoggedIn={isLoggedIn} />
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
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
