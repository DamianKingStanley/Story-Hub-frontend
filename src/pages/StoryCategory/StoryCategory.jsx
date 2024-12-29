import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaThumbsUp, FaStar, FaEye } from "react-icons/fa";
import jwt_decode from "jwt-decode"; // npm install jwt-decode
import "./StoryCategory.css"; // Add necessary styling

const StoryCategory = () => {
  const { genre } = useParams();
  const [stories, setStories] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

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
  // delete this initializeStories later
  const initializeStories = (stories) => {
    const likesData = JSON.parse(localStorage.getItem("storyLikes")) || {};

    return stories.map((story) => ({
      ...story,
      hasLiked: likesData[story._id] || false, // Load like status from localStorage
    }));
  };
  // Fetch stories by genre
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(`http://localhost:5000/stories/${genre}`);
        const data = await response.json();
        if (response.ok) {
          setStories(data.stories || []);
          // delete this initializeStories later
          setStories(initializeStories);
          if (data.stories && data.stories.length === 0) {
            setMessage("No story available for this genre.");
          }
        } else {
          setStories([]);
        }
      } catch (error) {
        setStories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [genre]);

  // Function to handle like/unlike
  // const toggleLike = async (storyId, liked) => {
  //   if (!token || isTokenExpired()) {
  //     requireLogin();
  //     return;
  //   }

  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/story/${storyId}/likes`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ liked: !liked }),
  //       }
  //     );
  //     const data = await response.json();

  //     if (response.ok) {
  //       // Update the specific story's likes and liked status in the state
  //       setStories((prevStories) =>
  //         prevStories.map((story) =>
  //           story._id === storyId
  //             ? { ...story, likes: data.likes, hasLiked: data.hasLiked }
  //             : story
  //         )
  //       );
  //     } else {
  //       console.error(
  //         "Failed to toggle like:",
  //         data.message || "Unknown error"
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error toggling like:", error);
  //   }
  // };

  const toggleLike = async (storyId, liked) => {
    try {
      const response = await fetch(
        `http://localhost:5000/story/${storyId}/likes`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ liked: !liked }), // Opposite of the current state
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Update localStorage with the new like status
        const likesData = JSON.parse(localStorage.getItem("storyLikes")) || {};
        likesData[storyId] = !liked;
        localStorage.setItem("storyLikes", JSON.stringify(likesData));

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

      if (response.ok) {
        // Update the specific story's rating in the state
        setStories((prevStories) =>
          prevStories.map((story) =>
            story._id === storyId ? { ...story, rating: data.rating } : story
          )
        );
      } else {
        console.error("Failed to rate story:", data.message || "Unknown error");
      }
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

  return (
    <div>
      {showLoginModal && (
        <div className="modal">
          <p>You must log in first</p>
        </div>
      )}
      <div className="story-list">
        <h2>{genre.replace("-", " ").toUpperCase()}</h2>
        {Array.isArray(stories) && stories.length > 0 ? (
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
                      <FaStar />{" "}
                      {story.rating ? story.rating.toFixed(1) : "0.0"}
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
          <p>{message || "No stories available."}</p>
        )}
      </div>
    </div>
  );
};

export default StoryCategory;