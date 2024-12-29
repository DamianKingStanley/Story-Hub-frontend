import React, { useState } from "react";
import "./LogIn.css";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLogIn.css";

const AdminLogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [loginMessage, setLoginMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const storeUserData = (userData) => {
    localStorage.setItem("userInformation", JSON.stringify(userData));
    return true;
  };

  const submitForm = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        storeUserData(data);
        setIsLoading(false);
        if (role === "admin") {
          navigate("/create-story");
        } else {
          navigate("/");
        }
      } else {
        // Capture the backend error message and stop loading
        const errorResponseData = await response.json();
        setLoginMessage(
          errorResponseData.message || "Login failed. Try again later."
        );
        setIsLoading(false);
      }
    } catch (error) {
      // Capture unexpected errors and stop loading
      setLoginMessage("An error occurred. Try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div className="AdminLogInbody">
      <section className="Login">
        {loginMessage && (
          <div
            className={
              loginMessage === "Login successful"
                ? "success-message"
                : "error-message"
            }
          >
            {loginMessage}
          </div>
        )}
        <h1>AfroTales! </h1>
        <p>Admin Sign In</p>
        <div id="Loginform">
          <div>
            <input
              type="email"
              name="email"
              id="emailL"
              placeholder="Enter your email here"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="passwordL"
                placeholder="Enter your password here"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              ></span>
            </div>
            <label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                id="role"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <button onClick={submitForm} id="submitbtn" disabled={isLoading}>
              {isLoading ? "Logging In Now..." : "Log In"}
            </button>
            <br />
            <p>
              Don't have an account?
              <Link to="/register"> Sign Up</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminLogIn;
