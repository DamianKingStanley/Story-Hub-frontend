import React, { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className="theme-switcher-button"
      onClick={toggleTheme}
      style={{
        fontSize: "1.5rem",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "blue",
      }}
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeSwitcher;
