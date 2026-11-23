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
          Hi, I'm Max Everheart. I'm a fullstack developer. My stack is JS,
          React, Node.js and REST APIs. I like to take a design and build it out
          into a clean responsive interface that works equally well on a phone
          as it does on a big screen. At TripleTen I learned to build full web
          apps (layouts, React components, APIs, deployment etc). My time in
          technical support and as a systems champion taught me to think from
          the user's perspective, to get to the root of a problem quickly and to
          explain technical things in a way that makes sense. That's all gone
          into building products that people actually enjoy using.
        </p>
        <p className="about__text">
          At TripleTen I learned to build full web apps: layouts, React
          components, APIs and deployment. My time in technical support and as a
          systems champion taught me to think from the user's perspective, to
          get to the root of a problem quickly and to explain technical things
          in a way that makes sense. That's what I bring to building products
          people actually enjoy using.
        </p>
      </div>
    </section>
  );
}

export default About;
