import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <h1>Privacy Policy</h1>

      <section className="privacy-section">
        <h2>1. Introduction</h2>
        <p>
          This Privacy Policy describes how we collect, use, and disclose your
          personal information when you use our platform. By accessing or using
          our services, you agree to the terms of this Privacy Policy.
        </p>
      </section>

      <section className="privacy-section">
        <h2>2. Information We Collect</h2>
        <p>
          We may collect information about you when you register, use our
          services, or interact with our content. This includes personal
          information like your name, email address, and payment information, as
          well as technical data such as IP address and browsing history.
        </p>
      </section>

      <section className="privacy-section">
        <h2>3. How We Use Your Information</h2>
        <p>
          The information we collect is used to provide, maintain, and improve
          our services, as well as to protect the security of our users. We may
          also use your information to personalize your experience and for
          marketing purposes.
        </p>
      </section>

      <section className="privacy-section">
        <h2>4. Sharing Your Information</h2>
        <p>
          We do not sell your personal information to third parties. However, we
          may share your information with trusted partners who assist us in
          operating our platform and delivering services, provided they agree to
          keep it confidential.
        </p>
      </section>

      <section className="privacy-section">
        <h2>5. Security of Your Information</h2>
        <p>
          We take appropriate security measures to protect your information from
          unauthorized access, alteration, and destruction. However, please note
          that no method of transmission over the internet is completely secure.
        </p>
      </section>

      <section className="privacy-section">
        <h2>6. Your Rights</h2>
        <p>
          Depending on your location, you may have rights regarding your
          personal information, including the right to access, correct, or
          delete your data. Contact us if you wish to exercise any of these
          rights.
        </p>
      </section>

      <section className="privacy-section">
        <h2>7. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page, and we will notify you of significant changes.
          Please review this page periodically to stay informed about our
          practices.
        </p>
      </section>

      <section className="privacy-section">
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please{" "}
          <a href="/contact-us">contact us</a>.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
