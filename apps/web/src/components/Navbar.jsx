import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navInner">
        <Link className="brand" to="/">
          <span className="brandIcon" aria-hidden="true">🚚</span>
          <span className="brandText">Move-In</span>
        </Link>

        <div className="navActions">
          <button
            className="btnOutline"
            type="button"
            onClick={() => navigate("/list-your-truck")}
          >
            List Your Truck
          </button>

          <Link className="linkBtn" to="/signin">
            Sign In
          </Link>

          <Link className="btnPrimary" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
