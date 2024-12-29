import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditPost.css";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [selectedChoice, setSelectedChoice] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [errorResponse, setErrorResponse] = useState(null);
  const [postDetails, setPostDetails] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/post/${id}`);
        const { title, textAreaValue, selectedChoice } =
          response.data.SinglePost;
        setTitle(title);
        setTextAreaValue(textAreaValue);
        setSelectedChoice(selectedChoice);
      } catch (error) {
        setError("Error fetching post data");
      }
    };
    id && fetchPost();
  }, [id]);

  const getUserUsername = () => {
    const userData = JSON.parse(localStorage.getItem("userInformation"));
    return userData ? userData.result.username : "";
  };

  const handleChoiceChange = (event) => {
    setSelectedChoice(event.target.value);
  };

  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  const submitForm = async () => {
    const userData = JSON.parse(localStorage.getItem("userInformation"));
    const userId = userData?.result?.id;

    const getUserToken = () => {
      const userData = JSON.parse(localStorage.getItem("userInformation"));
      return userData ? userData.token : "";
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/posts/edit/${id}`,
        {
          title,
          textAreaValue,
          selectedChoice,
          //   userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getUserToken()}`,
          },
        }
      );

      if (response.status === 200) {
        // //console.log("Post updated:", response.data);
        navigate("/profile/:username");
      } else {
        const errorResponseData = await response.json();
        setErrorResponse(errorResponseData.error);
      }
    } catch (error) {
      setError("Error updating post");
    }
  };

  return (
    <div className="EditPostBody">
      <Navbar />
      <Navibar />
      <section className="EditPost">
        <h2>Edit Post</h2>
        {error && <p>{error}</p>}
        <br />
        <label>Category:</label>
        <select
          id="categories"
          value={selectedChoice}
          onChange={handleChoiceChange}
        >
          <option value="">Select an option</option>
          <option value="Story">Story</option>
          <option value="Poetry">Poetry</option>
          <option value="Essay">Essay</option>
          <option value="NonFiction">Non-Fiction</option>
        </select>
        <br /> <br />
        <label htmlFor="Author"> Author: </label> <br />
        <input
          type="text"
          name="author"
          id="Creator"
          required
          value={getUserUsername()}
          readOnly
        />{" "}
        <br /> <br />
        <label>Title:</label> <br />
        <input
          id="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /> <br />
        <label>Content:</label>
        <textarea
          id="content"
          value={textAreaValue}
          onChange={handleTextAreaChange}
        />
        <br /> <br />
        <button id="editpostbtn" onClick={submitForm}>
          Update Post
        </button>
      </section>
    </div>
  );
};

export default EditPost;
