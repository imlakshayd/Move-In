import Navbar from "../components/Navbar";
import "./Auth.css";

export default function ListYourTruckPage() {
  return (
    <div className="authPage">
      <Navbar />
      <main className="authMain">
        <div className="authCard">
          <h1 className="authTitle">List Your Truck</h1>
          <p className="authSubtitle">Coming next — create listing form.</p>
        </div>
      </main>
    </div>
  );
}

