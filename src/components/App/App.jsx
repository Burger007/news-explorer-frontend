import React from "react";
import {Routes, Route} from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";



function App(){

    const [isLoggedIn] = React.useState(false);
    const [currentUser] = React.useState({});

    return (
        <CurrentUserContext.Provider vlaue={currentUser}>
        <div className="page">
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
            </div>
            </CurrentUserContext.Provider>
    );
}

export default App;