import { useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import apiRequest from "../../lib/apiRequest.js";
import { useNotificationStore } from "../../lib/notificationStore.js";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser, updateUser } = useContext(AuthContext)
  const navigate = useNavigate();

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);


  if(currentUser) {
    fetch();
  }


  const handleLogout = async () => {
    try {
      const res = await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>GammaEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src={currentUser.avatar || "/noavatar.jpg"}
              alt=""
            />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          {
            !currentUser ? (
              <>
                <a href="/login">Sign in</a>
                <a href="/register">Sign up</a>
              </>
            )
            :
            (
              <a href="/" onClick={(e) => {e.preventDefault(); handleLogout();}}>Logout</a>
            )
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;