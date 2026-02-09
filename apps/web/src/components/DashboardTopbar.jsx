import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DashboardTopbar.css";

export default function DashboardTopbar({
  searchValue = "",
  onSearchChange = () => {},
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Get profile info from localStorage (you can replace with real user data later)
  const name = localStorage.getItem("fullName") || localStorage.getItem("username") || "User";
  const email = localStorage.getItem("email") || "user@example.com";

  const initials = name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  const dropdownRef = useRef(null);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const signOut = () => {
    // clear auth
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    // keep or remove these as you want:
    // localStorage.removeItem("username");
    // localStorage.removeItem("fullName");
    // localStorage.removeItem("email");

    setOpen(false);
    navigate("/signin", { replace: true });
  };

  return (
    <div className="dtb-wrap">
      <div className="dtb">
        {/* Left: Logo */}
        <Link to="/" className="dtb-logo">
          <span className="dtb-truck" aria-hidden="true">🚚</span>
          <span className="dtb-brand">Move-In</span>
        </Link>

        {/* Middle: Search */}
        <div className="dtb-search">
          <span className="dtb-search-icon" aria-hidden="true">🔎</span>
          <input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search trucks, movers, or services..."
          />
        </div>

        {/* Right: Profile */}
        <div className="dtb-profile" ref={dropdownRef}>
          <button className="dtb-profile-btn" onClick={() => setOpen((v) => !v)}>
            <span className="dtb-avatar">{initials || "U"}</span>
            <span className="dtb-name">{name}</span>
            <span className="dtb-caret" aria-hidden="true">▾</span>
          </button>

          {open && (
            <div className="dtb-menu">
              <div className="dtb-menu-top">
                <div className="dtb-menu-name">{name}</div>
                <div className="dtb-menu-email">{email}</div>
              </div>

              <div className="dtb-menu-items">
                <Link to="/customer" className="dtb-item" onClick={() => setOpen(false)}>
                  Dashboard
                </Link>

                <Link to="/browse" className="dtb-item" onClick={() => setOpen(false)}>
                  Browse Services
                </Link>

                <button className="dtb-item dtb-item-btn" onClick={() => { setOpen(false); alert("Open messages"); }}>
                  💬 Messages
                </button>
              </div>

              <div className="dtb-menu-footer">
                <button className="dtb-signout" onClick={signOut}>
                  ⇦ Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
