import React from "react";
import "./AboutUs.css";
import { FaGlobe, FaUsers, FaBullseye, FaAward } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="about-us">
      <section className="hero-section">
        <div className="hero-content">
          <h1>About Us</h1>
          <p>
            Welcome to African StoryHub - where we share and tell our african
            stories
          </p>
        </div>
      </section>

      <section className="company-overview">
        <h2>Who We Are?</h2>
        <p>
          African StoryHub is a story platform that promotes only african
          stories. It is a sub-platform from the our Writers Academey,
          InkyNovel. Founded with a passion for storytelling, we aim to create a
          platform where readers from around the world can read, get inspire by,
          and explore, different African Stories. Our team is dedicated to
          fostering creativity, collaboration, and connection.
        </p>
      </section>

      <section className="mission-values">
        <div className="mission">
          <FaBullseye className="icon" />
          <h3>Our Mission</h3>
          <p>
            To empower storytellers, engage readers, and create a vibrant
            literary community. We strive to make literature accessible to
            everyone, nurturing a space where creativity thrives. Most
            importantly, promote african stories.
          </p>
        </div>
        <div className="values">
          <FaUsers className="icon" />
          <h3>Our Values</h3>
          <ul>
            <li>
              <strong>Creativity</strong>: Encouraging innovation and original
              ideas.
            </li>
            <li>
              <strong>Community</strong>: Building connections between readers
              and our community.
            </li>
            <li>
              <strong>Quality</strong>: Delivering high-quality content and
              experiences.
            </li>
          </ul>
        </div>
      </section>

      <section className="milestones">
        <h2>Our Journey So Far</h2>
        <div className="milestone-cards">
          <div className="milestone-card">
            <FaGlobe className="icon" />
            <h4>Global Reach</h4>
            <p>
              We've grown to reach thousands of readers nationwide, as InkyNovel
              Writers Academy, through our Writing Contests, organized every
              year.
            </p>
          </div>
          <div className="milestone-card">
            <FaAward className="icon" />
            <h4>Awarding Writers</h4>
            <p>
              Our platform, InkyNovel Academy, is known for its commitment to
              seeing that writers who did great, are rewarded and recognized for
              their achievement.
            </p>
          </div>
        </div>
      </section>

      <section className="team">
        <h2>Meet Our Team</h2>
        <p>
          Our team consists of passionate individuals from diverse backgrounds,
          all dedicated to pushing the boundaries of storytelling.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
