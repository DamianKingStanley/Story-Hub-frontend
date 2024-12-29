import React, { useState } from "react";
import "./AdminRegister.css";
import { Link, useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const navigate = useNavigate();

  const [fullname, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [secretKey, setSecretKey] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (/^\d/.test(fullname)) {
      newErrors.fullname = "Full name cannot start with a number.";
      isValid = false;
    }

    if (/^\d/.test(username)) {
      newErrors.username = "Username cannot start with a number.";
      isValid = false;
    }

    if (/^\d/.test(email)) {
      newErrors.email = "Email cannot start with a number.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (password.length < 7) {
      newErrors.password = "Password must be at least 7 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submitForm = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          username,
          email,
          password,
          role,
          secretKey: role === "admin" ? secretKey : undefined, // Send secretKey only if role is "admin"
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setRegisterMessage("Registered successfully");
        navigate("/admin/login");
      } else {
        const errorResponseData = await response.json();
        setRegisterMessage(
          errorResponseData.message || "Registration failed. Try again later."
        );
      }
    } catch (error) {
      setRegisterMessage("Registration failed. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="AdminSignInbody">
      <section className="register">
        {registerMessage && (
          <div
            className={
              registerMessage === "Registered successfully"
                ? "success-message"
                : "error-message"
            }
          >
            {registerMessage}
          </div>
        )}
        <h1>Welcome to AfroTales.</h1>
        <p>Fill the form below to get started</p>
        <div id="registerform">
          <div>
            <input
              type="text"
              name="fullname"
              placeholder="Enter your full name"
              required
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullname && (
              <div className="error-message">{errors.fullname}</div>
            )}

            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            {errors.username && (
              <div className="error-message">{errors.username}</div>
            )}

            <input
              type="email"
              name="email"
              placeholder="Enter a valid email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}

            <div>
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                id="adminrole"
              >
                {/* <option value="user">User</option> */}
                <option value="admin">Admin</option>
              </select>
            </div>

            {role === "admin" && (
              <div className="form-group">
                <input
                  type="password"
                  id="secretKey"
                  placeholder="Admin secret key"
                  required
                  onChange={(e) => setSecretKey(e.target.value)}
                />
              </div>
            )}

            <button onClick={submitForm} id="submitbtn" disabled={isLoading}>
              {isLoading ? "Please wait..." : "Register"}
            </button>
            <br />
          </div>
          <br />
          <p>
            Already have an account? <Link to="/logIn">Log in</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default AdminRegister;
