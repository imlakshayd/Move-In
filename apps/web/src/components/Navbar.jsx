import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleListYourTruck = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

   
    if (!token) {
      navigate("/signin");
      return;
    }

    if (role !== "vendor") {
      alert("Only vendors can list trucks. Please sign in as a vendor.");
      navigate("/signin");
      return;
    }

  
    navigate("/list-your-truck");
  };

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
            onClick={handleListYourTruck}
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