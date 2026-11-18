import { useContext } from "react";
import { NavLink } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Navigation.css";

function Navigation({
  isLoggedIn,
  onSignOut,
  isLightTheme,
  onSignInClick,
  isMenuOpen,
  onMenuToggle,
  onLinkClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const themeModifier = isLightTheme ? "_theme_light" : "";

  function getLinkClassName({ isActive }) {
    return `navigation__link navigation__link${themeModifier} ${
      isActive ? "navigation__link_active" : ""
    }`;
  }

  return (
    <nav className="navigation">
      <button
        type="button"
        className={`navigation__menu-button navigation__menu-button${themeModifier} ${isMenuOpen ? "navigation__menu-button_opened" : ""}`}
        onClick={onMenuToggle}
      />
      <ul
        className={`navigation__list ${isMenuOpen ? "navigation__list_open" : ""}`}
      >
        <li className="navigation__item">
          <NavLink
            to="/"
            end
            className={getLinkClassName}
            onClick={onLinkClick}
          >
            Home
          </NavLink>
        </li>

        {isLoggedIn && (
          <li className="navigation__item">
            <NavLink
              to="/saved-news"
              className={getLinkClassName}
              onClick={onLinkClick}
            >
              Saved articles
            </NavLink>
          </li>
        )}
        <li className="navigation__item">
          {isLoggedIn ? (
            <button
              type="button"
              className={`navigation__button navigation__button${themeModifier}`}
              onClick={onSignOut}
            >
              {currentUser.name}
              <span
                className={`navigation__logout-icon navigation__logout-icon${themeModifier}`}
              />
            </button>
          ) : (
            <button
              type="button"
              className="navigation__button"
              onClick={onSignInClick}
            >
              Sign in
            </button>
          )}
        </li>
      </ul>
      {isMenuOpen && (
        <div className="navigation__overlay" onClick={onMenuToggle} />
      )}
    </nav>
  );
}

export default Navigation;
