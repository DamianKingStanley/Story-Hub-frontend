import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddChapter.css";

const AddChapter = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userInformation = JSON.parse(
          localStorage.getItem("userInformation")
        );
        if (!userInformation || userInformation.result.role !== "admin") {
          navigate("/");
          return;
        }
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };

    fetchUserId();
  }, [navigate]);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/stories/${storyId}/chapters`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch chapters");
        }

        const data = await response.json();

        setChapters(data);

        setChapters(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching chapters:", error);
        setChapters([]); // Fallback to an empty array in case of error
      } finally {
        setLoading(false);
      }
    };
    fetchChapters();
  }, [storyId]);

  const handleAddChapter = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/create-chapter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          story_id: storyId,
          title,
          content,
          is_locked: isLocked,
        }),
      });
      if (response.ok) {
        const newChapter = await response.json();
        setChapters([...chapters, newChapter]);
        setTitle("");
        setContent("");
        setIsLocked(false);
      } else {
        console.error("Error adding chapter");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteChapter = async (chapterId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/chapter/${chapterId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setChapters(chapters.filter((chapter) => chapter._id !== chapterId));
      } else {
        console.error("Error deleting chapter");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) return <p>Loading chapters...</p>;

  return (
    <div>
      <div className="AddChapterContainer">
        <div className="ChapterFormContainer">
          <h1>Add Chapter to Story</h1>
          <form className="addChapterForm" onSubmit={handleAddChapter}>
            <input
              type="text"
              placeholder="e.g Chapter 1 - Title"
              value={title}
              id="chaptertitle"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Paste your Content here"
              value={content}
              id="chaptercontent"
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <label>
              <input
                type="checkbox"
                checked={isLocked}
                onChange={(e) => setIsLocked(e.target.checked)}
              />
              Lock Chapter
            </label>
            <button className="addChapterBtn" type="submit">
              Add Chapter
            </button>
          </form>
        </div>

        <div className="previousChapters">
          <h2>Existing Chapters</h2>
          {!loading && (
            <div>
              {chapters.length > 0 ? (
                chapters.map((chapter) => (
                  <div id="EachChapter" key={chapter._id}>
                    <div>
                      <h3>{chapter.title}</h3>
                    </div>
                    <div className="EachChapterAction">
                      <p
                        onClick={() =>
                          navigate(`/chapters/${chapter._id}/edit`)
                        }
                      >
                        Edit
                      </p>
                      <p onClick={() => handleDeleteChapter(chapter._id)}>
                        Delete
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No chapters found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddChapter;
