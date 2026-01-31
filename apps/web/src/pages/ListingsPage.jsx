import Navbar from "../components/Navbar";

export default function ListingsPage() {
  return (
    <div className="page">
      <Navbar />
      <div style={{ maxWidth: 1050, margin: "0 auto", padding: 16 }}>
        <h1>Listings</h1>
        <p>This page is protected. You are logged in ✅</p>
      </div>
    </div>
  );
}
