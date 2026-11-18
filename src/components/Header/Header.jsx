import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({ isLoggedIn, onSignInClick, onSignOut }) {
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";

  return (
    <header className={`header ${isSavedNewsPage ? "header_theme_light" : ""}`}>
      <Link className="header__logo" to="/">
        NewsExplorer
      </Link>
      <Navigation
        isLoggedIn={isLoggedIn}
        isLightTheme={isSavedNewsPage}
        onSignInClick={onSignInClick}
        onSignOut={onSignOut}
      />
    </header>
  );
}

export default Header;
