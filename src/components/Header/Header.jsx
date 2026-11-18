import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({ isLoggedIn, onSignInClick, onSignOut }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isSavedNewsPage = location.pathname === "/saved-news";

  function toggleMenu() {
    setIsMenuOpen((open) => !open);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleSignInClick() {
    closeMenu();
    if (onSignInClick) onSignInClick();
  }

  return (
    <header className={`header ${isSavedNewsPage ? "header_theme_light" : ""}`}>
      <Link className="header__logo" to="/">
        NewsExplorer
      </Link>
      <Navigation
        isLoggedIn={isLoggedIn}
        isLightTheme={isSavedNewsPage && !isMenuOpen}
        isMenuOpen={isMenuOpen}
        onMenuToggle={toggleMenu}
        onLinkClick={closeMenu}
        onSignInClick={handleSignInClick}
        onSignOut={onSignOut}
      />
    </header>
  );
}

export default Header;
