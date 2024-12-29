import React from "react";
import { Link } from "react-router-dom";
import "./ComingSoonPage.css"; // Optional, if you want to add some styling

const ComingSoonPage = () => {
  return (
    <div className="coming-soon-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/" className="home-link">
        Go back to Home
      </Link>
    </div>
  );
};

export default ComingSoonPage;
