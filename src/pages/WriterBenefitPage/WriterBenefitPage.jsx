import React from "react";
import "./WriterBenefitPage.css";
import {
  FaMoneyBillWave,
  FaUsers,
  FaHandsHelping,
  FaChartLine,
} from "react-icons/fa";

const WriterBenefitPage = () => {
  return (
    <div className="writer-benefit-page">
      <h1>Writer Benefits</h1>

      <section className="benefit-section">
        <h2>
          <FaMoneyBillWave className="icon" /> Competitive Earnings
        </h2>
        <p>
          Join African StoryHub and earn as you write! We offer competitive
          revenue-sharing options and exclusive contracts to help you monetize
          your content and grow your income as a writer. Whether you're a new
          writer or a seasoned professional, our platform provides an
          opportunity to earn based on your work’s popularity and engagement.
        </p>
      </section>

      <section className="benefit-section">
        <h2>
          <FaUsers className="icon" /> Engaged Community
        </h2>
        <p>
          Our platform is home to a thriving community of readers and writers.
          Connect with millions of passionate readers who are eager to engage
          with new stories. Receive feedback, build your fanbase, and become
          part of a supportive network that celebrates creativity and
          storytelling.
        </p>
      </section>

      <section className="benefit-section">
        <h2>
          <FaHandsHelping className="icon" /> Writer Support & Resources
        </h2>
        <p>
          We offer dedicated support and a wealth of resources to help you
          succeed. Our team is here to guide you through how we can partner with
          you in making sure we get your stories to the right audience. Your
          success is our priority!
        </p>
      </section>

      <section className="benefit-section">
        <h2>
          <FaChartLine className="icon" /> Promotion & Growth
        </h2>
        <p>
          With our promotional campaigns and featured spots, your work has the
          chance to reach a larger audience. We offer promotional opportunities
          that can boost your visibility and help your stories stand out in a
          competitive landscape.
        </p>
      </section>

      <section className="writer-contact">
        <h2>Ready to Join?</h2>
        <p>
          Start your writing journey with us! Contact our writer support team at{" "}
          <a href="mailto:inkynovelwritersacademy@gmail.com">
            writer@InkyNovel.com
          </a>{" "}
          or click the link below to sign up as a writer.
        </p>
        <button className="signup-button">Sign Up as a Writer</button>
      </section>
    </div>
  );
};

export default WriterBenefitPage;
