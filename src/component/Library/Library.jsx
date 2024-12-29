import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Library = () => {
  const { id } = useParams();
  const [library, setLibrary] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInformation = JSON.parse(localStorage.getItem("userInformation"));
    if (userInformation && userInformation.token) {
      setToken(userInformation.token);
    }
  }, []);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await fetch(`http://localhost:5000/library/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setLibrary(data.stories || []);
          setLoading(false);
          if (data.stories && data.stories.length === 0) {
            setMessage("No Story in your yet Library yet");
          }
        } else {
          setLibrary([]);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (token) fetchLibrary();
  }, [token]);

  if (error) return <p>{error}</p>;
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Library</h2>
      {Array.isArray(library) && library.length > 0 ? (
        <div className="story-grid">
          {library.map((story) => (
            <div key={story._id} className="story-item">
              <Link to={`/story/${story._id}`} className="story-link">
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
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>{message || "No stories in your library yet."}</p>
      )}
    </div>
  );
};

export default Library;
