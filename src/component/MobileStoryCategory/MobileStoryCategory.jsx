import React from "react";
import { Link } from "react-router-dom";
import "./MobileStoryCategory.css"; // Make sure to import the CSS for styling

const MobileStoryCategory = () => {
  return (
    <div className="MobileStoryCategory-container">
      <ul className="MobileStoryCategory-list">
        <li>
          <Link to="/stories/african-folktale"> Folktales</Link>
        </li>
        <li>
          <Link to="/stories/african-mythology"> Mythology</Link>
        </li>
        <li>
          <Link to="/stories/historical-fiction">Historical </Link>
        </li>
        <li>
          <Link to="/stories/diaspora-narratives">Diaspora </Link>
        </li>
        <li>
          <Link to="/stories/post-colonel">Post-Colonial </Link>
        </li>
        <li>
          <Link to="/stories/afrofuturism">Afrofuturism</Link>
        </li>
        <li>
          <Link to="/stories/traditional-poetry">Poetry</Link>
        </li>
        <li>
          <Link to="/stories/social-realism"> Realism</Link>
        </li>
        <li>
          <Link to="/stories/african-romance"> Romance</Link>
        </li>
        <li>
          <Link to="/stories/tribal-story">Tribal </Link>
        </li>
        <li>
          <Link to="/stories/yoruba-poetry">Yoruba Ifa </Link>
        </li>
        <li>
          <Link to="/stories/igbo-egwu">Igbo Akuko </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileStoryCategory;
