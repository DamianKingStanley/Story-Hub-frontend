import React from "react";
import "./LegitPage.css";
import { FaCheckCircle } from "react-icons/fa";

const LegitPage = () => {
  return (
    <div className="legit-page">
      <h1>Is African StoryHub Legit?</h1>

      <section className="legit-section">
        <h2>1. Company Background</h2>
        <p>
          African StoryHub has been a trusted platform for sharing and promoting
          african stories, to raders, all around the world. Since its
          establishment. We are dedicated to providing a safe, engaging, and
          reliable experience for all users, from readers to our partners.
        </p>
      </section>

      <section className="legit-section">
        <h2>2. Commitment to Quality</h2>
        <p>
          We carefully curate content and monitor quality standards to ensure
          that users get the best experience on our platform. Our team is
          committed to maintaining a high standard of content, so every story,
          product, or service listed on our site meets user expectations.
        </p>
      </section>

      <section className="legit-section">
        <h2>3. User Safety</h2>
        <p>
          User safety is our top priority. We have stringent policies and tools
          in place to protect user privacy, data, and content. Our platform
          actively monitors for any violations and has a dedicated support team
          to address user concerns.
        </p>
      </section>

      <section className="legit-section">
        <h2>4. Payment Security</h2>
        <p>
          Payments made through our platform are processed via secure,
          industry-standard encryption methods. We work with trusted payment
          providers to ensure that your financial information remains protected
          and confidential.
        </p>
      </section>

      <section className="legit-section">
        <h2>5. Community Feedback</h2>
        <p>
          We pride ourselves on the positive feedback from our growing
          community. Our platform is supported by thousands of users who
          actively engage with us. Feel free to check reviews and testimonials
          to learn more about our credibility.
        </p>
      </section>

      <section className="legit-section">
        <h2>6. Transparency and Trust</h2>
        <p>
          Transparency is key to building trust. We maintain open communication
          with our users and update our policies regularly to stay aligned with
          best practices. If you have any questions, feel free to reach out.
        </p>
      </section>

      <section className="legit-footer">
        <p>
          <FaCheckCircle className="icon-check" />
          African StoryHub is a trusted and legitimate platform, dedicated to
          delivering value and maintaining integrity in everything we do.
        </p>
      </section>
    </div>
  );
};

export default LegitPage;
