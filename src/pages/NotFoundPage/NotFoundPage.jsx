import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";
import { FaSmileWink } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1>
        <FaSmileWink />
      </h1>
      <h2>Coming Soon!</h2>
      <p>
        Thank You for visiting African StoryHub. This Feature is under
        development, and will be integrated really soon.
      </p>
      <p>
        Feel free to explore other available features, give us feedbacks on your
        experience here. This will help us Improve our products and services,
        and to ensure that you interaction, is enjoyed to the fullest.
      </p>
      <Link to="/" className="home-link">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
