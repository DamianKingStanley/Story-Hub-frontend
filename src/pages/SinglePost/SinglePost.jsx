import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaEye, FaThumbsUp } from "react-icons/fa";
import "./SinglePost.css";
import jwt_decode from "jwt-decode"; // npm install jwt-decode

const StoryDetails = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [isInLibrary, setIsInLibrary] = useState(false);

  const navigate = useNavigate();

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

  const incrementViews = async (id) => {
    try {
      await fetch(`http://localhost:5000/chapter/${id}/views`, {
        method: "PATCH",
      });
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  };

  const toggleLike = async (id, liked) => {
    if (!token || isTokenExpired()) {
      requireLogin();
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/chapter/${id}/likes`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ liked: !liked }), // Send the opposite of the current state
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStory((prevStory) => {
          const updatedChapters = prevStory.chapters.map((chapter) =>
            chapter._id === id
              ? { ...chapter, likes: data.likes, hasLiked: data.hasLiked }
              : chapter
          );
          return { ...prevStory, chapters: updatedChapters };
        });
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

  const checkLibraryStatus = useCallback(async () => {
    if (token) {
      try {
        const response = await fetch(
          `http://localhost:5000/library/${id}/status`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setIsInLibrary(data.isInLibrary);
      } catch (error) {
        console.error("Error checking library status:", error);
      }
    }
  }, [token, id]);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/story/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch story details");
        }
        const data = await response.json();
        setStory(data);
        checkLibraryStatus(); // Calls the function
      } catch (error) {
        setError(error.message);
        console.error("Error fetching story:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id, checkLibraryStatus]);

  const addStoryToLibrary = async () => {
    if (!token) {
      requireLogin();
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/add/library/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setIsInLibrary(true);
        setActionMessage("Story Added Successfully");
        setShowActionModal(true);
        setTimeout(() => setShowActionModal(false), 2000);
      } else {
        console.error("Failed to add story to library");
      }
    } catch (error) {
      console.error("Error adding story to library:", error);
    }
  };

  const removeStoryFromLibrary = async () => {
    if (!token) {
      requireLogin();
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/delete/library/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        setIsInLibrary(false);
        setActionMessage("Story Removed Successfully");
        setShowActionModal(true);
        setTimeout(() => setShowActionModal(false), 2000);
      } else {
        console.error("Failed to remove story from library");
      }
    } catch (error) {
      console.error("Error removing story from library:", error);
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
    return <p>{error}</p>;
  }

  if (!story) {
    return <p>No story found.</p>;
  }

  return (
    <div>
      {showLoginModal && (
        <div className="modal">
          <p>You must log in first</p>
        </div>
      )}
      {showActionModal && (
        <div className="modal">
          <p>{actionMessage}</p>
        </div>
      )}
      <div className="story-details-page">
        <div className="story-content">
          <div className="story-content-cover">
            <img
              src={`http://localhost:5000/${story.cover_url}`}
              alt={`${story.title} Cover`}
              className="story-cover-img"
            />
          </div>
          <div className="story-content-details">
            <h1>{story.title}</h1>
            <p className="story-author">by {story.author}</p>
            <p className="story-genre">Genre: {story.genre}</p>
            <p className="story-age-rating">Age Rating: {story.age_rating}</p>
            <p className="story-synopsis">Synopsis: {story.synopsis}</p>
            <div className="story-meta">
              <p>{story.views} Views</p>
              <p>{story.likes} Likes</p>
              <p>Rating: {story.rating}</p>
            </div>
            <button
              className="addLibraryButton"
              onClick={isInLibrary ? removeStoryFromLibrary : addStoryToLibrary}
            >
              {isInLibrary ? "Remove from Library" : "Add to Library"}
            </button>
          </div>
        </div>
        <div className="story-additional">
          <div className="story-additional-char-trope">
            <ul>
              {story.character.map((char, index) => (
                <li key={index}> {char} </li>
              ))}
            </ul>
            <ul>
              {story.trope.map((trope, index) => (
                <li key={index}>{trope}</li>
              ))}
            </ul>
          </div>
          <h2>Chapters</h2>
          <ul className="chapter-title-ul">
            {story.chapters.map((chapter) => (
              <li className="chapter-title-li" key={chapter._id}>
                <Link
                  to={`/chapter/${chapter._id}`}
                  className="chapter-title"
                  onClick={() => incrementViews(chapter._id)}
                >
                  {chapter.title}
                  <p>{chapter.content.slice(0, 30)}...</p>
                </Link>
                <div className="chapter-view-like">
                  <span>
                    <FaEye /> {chapter.views}
                  </span>
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLike(chapter._id, chapter.hasLiked);
                    }}
                    style={{
                      cursor: "pointer",
                      color: chapter.hasLiked ? "blue" : "green",
                    }}
                  >
                    <FaThumbsUp /> {chapter.likes}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StoryDetails;
