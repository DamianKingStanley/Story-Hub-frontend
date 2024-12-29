// src/pages/SearchResultsPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaThumbsUp, FaStar } from "react-icons/fa";
import jwt_decode from "jwt-decode";

const SearchResultsPage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  // Extract the search query from the URL
  const query = new URLSearchParams(location.search).get("query");

  // Fetch token from localStorage
  useEffect(() => {
    const userInformation = JSON.parse(localStorage.getItem("userInformation"));
    if (userInformation && userInformation.token) {
      setToken(userInformation.token);
    }
  }, []);

  // Function to check if the token is expired
  const isTokenExpired = () => {
    if (!token) return true;

    const decoded = jwt_decode(token);
    const now = Date.now() / 1000; // Convert to seconds
    return decoded.exp < now;
  };

  // Function to handle the login modal and redirect
  const requireLogin = () => {
    setShowLoginModal(true);
    setTimeout(() => {
      setShowLoginModal(false);
      navigate("/login");
    }, 2000); // Display modal for 2 seconds before redirect
  };

  useEffect(() => {
    if (query) {
      // Fetch stories based on the search query
      const fetchStories = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:5000/search/stories?query=${query}`
          );
          setStories(response.data);
          setError(null);
        } catch (err) {
          setError(err.response?.data?.message || "Error fetching stories");
          setStories([]);
        } finally {
          setLoading(false);
        }
      };
      fetchStories();
    }
  }, [query]);
  // Function to handle view increment on story click
  const incrementViews = async (storyId) => {
    try {
      await fetch(`http://localhost:5000/story/${storyId}/views`, {
        method: "PATCH",
      });
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  };

  // Function to handle like/unlike
  const toggleLike = async (storyId, liked) => {
    if (!token || isTokenExpired()) {
      requireLogin();
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/story/${storyId}/likes`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ liked: !liked }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        // Update the specific story's likes and liked status in the state
        setStories((prevStories) =>
          prevStories.map((story) =>
            story._id === storyId
              ? { ...story, likes: data.likes, hasLiked: data.hasLiked }
              : story
          )
        );
      } else {
        console.error(
          "Failed to toggle like:",
          data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // Function to handle rating submission
  const rateStory = async (storyId, rating) => {
    if (!token || isTokenExpired()) {
      requireLogin();
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/story/${storyId}/rating`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ rating }),
        }
      );
      const data = await response.json();

      // Update the specific story's rating in the state
      setStories((prevStories) =>
        prevStories.map((story) =>
          story._id === storyId ? { ...story, rating: data.rating } : story
        )
      );
    } catch (error) {
      console.error("Error rating story:", error);
    }
  };
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="story-list">
      <h2>Search Results for "{query}"</h2>
      {stories.length > 0 ? (
        <div className="story-grid">
          {stories.map((story) => (
            <div key={story._id} className="story-item">
              <Link to={`/story/${story._id}`} className="story-link">
                <div className="story-cover">
                  <img
                    src={`http://localhost:5000/${story.cover_url}`}
                    alt={`${story.title} Cover`}
                    onClick={() => incrementViews(story._id)}
                  />
                </div>
              </Link>

              <div className="story-details">
                <h2>{story.title}</h2>
                <p className="story-author">by {story.author}</p>
                <p className="story-genre">{story.genre}</p>
                <div className="story-views-likes">
                  <span>
                    <FaEye /> {story.views}
                  </span>
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLike(story._id, story.hasLiked);
                    }}
                    style={{
                      cursor: "pointer",
                      color: story.hasLiked ? "blue" : "grey",
                    }}
                  >
                    <FaThumbsUp /> {story.likes}
                  </span>
                  <span>
                    <FaStar /> {story.rating ? story.rating.toFixed(1) : "0.0"}
                  </span>
                </div>
                <div className="story-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      onClick={(e) => {
                        e.preventDefault();
                        rateStory(story._id, star);
                      }}
                      style={{
                        cursor: "pointer",
                        color:
                          star <= Math.round(story.rating) ? "gold" : "gray",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No stories found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
