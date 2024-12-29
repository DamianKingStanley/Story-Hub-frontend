import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import maleprofilepicture from "../../assest/defaultDPmale.jpg";
import femaleprofilepicture from "../../assest/defaultDPfemale.jpg";
import defaultDPone from "../../assest/defaultDPone.png";
import defaultDPtwo from "../../assest/defaultDPtwo.png";
import defaultDPthree from "../../assest/defaultDPthree.jpg";
import defaultDPfour from "../../assest/defaultDPfour.png";
import defaultDPfive from "../../assest/defaultDPfive.png";
import defaultDPsix from "../../assest/defaultDPsix.png";
import defaultDPseven from "../../assest/defaultDPseven.png";
import defaultDPeight from "../../assest/defaultDPeight.png";
import defaultDPnine from "../../assest/defaultDPnine.png";
import defaultDPten from "../../assest/defaultDPten.png";

const UpdateProfile = () => {
  const [user, setUser] = useState(null);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userInformation"));
        if (!userData || !userData.result.id) {
          console.error("User ID is undefined");
          return;
        }

        const userId = userData.result.id;

        const response = await fetch(
          `http://localhost:5000/user/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUser(data);
          setFullname(data.fullname);
          setUsername(data.username);
          setPhoneNumber(data.phoneNumber);
          setLocation(data.location);
        } else {
          console.error(data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    getUserProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!selectedProfilePicture) {
      setShowError(true);
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem("userInformation"));
      const getUserToken = () => {
        return userData ? userData.token : "";
      };

      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("username", username);
      formData.append("phoneNumber", phoneNumber);
      formData.append("location", location);
      formData.append("selectedProfilePicture", selectedProfilePicture);

      const response = await axios.put(
        `http://localhost:5000/user/profile/${userData.result.id}/update`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getUserToken()}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Profile updated successfully");
        navigate(`/profile/${userData.result.username}`);
      } else {
        console.error("Error updating profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const profilePictures = [
    maleprofilepicture,
    femaleprofilepicture,
    defaultDPone,
    defaultDPtwo,
    defaultDPthree,
    defaultDPfour,
    defaultDPfive,
    defaultDPsix,
    defaultDPseven,
    defaultDPeight,
    defaultDPnine,
    defaultDPten,
  ];

  return (
    <div className="UpdateProfileBody">
      <Navbar />
      <Navibar />
      <div className="UpdateProfileForm">
        <h2>Profile</h2>
        <div className="profileDetails">
          <div className="InputValues">
            <p>Full Name: {user.fullname}</p>
            <p>Username: {user.username}</p>
            <p>Phone Number: {user.phoneNumber}</p>
            <p>Location: {user.location}</p>
          </div>
          <form onSubmit={handleUpdateProfile}>
            <h2>Update Profile</h2>
            <div className="displayImageContainer">
              {selectedProfilePicture ? (
                <img
                  className="displayImage"
                  src={selectedProfilePicture}
                  alt="profilePicture"
                />
              ) : (
                <FaUser className="avatarIcon" />
              )}
            </div>
            <br />
            <br />
            <p>Choose any of the clipart as your display photo:</p>
            <div className="profilePictureChoices">
              {profilePictures.map((picture, index) => (
                <img
                  key={index}
                  src={picture}
                  alt={`profilePicture-${index}`}
                  className={`profilePictureChoice ${
                    picture === selectedProfilePicture
                      ? "selectedProfilePicture"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedProfilePicture(picture);
                    setShowError(false);
                  }}
                />
              ))}
            </div>
            {showError && (
              <p className="error-message">Please select a profile picture.</p>
            )}
            <br /> <br />
            <input
              type="text"
              id="fullname"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />{" "}
            <br /> <br />
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br /> <br />
            <input
              type="text"
              id="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <br /> <br />
            <input
              type="text"
              id="location"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />{" "}
            <br /> <br />
            <button id="updateButton" type="submit">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
