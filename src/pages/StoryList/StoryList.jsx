import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./StoryList.css";

const StoryList = () => {
  const { userId } = useParams();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchUserId = async () => {
  //     try {
  //       const userInformation = JSON.parse(
  //         localStorage.getItem("userInformation")
  //       );
  //       if (!userInformation || userInformation.result.role !== "admin") {
  //         navigate("/");
  //         return;
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       navigate("/");
  //     }
  //   };

  //   fetchUserId();
  // }, [navigate]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/writer/${userId}/stories`
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setStories(data);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        setError("Failed to fetch stories");
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [userId]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      <div className="story-list">
        <h1>Stories</h1>
        <div className="story-grid">
          {stories.map((story) => (
            <div key={story._id} className="story-item">
              <div className="story-cover">
                <img
                  src={`http://localhost:5000/${story.cover_url}`}
                  alt={`${story.title} Cover`}
                />
              </div>
              <div className="story-details">
                <h2>{story.title}</h2>
                <p className="story-author">by {story.author}</p>
                <p className="story-genre">{story.genre}</p>
                <Link
                  to={`/stories/${story._id}/add-chapter`}
                  className="add-chapter-link"
                >
                  Add Chapter
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryList;
