import React from "react";
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About</h4>
          <ul>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/terms-of-use">Terms of Use</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/storyhub-legit">African StoryHub Legit</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact us</h4>
          <ul>
            <li>
              <Link to="/help-suggestion">Help & Suggestion</Link>
            </li>
            <li>
              <Link to="/business">Business</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li>
              <Link to="/writer-benefit">Writer Benefit</Link>
            </li>
            <li>
              <Link to="/content-policy">Content Policy</Link>
            </li>
            <li>
              <Link to="/keywords">Keywords</Link>
            </li>
            <li>
              <Link to="/hot-searches">Hot Searches</Link>
            </li>
            <li>
              <Link to="/book-review">Book Review</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Community</h4>
          <ul>
            <li>
              <Link to="https://facebook.com/InkyNovelWritersAcademy">
                Facebook
              </Link>
            </li>
            <li>
              <Link to="https://facebook.com/group/3953171510446946">
                Facebook Group
              </Link>
            </li>
            <li>
              <Link to="/inkynovel-hub">InkyNovel Hub</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-icons">
          <p>&copy; 2024- African StoryHub</p>
          <p>All right reserved</p>
        </div>
        <div className="back-to-top">
          <a href="#top">
            <FaArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
