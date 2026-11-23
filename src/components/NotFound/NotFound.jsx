import notFoundIcon from "../../images/not-found.svg";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <img className="not-found__icon" src={notFoundIcon} alt="" />
      <h2 className="not-found__title">Nothing found</h2>
      <p className="not-found__text">
        Sorry, but nothing matched your search terms.
      </p>
    </div>
  );
}

export default NotFound;
