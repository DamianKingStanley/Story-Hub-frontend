import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    browse: false,
    authorsBenefit: false,
    contest: false,
  });
  const [username, setUsername] = useState("Guest");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const navRef = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInformation"));
    if (userData && userData.result.username) {
      setUsername(userData.result.username);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userInformation"));
        if (userData && userData.result.id) {
          const response = await fetch(
            `http://localhost:5000/user/profile/${userData.result.id}`,
            {
              headers: {
                Authorization: `Bearer ${userData.token}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            setUser(data);
          } else {
            console.error("Failed to fetch user profile:", data);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (isLoggedIn) fetchUserProfile();
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("userInformation");
    setIsLoggedIn(false);
    setUsername("Guest");
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/stories/search?query=${searchQuery}`);
    }
  };

  const toggleDropdown = (menu) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const closeMobileMenu = () => {
    setIsMobile(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && navRef.current && !navRef.current.contains(e.target)) {
        closeMobileMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile]);
  const handleClick = (stage) => {
    navigate(`/contests/${stage}`); // Programmatically navigate to the stage
  };
  return (
    <div>
      <nav className="Navbar" ref={navRef}>
        <div className="NavbarContainer">
          <div className="Logo">
            <Link to="/">AfroTales</Link>
          </div>

          <div
            className="MobileMenuIcon"
            onClick={() => setIsMobile(!isMobile)}
          >
            {isMobile ? <FaTimes id="icn" /> : <FaBars id="icn" />}
          </div>
          <ul className={isMobile ? "NavActions active" : "NavActions"}>
            <li className="NavItem" onClick={closeMobileMenu}>
              <Link to="/">Home</Link>
            </li>
            <li className="NavItem" onClick={closeMobileMenu}>
              <Link to="/ranking">Ranking</Link>
            </li>
            <li
              id="browse-lists"
              className="NavItem"
              onMouseEnter={() => toggleDropdown("browse")}
              onMouseLeave={() => toggleDropdown("browse")}
              onClick={closeMobileMenu}
            >
              <span>Browse</span>
              {isDropdownOpen.browse && (
                <ul className="DropdownMenu browse-list">
                  <li onClick={closeMobileMenu}>
                    <Link to="/stories/african-folktale">
                      African Folktales
                    </Link>
                  </li>
                  <li>
                    <Link to="/stories/african-mythology">
                      African Mythology
                    </Link>
                  </li>
                  <li>
                    <Link to="/stories/historical-fiction">
                      Historical Fiction
                    </Link>
                  </li>
                  <li>
                    <Link to="/stories/diaspora-narratives">
                      Diaspora Narratives
                    </Link>
                  </li>
                  <li>
                    <Link to="/stories/post-colonel">
                      Post-Colonial Fiction
                    </Link>
                  </li>
                  <li>
                    <Link to="/stories/afrofuturism">Afrofuturism</Link>
                  </li>
                  <li>
                    <Link to="/stories/traditional-poetry">
                      Traditional Poetry and Oral Narratives
                    </Link>
                  </li>
                  <li>
                    <Link to="/stories/social-realism">Social Realism</Link>
                  </li>
                  <li>
                    <Link to="/stories/african-romance">African Romance</Link>
                  </li>
                  <li>
                    <Link to="/stories/tribal-story">Tribal Stories</Link>
                  </li>
                  <li>
                    <Link to="/stories/yoruba-poetry">Yoruba Ifa Poetry</Link>
                  </li>
                  <li>
                    <Link to="/stories/igbo-egwu">Igbo Akuko na Egwu</Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              className="NavItem"
              onMouseEnter={() => toggleDropdown("authorsBenefit")}
              onMouseLeave={() => toggleDropdown("authorsBenefit")}
            >
              <span>Author's Benefit</span>
              {isDropdownOpen.authorsBenefit && (
                <ul className="DropdownMenu">
                  <li onClick={closeMobileMenu}>
                    <Link to="/authors/perks">Perks</Link>
                  </li>
                  <li onClick={closeMobileMenu}>
                    <Link to="/authors/guidelines">Guidelines</Link>
                  </li>
                  <li onClick={closeMobileMenu}>
                    <Link to="/authors/support">Support</Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              className="NavItem"
              onMouseEnter={() => toggleDropdown("contest")}
              onMouseLeave={() => toggleDropdown("contest")}
            >
              <span>Contest</span>
              {isDropdownOpen.contest && (
                <ul className="DropdownMenu">
                  <li onClick={closeMobileMenu}>
                    <Link to="/contests/stage-one">Stage One</Link>
                  </li>
                  <li onClick={closeMobileMenu}>
                    <Link to="/contests/stage-two">Stage Two</Link>
                  </li>
                  <li onClick={closeMobileMenu}>
                    <Link to="/contests/semi-final">Semi Final</Link>
                  </li>
                  <li onClick={closeMobileMenu}>
                    <Link to="/contests/final">Final Stage</Link>
                  </li>
                </ul>
              )}
            </li>
            <form className="SearchBar" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search for stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <FaSearch />
              </button>
            </form>
            <div className="NavItem Account">
              <span>{username}</span>
              {isLoggedIn ? (
                <ul className="DropdownMenu">
                  <li onClick={closeMobileMenu}>
                    <Link to={`/user/profile/${user?._id}`}>Dashboard</Link>
                  </li>
                  <li onClick={closeMobileMenu}>
                    <button className="logoutbutton" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              ) : (
                <button
                  className="loginbutton"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              )}
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
