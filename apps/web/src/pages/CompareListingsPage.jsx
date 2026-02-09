// apps/web/src/pages/CompareListingsPage.jsx
import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./CompareListingsPage.css";

const VENDORS = [
  {
    id: "swift",
    name: "Swift Movers LLC",
    price: 89,
    rating: 4.9,
    reviews: 342,
    vehicleType: "Box Truck",
    location: "Los Angeles, CA",
    verified: true,
    insurance: "Full Coverage ($1M)",
    minimumHours: "2 hours",
    crewSize: "2-3 movers",
    equipment: "Dollies, blankets, straps",
    availabilityNote: "Same-day available",
    cancellationPolicy: "Free up to 24hrs",
    experience: "10+ years",
  },
  {
    id: "pro",
    name: "Pro Transport Co.",
    price: 75,
    rating: 4.8,
    reviews: 256,
    vehicleType: "Cargo Van",
    location: "San Diego, CA",
    verified: true,
    insurance: "Basic Coverage ($500K)",
    minimumHours: "3 hours",
    crewSize: "1-2 movers",
    equipment: "Dollies, blankets",
    availabilityNote: "Next-day available",
    cancellationPolicy: "Free up to 48hrs",
    experience: "5+ years",
  },
  {
    id: "city",
    name: "City Haulers",
    price: 95,
    rating: 4.7,
    reviews: 189,
    vehicleType: "Moving Truck",
    location: "San Francisco, CA",
    verified: true,
    insurance: "Full Coverage ($1M)",
    minimumHours: "2 hours",
    crewSize: "3-4 movers",
    equipment: "Dollies, blankets, straps, tools",
    availabilityNote: "2 days ahead",
    cancellationPolicy: "Free up to 24hrs",
    experience: "8+ years",
  },
  {
    id: "quick",
    name: "Quick Move Services",
    price: 65,
    rating: 4.6,
    reviews: 145,
    vehicleType: "Pickup Truck",
    location: "Los Angeles, CA",
    verified: true,
    insurance: "Basic Coverage ($250K)",
    minimumHours: "2 hours",
    crewSize: "1-2 movers",
    equipment: "Blankets",
    availabilityNote: "Same-day available",
    cancellationPolicy: "Free up to 12hrs",
    experience: "3+ years",
  },
  {
    id: "elite",
    name: "Elite Moving Solutions",
    price: 120,
    rating: 4.9,
    reviews: 412,
    vehicleType: "Box Truck",
    location: "San Francisco, CA",
    verified: true,
    insurance: "Full Coverage ($2M)",
    minimumHours: "4 hours",
    crewSize: "4-6 movers",
    equipment: "Full kit + specialty tools",
    availabilityNote: "Limited schedule",
    cancellationPolicy: "Free up to 48hrs",
    experience: "12+ years",
  },
  {
    id: "budget",
    name: "Budget Movers",
    price: 55,
    rating: 4.5,
    reviews: 98,
    vehicleType: "Cargo Van",
    location: "San Diego, CA",
    verified: false,
    insurance: "Basic Coverage ($250K)",
    minimumHours: "2 hours",
    crewSize: "1-2 movers",
    equipment: "Dollies",
    availabilityNote: "Next-day available",
    cancellationPolicy: "Free up to 24hrs",
    experience: "2+ years",
  },
];

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function CompareListingsPage() {
  const navigate = useNavigate();
  const query = useQuery();

  const idsParam = query.get("ids") || "";
  const ids = idsParam
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const selected = useMemo(() => {
    return ids.map((id) => VENDORS.find((v) => v.id === id)).filter(Boolean);
  }, [ids]);

  const metrics = [
    { key: "price", label: "Price per Hour", format: (v) => `$${v}` },
    { key: "rating", label: "Rating", format: (v) => `${v} ⭐` },
    { key: "reviews", label: "Total Reviews" },
    { key: "vehicleType", label: "Vehicle Type" },
    { key: "location", label: "Location" },
    { key: "insurance", label: "Insurance" },
    { key: "minimumHours", label: "Minimum Hours" },
    { key: "crewSize", label: "Crew Size" },
    { key: "equipment", label: "Equipment" },
    { key: "availabilityNote", label: "Availability" },
    { key: "cancellationPolicy", label: "Cancellation Policy" },
    { key: "experience", label: "Experience" },
  ];

  const bestForKey = (key) => {
    if (selected.length < 2) return null;

    if (key === "price") {
      const min = Math.min(...selected.map((v) => v.price));
      return selected.find((v) => v.price === min)?.id;
    }
    if (key === "rating") {
      const max = Math.max(...selected.map((v) => v.rating));
      return selected.find((v) => v.rating === max)?.id;
    }
    return null;
  };

  const viewDetails = (id) => navigate(`/vendor/${id}`);

  
  const bookNow = (id) => navigate(`/book/${id}`);

  return (
    <div className="comparePage">
      <Navbar />

      <div className="compareWrap">
        <div className="compareHead">
          <h1>Compare Listings</h1>
          <p>Side-by-side comparison of {selected.length} services</p>
        </div>

        {selected.length < 2 ? (
          <div className="compareEmpty">
            Please select at least 2 services to compare.
            <button
              className="backBtn"
              type="button"
              onClick={() => navigate("/listings")}
            >
              Back to Browse
            </button>
          </div>
        ) : (
          <>
            <div className="table">
              {/* Header row */}
              <div className="row rowHeader">
                <div className="cell leftBlank" />

                {selected.map((v) => (
                  <div key={v.id} className="cell headerCard">
                    <div className="headerImg">🚚</div>
                    <div className="headerName">{v.name}</div>
                    {v.verified && (
                      <div className="headerVerified">✅ Verified</div>
                    )}

                    <button
                      className="headerBtn"
                      type="button"
                      onClick={() => viewDetails(v.id)}
                    >
                      View Details
                    </button>

                    <button
                      className="headerBtnGhost"
                      type="button"
                      onClick={() => bookNow(v.id)}
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>

              {/* Metric rows */}
              {metrics.map((m) => {
                const bestId = bestForKey(m.key);
                return (
                  <div key={m.key} className="row">
                    <div className="cell labelCell">{m.label}</div>

                    {selected.map((v) => (
                      <div
                        key={v.id}
                        className={`cell valueCell ${
                          bestId === v.id ? "bestCell" : ""
                        }`}
                      >
                        <div className="valueLine">
                          {m.format ? m.format(v[m.key]) : v[m.key]}
                          {bestId === v.id && (
                            <span className="bestBadge">Best</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="compareBottom">
              <button
                className="backBtn"
                type="button"
                onClick={() => navigate("/listings")}
              >
                Back to Browse
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
