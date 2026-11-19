import avatar from "../../assets/avatar.webp";
import "./About.css";

function About() {
  return (
    <section className="about">
      <img
        className="about__avatar"
        src={avatar}
        alt="Portrait of the author"
      />
      <div className="about__info">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          Write 2-3 sentences about yourself: your name, what you do, and which
          technologies you work with.
        </p>
        <p className="about__text">
          Then add what you learned at TripleTen and how you can help potential
          customers or employers.
        </p>
      </div>
    </section>
  );
}

export default About;
