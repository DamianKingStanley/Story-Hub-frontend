import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";

const CreatePost = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [ageRating, setAgeRating] = useState("");
  const [genre, setGenre] = useState("");
  const [tropes, setTropes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [synopsis, setSynopsis] = useState("");
  const [stage, setStage] = useState("");
  const [category, setCategory] = useState("");
  const [coverPicture, setCoverPicture] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [errorResponse, setErrorResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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

  const handleCoverPictureChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const img = new Image();
      img.onload = () => {
        if (img.width <= 1410 && img.height <= 2250) {
          setCoverPicture(file);
          setCoverPreview(URL.createObjectURL(file));
        } else {
          alert("Image size must be 1410x2250 pixels or smaller.");
        }
      };
      img.src = URL.createObjectURL(file);
    } else {
      alert("Only JPG and PNG formats are accepted.");
    }
  };

  const handleTropeChange = (event) => {
    const value = event.target.value;
    if (value && !tropes.includes(value)) {
      setTropes([...tropes, value]);
    }
  };

  const removeTrope = (trope) => {
    setTropes(tropes.filter((t) => t !== trope));
  };
  const handleCharacterChange = (event) => {
    const selectedCharacter = event.target.value;
    if (selectedCharacter && !characters.includes(selectedCharacter)) {
      setCharacters([...characters, selectedCharacter]);
    }
  };

  const removeCharacter = (characterToRemove) => {
    setCharacters(
      characters.filter((character) => character !== characterToRemove)
    );
  };

  const submitForm = async () => {
    const userInformation = JSON.parse(localStorage.getItem("userInformation"));
    if (!userInformation || !userInformation.result || !userInformation.token) {
      setErrorResponse("User information is missing. Please log in.");
      navigate("/login");
      return;
    }

    const getUserToken = () => {
      return userInformation ? userInformation.token : "";
    };

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("userId", userInformation.result.id);
      formData.append("author", author);
      formData.append("title", title);
      formData.append("age_rating", ageRating);
      formData.append("genre", genre);
      formData.append("trope", tropes.join(","));
      formData.append("character", characters.join(","));
      formData.append("synopsis", synopsis);
      formData.append("stage", stage);
      formData.append("category", category);
      formData.append("cover_url", coverPicture);

      const response = await fetch("http://localhost:5000/create-story", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoading(false);

        navigate(`/user/profile/${userInformation.result.id}`);
      } else {
        const errorResponseData = await response.json();
        setErrorResponse(errorResponseData.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="CreatePostBody">
      <section className="Createpost">
        <div className="coverrDiv">
          <h3>Book Cover (1410x2250 JPG/PNG)</h3>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleCoverPictureChange}
          />{" "}
          <br />
          {coverPreview && (
            <div className="cover-preview">
              <img id="coverDisplay" src={coverPreview} alt="Cover Preview" />
            </div>
          )}
        </div>
        <div className="storyInfoDiv">
          {errorResponse && <p className="post_response">{errorResponse}</p>}
          <h1>BOOK INFORMATION</h1>
          <input
            type="text"
            name="author"
            id="author"
            placeholder="Enter Author's name"
            required
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            name="title"
            id="postTitle"
            placeholder="Enter Book Title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <h3>Age Rating</h3>
          <div
            id="ageRating"
            onChange={(e) => setAgeRating(e.target.value)}
            required
          >
            <input type="radio" value="4+" name="ageRating" /> 4+
            <input type="radio" value="12+" name="ageRating" /> 12+
            <input type="radio" value="16+" name="ageRating" /> 16+
            <input type="radio" value="18+" name="ageRating" /> 18+
          </div>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          >
            <option value="">Select the Story Genre</option>
            <option value="igbo-egwu">Igbo Akuko na Egwu</option>
            <option value="yoruba-poetry">Yoruba Ifa Poetry</option>
            <option value="tribal-story">Tribal Stories</option>
            <option value="african-romance">African Romance</option>
            <option value="social-realism">Social Realism</option>
            <option value="traditional-poetry">
              Traditional Poetry and Oral Narratives
            </option>
            <option value="afrofuturism">Afrofuturism</option>
            <option value="post-colonel"> Post-Colonial Fiction</option>
            <option value="diaspora-narratives"> Diaspora Narratives</option>
            <option value="historical-fiction"> Historical Fiction</option>
            <option value="african-mythology"> African Mythology</option>
            <option value="african-folktale"> African Folktales</option>
          </select>
          <select id="trope" onChange={handleTropeChange} required>
            <option value="">Select the Story Tropes</option>
            <option value="Revenge">Revenge</option>
            <option value="Quest">Quest</option>
            <option value="Redemption">Redemption</option>
            <option value="Betrayal">Betrayal</option>
            <option value="Destiny">Destiny</option>
            <option value="Sacrifice">Sacrifice</option>
            <option value="Awakening">Awakening</option>
            <option value="Survival">Survival</option>
            <option value="Transformation">Transformation</option>
            <option value="Adventure">Adventure</option>
            <option value="Deception">Deception</option>
            <option value="Escape">Escape</option>
            <option value="Legacy">Legacy</option>
            <option value="Mystery">Mystery</option>
            <option value="Resurrection">Resurrection</option>
            <option value="Age Gap">Age Gap</option>
            <option value="Hatred">Hatred</option>
            <option value="Fake Love">Fake Love</option>
            <option value="Loyalty">Loyalty</option>
            <option value="Money">Money</option>
            <option value="Reborn">Reborn</option>
            <option value="Lust">Lust</option>
            <option value="Desire">Desire</option>
            <option value="Passion">Passion</option>
            <option value="One night">One night</option>
            <option value="Pregnancy">Pregnancy</option>
            <option value="Secret Crush">Secret Crush</option>
            <option value="Contract marriage">Contract marriage</option>
            <option value="CEO">CEO</option>
            <option value="Friends to Lovers">Friends to Lovers</option>
            <option value="Forbidden Love">Forbidden Love</option>
            <option value="Love Triangle">Love Triangle</option>
            <option value="Redemption">Redemption</option>
            <option value="">---------Poetry-Trope-----------</option>
            <option value="Ephemeral">Ephemeral</option>
            <option value="Longing">Longing</option>
            <option value="Loss">Loss</option>
            <option value="Rebirth">Rebirth</option>
            <option value="Isolation">Isolation</option>
            <option value="Elegy">Elegy</option>
            <option value="Passion">Passion</option>
            <option value="Innocence">Innocence</option>
            <option value="Duality">Duality</option>
            <option value="Solitude">Solitude</option>
            <option value="Transience">Transience</option>
            <option value="Whimsy">Whimsy</option>
            <option value="Silence">Silence</option>
            <option value="Oblivion">Oblivion</option>
            <option value="Dream">Dream</option>
            <option value="">--------Drama-Trope-------</option>
            <option value="Conflict">Conflict</option>
            <option value="Irony">Irony</option>
            <option value="Ambition">Ambition</option>
            <option value="Fate">Fate</option>
            <option value="Hubris">Hubris</option>
            <option value="Madness">Madness</option>
            <option value="Intrigue">Intrigue</option>
            <option value="Justice">Justice</option>
            <option value="Honor">Honor</option>
            <option value="Despair">Despair</option>
            <option value="Rivalry">Rivalry</option>
            <option value="Scandal">Scandal</option>
            <option value="Exile">Exile</option>
            <option value="Lust">Lust</option>
            <option value="Secrecy">Secrecy</option>
          </select>
          <div className="tags-container">
            {tropes.map((trope, index) => (
              <span key={index} className="tag">
                {trope}{" "}
                <span className="remove-tag" onClick={() => removeTrope(trope)}>
                  ×
                </span>
              </span>
            ))}
          </div>
          <select id="character" onChange={handleCharacterChange} required>
            <option value="">Select your character type</option>
            <option value="Optimist">Optimist</option>
            <option value="Hero">Hero</option>
            <option value="Villain">Villain</option>
            <option value="Mentor">Mentor</option>
            <option value="Villain">Villain</option>
            <option value="Outsider">Outsider</option>
            <option value="Warrior">Warrior</option>
            <option value="Rebel">Rebel</option>
            <option value="Protector">Protector</option>
            <option value="Dreamer">Dreamer</option>
            <option value="Sage">Sage</option>
            <option value="Innocent">Innocent</option>
            <option value="Avenger">Avenger</option>
            <option value="Guardian">Guardian</option>
            <option value="Trickster">Trickster</option>
            <option value="Chosen">Chosen</option>
            <option value="Explorer">Explorer</option>
            <option value="Anti-hero">Anti-hero</option>
            <option value="Sidekick">Sidekick</option>
            <option value="Pessimist">Pessimist</option>
            <option value="Sweet">Sweet</option>
            <option value="Ruthless">Ruthless</option>
            <option value="Emotional">Mentor</option>
            <option value="Crazy">Crazy</option>
            <option value="Funny">Funny</option>
            <option value="Loyal">Loyal</option>
            <option value="Annoying">Annoying</option>
            <option value="Protective">Protective</option>
            <option value="Humble">Humble</option>
            <option value="Reliable">Reliable</option>
            <option value="Beauty">Beauty</option>
            <option value="Handome">Handome</option>
            <option value="Manipulative">Manipulative</option>
          </select>
          <div className="tags-container">
            {characters.map((character, index) => (
              <span key={index} className="tag">
                {character}{" "}
                <span
                  className="remove-tag"
                  onClick={() => removeCharacter(character)}
                >
                  ×
                </span>
              </span>
            ))}
          </div>
          <h3>Synopsis</h3>
          <textarea
            id="synopsis"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            required
          />
          <select
            id="genre"
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            required
          >
            <option value="">What Stage?</option>
            <option value="stage-one">Stage One</option>
            <option value="stage-two">Stage Two</option>
            <option value="semi-final">Semi Final stage</option>
            <option value="final">Final Stage</option>
          </select>
          <select
            id="genre"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">What Category?</option>
            <option value="Short-Novel">Short Novel</option>
            <option value="Poetry-Story">Poetry-Story</option>
            <option value="Drama">Drama</option>
          </select>
          <br /> <br />
          <button id="createpostbtn" onClick={submitForm} disabled={isLoading}>
            {isLoading ? "Saving Book Info" : "Create"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default CreatePost;
