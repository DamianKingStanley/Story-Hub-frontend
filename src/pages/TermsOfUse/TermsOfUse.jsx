import React from "react";
import "./TermsOfUse.css";

const TermsOfUse = () => {
  return (
    <div className="terms-of-use">
      <h1>Terms of Use</h1>

      <section className="terms-section">
        <h2>1. Introduction</h2>
        <p>
          Welcome to our platform. By accessing or using our website, you agree
          to comply with and be bound by the following terms and conditions. If
          you disagree with any part of these terms, please do not use our
          platform.
        </p>
      </section>

      <section className="terms-section">
        <h2>2. User Account and Security</h2>
        <p>
          To access certain features of our platform, you may need to register
          an account. You agree to provide accurate and current information,
          maintain the security of your account, and accept full responsibility
          for any activity under your account.
        </p>
      </section>

      <section className="terms-section">
        <h2>3. Content Ownership</h2>
        <p>
          All content available on the platform, including text, images, and
          videos, are owned by or licensed to us. Unauthorized use,
          reproduction, or distribution of this content is prohibited unless
          expressly permitted.
        </p>
      </section>

      <section className="terms-section">
        <h2>4. User Conduct</h2>
        <p>
          You agree not to use the platform for unlawful activities, including
          harassment, impersonation, spamming, or any behavior that disrupts the
          experience for other users. We reserve the right to terminate accounts
          violating these terms.
        </p>
      </section>

      <section className="terms-section">
        <h2>5. Disclaimer and Limitation of Liability</h2>
        <p>
          We provide our platform "as is" without warranties of any kind. We do
          not guarantee the accuracy, completeness, or availability of the
          platform content. Our liability is limited to the maximum extent
          permitted by law.
        </p>
      </section>

      <section className="terms-section">
        <h2>6. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms of Use at any time. Any
          changes will be effective immediately upon posting. Your continued use
          of the platform after changes constitutes your acceptance of the new
          terms.
        </p>
      </section>

      <section className="terms-section">
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about these Terms of Use, please{" "}
          <a href="/contact-us">contact us</a>.
        </p>
      </section>
    </div>
  );
};

export default TermsOfUse;
