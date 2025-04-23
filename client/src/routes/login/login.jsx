import "./login.scss";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest.js";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password
      });

      try {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (storageError) {
        console.error("Failed to save user to localStorage", storageError);
      }
      
      updateUser(res.data.user);
      navigate("/")
    } catch (err) {
      console.log(err);
      setError(err.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }
  
  return !currentUser ? (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" required minLength={3} type="text" placeholder="Username" />
          <input name="password" type="password" required placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  ) :(
    <Navigate to="/" />
  )
}

export default Login;