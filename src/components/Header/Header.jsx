import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";

  return (
    <header className={`header ${isSavedNewsPage ? "header_theme_light" : ""}`}>
      <Link className="header__logo" to="/">
        NewsExplorer
      </Link>
    </header>
  );
}

export default Header;
