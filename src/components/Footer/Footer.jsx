import { Link } from "react-router-dom";
import githubIcon from "../../images/github.svg";
import linkedinIcon from "../../images/linkedin.svg";
import "./Footer.css";

const CURRENT_YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {CURRENT_YEAR} Supersite, Powered by News API
      </p>
      <nav className="footer__nav">
        <ul className="footer__links">
          <li>
            <Link className="footer__link" to="/">
              Home
            </Link>
          </li>
          <li>
            <a
              className="footer__link"
              href="https://tripleten.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              TripleTen
            </a>
          </li>
        </ul>
        <ul className="footer__socials">
          <li>
            <a
              className="footer__social-link"
              href="https://github.com/Burger007"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="footer__icon" src={githubIcon} alt="GitHub" />
            </a>
          </li>
          <li>
            <a
              className="footer__social-link"
              href="https://www.linkedin.com/in/max-everheart"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="footer__icon" src={linkedinIcon} alt="LinkedIn" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
