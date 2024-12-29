import React from "react";
import "./BusinessPage.css";
import { FaHandshake, FaBullhorn, FaChartLine } from "react-icons/fa";

const BusinessPage = () => {
  return (
    <div className="business-page">
      <h1>Business Partnerships</h1>

      <section className="business-section">
        <h2>
          <FaHandshake className="icon" /> Partnership Opportunities
        </h2>
        <p>
          African StoryHub is open to collaborating with businesses, content
          creators, and organizations that align with our mission. We believe in
          forming partnerships that create value for our community and help us
          expand our reach globally. Let's work together to make a positive
          impact in promoting African Stories.
        </p>
      </section>

      <section className="business-section">
        <h2>
          <FaBullhorn className="icon" /> Advertising and Sponsorship
        </h2>
        <p>
          We offer a variety of advertising and sponsorship opportunities to
          help you connect with a broad audience. Through targeted campaigns,
          custom solutions, and premium ad placements, African StoryHub provides
          effective ways to promote your brand and engage with potential
          customers.
        </p>
      </section>

      <section className="business-section">
        <h2>
          <FaChartLine className="icon" /> Partner Benefits
        </h2>
        <p>
          As a partner, you’ll benefit from our extensive network, user
          engagement insights, and dedicated support. Whether it’s through
          co-branded campaigns, content collaborations, or tailored marketing
          solutions, we ensure our partners gain maximum value from our
          partnership.
        </p>
      </section>

      <section className="business-contact">
        <h2>Contact Us for Business Inquiries</h2>
        <p>
          Interested in partnering with us? Reach out to our business team at{" "}
          <a href="mailto:inkynovelwritersacademy@gmail.com">
            inkynovelwritersacademy@gmail.com
          </a>{" "}
          or fill out the contact form below. Let’s explore how we can create
          something amazing together.
        </p>
      </section>
    </div>
  );
};

export default BusinessPage;
