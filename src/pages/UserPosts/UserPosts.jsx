import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";
import "./UserPosts.css";
import convertDate from "../../utils/convertDate";
import { FaUserCircle, FaHeart, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import VerifyUserID from "../../component/VerifyUser/VerifyUserId";

const UserPosts = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const [views, setViews] = useState({});

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:5000/user/${userId}`
        );
        setUserData(userResponse.data.user);

        const response = await axios.get(
          `http://localhost:5000/user/${userId}/posts`
        );

        const sortedPosts = response.data.userPosts.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        const likesData = {};
        const viewsData = {};

        sortedPosts.forEach((post) => {
          likesData[post._id] = post.likes;
          viewsData[post._id] = post.views;
        });

        // setLikes(likesData);
        setViews(viewsData);

        setUserPosts(sortedPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + " .... continue!";
    }
    return text;
  };

  const handlePostClick = async (postId) => {
    try {
      // Check if the post has been viewed by the user
      const viewedPosts = JSON.parse(localStorage.getItem("viewedPosts")) || [];

      if (!viewedPosts.includes(postId)) {
        // If not viewed, send request to update view count
        const response = await axios.post(
          `http://localhost:5000/posts/${postId}/view`
        );
        //console.log("View count updated:", response);

        setViews((prevViews) => ({
          ...prevViews,
          [postId]: response.data.views,
        }));

        viewedPosts.push(postId);
        localStorage.setItem("viewedPosts", JSON.stringify(viewedPosts));
      }

      navigate(`/contents/${postId}`);
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  };

  return (
    <div className="UserPostsBody">
      <Navbar />
      <Navibar />
      <div className="userpostsContainer">
        <div className="authorDetails">
          <div>
            {userData?.profilePicture ? (
              <img
                src={userData.profilePicture}
                alt="Profile"
                className="writerPicture"
              />
            ) : (
              <FaUserCircle className="default-avatar-icon-user" />
            )}
          </div>

          <div className="mydisplayinfo">
            <h1> {userData?.fullname}</h1>
            <h3>
              @{userData?.username}
              <VerifyUserID userId={userId} />
            </h3>
            <h3>Tel:{userData?.phoneNumber}</h3>
          </div>
        </div>

        <section>
          <div>
            {loading ? (
              <p>Loading...</p>
            ) : userPosts.length === 0 ? (
              <p>No posts found.</p>
            ) : (
              <div className="UsersContents">
                {userPosts.map((post) => (
                  <div className="EachContent" key={post._id}>
                    <div className="EachContentTop">
                      <p id="displaydate">{convertDate(post?.createdAt)}</p>
                      <p id="displayview">
                        <FaEye id="faeye" />
                        <span>{views[post._id] || 0}</span>
                      </p>
                      {/* <p id="s-choice">{post?.selectedChoice}</p> */}
                    </div>
                    <p
                      className="content"
                      onClick={() => handlePostClick(post?._id)}
                    >
                      <p id="s-title">{post?.title}</p>

                      {truncateText(post.textAreaValue, 10)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserPosts;
