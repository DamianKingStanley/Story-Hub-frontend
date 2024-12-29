import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ChapterDetails.css";

const ChapterDetails = () => {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await fetch(`http://localhost:5000/chapter/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch chapter details");
        }
        const data = await response.json();
        setChapter(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching chapter:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [id]);

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

  if (!chapter) {
    return <p>No chapter found.</p>;
  }

  return (
    <div>
      <div className="chapter-details-page">
        <h1>{chapter.title}</h1>
        <p className="chapter-content">{chapter.content}</p>
      </div>
    </div>
  );
};

export default ChapterDetails;
