import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardTopbar.css";

export default function DashboardTopbar({
  searchValue = "",
  onSearchChange = () => {},
}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const username =
    localStorage.getItem("fullName") ||
    localStorage.getItem("username") ||
    "User";

  const email = localStorage.getItem("email") || "user@email.com";
  const initial = username.charAt(0).toUpperCase();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    navigate("/signin");
  };

  return (
    <header className="dashboard-topbar">
      <div className="dashboard-topbar-left">
        <div className="dashboard-logo" onClick={() => navigate("/")}>
          Move-In
        </div>
      </div>

      <div className="dashboard-topbar-center">
        <input
          type="text"
          className="dashboard-search"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="dashboard-topbar-right" ref={menuRef}>
        <button
          type="button"
          className="profile-trigger"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <div className="profile-avatar">{initial}</div>
          <span className="profile-name">{username}</span>
          <span className="profile-caret">▾</span>
        </button>

        {menuOpen && (
          <div className="profile-dropdown">
            <div className="profile-dropdown-header">
              <div className="profile-dropdown-name">{username}</div>
              <div className="profile-dropdown-email">{email}</div>
            </div>

            <div className="profile-dropdown-links">
              <button
                type="button"
                className="dropdown-link"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/customer");
                }}
              >
                Dashboard
              </button>

              <button
                type="button"
                className="dropdown-link"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/listings");
                }}
              >
                Browse Services
              </button>

              <button
                type="button"
                className="dropdown-link"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/customer?tab=messages");
                }}
              >
                💬 Messages
              </button>
            </div>

            <div className="profile-dropdown-footer">
              <button
                type="button"
                className="signout-btn"
                onClick={handleSignOut}
              >
                ↪ Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}