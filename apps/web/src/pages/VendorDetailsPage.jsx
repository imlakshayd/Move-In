// apps/web/src/pages/VendorDetailsPage.jsx
import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./VendorDetailsPage.css";

const VENDORS = {
  swift: {
    id: "swift",
    name: "Swift Movers LLC",
    price: 89,
    rating: 4.9,
    reviewsCount: 342,
    location: "Los Angeles, CA",
    type: "Truck",
    verified: true,
    about:
      "Professional moving services with over 10 years of experience. We specialize in residential and commercial moves, providing careful handling of your belongings with full insurance coverage.",
    highlights: [
      "Fully insured and bonded",
      "Verified owner",
      "Secure cancellation",
      "Real-time availability",
    ],
    specs: {
      "Vehicle Capacity": "16 ft box truck",
      "Max Load": "3,500 lbs",
      "Crew Size": "2-3 movers",
      "Service Area": "50 mile radius",
      "Minimum Booking": "2 hours",
    },
  },
  pro: {
    id: "pro",
    name: "Pro Transport Co.",
    price: 75,
    rating: 4.8,
    reviewsCount: 256,
    location: "San Diego, CA",
    type: "Cargo Van",
    verified: true,
    about:
      "Reliable transport services for small moves, deliveries, and furniture pickup. Fast scheduling and flexible hours.",
    highlights: ["Verified owner", "Fast scheduling", "Great value"],
    specs: {
      "Vehicle Capacity": "Cargo van",
      "Max Load": "2,000 lbs",
      "Crew Size": "1-2 movers",
      "Service Area": "40 mile radius",
      "Minimum Booking": "2 hours",
    },
  },
  city: {
    id: "city",
    name: "City Haulers",
    price: 95,
    rating: 4.7,
    reviewsCount: 189,
    location: "San Francisco, CA",
    type: "Moving Truck",
    verified: true,
    about:
      "Trusted moving truck services with experienced crew and careful packing. Perfect for apartment and condo moves.",
    highlights: ["Verified & insured", "Professional crew", "Careful packing"],
    specs: {
      "Vehicle Capacity": "18 ft truck",
      "Max Load": "4,000 lbs",
      "Crew Size": "2-4 movers",
      "Service Area": "60 mile radius",
      "Minimum Booking": "3 hours",
    },
  },
};

const MOCK_REVIEWS = [
  {
    id: "rv1",
    name: "Sarah Martinez",
    month: "October 2024",
    stars: 5,
    text:
      "Excellent service! The team was professional, on time, and handled everything with care. Highly recommend!",
    verified: true,
  },
  {
    id: "rv2",
    name: "Mike Johnson",
    month: "September 2024",
    stars: 5,
    text:
      "Best moving experience I’ve ever had. They were efficient and nothing was damaged. Will use again!",
    verified: true,
  },
  {
    id: "rv3",
    name: "Emily Chen",
    month: "September 2024",
    stars: 4,
    text:
      "Great service overall. Very careful with fragile items. Only minor delay due to traffic.",
    verified: true,
  },
];

export default function VendorDetailsPage() {
  const navigate = useNavigate();
  const { vendorId } = useParams();

  const vendor = VENDORS[vendorId];
  const [hours, setHours] = useState(2);

  const priceBreakdown = useMemo(() => {
    if (!vendor) return null;
    const base = vendor.price * hours;
    const serviceFee = Math.round(base * 0.1 * 100) / 100; // 10%
    const tax = Math.round((base + serviceFee) * 0.13 * 100) / 100; // 13%
    const total = Math.round((base + serviceFee + tax) * 100) / 100;
    return { base, serviceFee, tax, total };
  }, [vendor, hours]);

  if (!vendor) {
    return (
      <>
        <Navbar />
        <div style={{ padding: 24 }}>Vendor not found.</div>
        <Footer />
      </>
    );
  }

  // ✅ NEW: Book This Vendor goes to your booking page
  const onBook = () => {
    // if you want to pass hours too:
    // navigate(`/book/${vendor.id}?hours=${hours}`);
    navigate(`/book/${vendor.id}`);
  };

  // ✅ Optional: make "More from this Vendor" clickable
  const onGoVendor = (id) => navigate(`/vendor/${id}`);

  return (
    <div className="vd-page">
      <Navbar />

      <div className="vd-container">
        {/* Left main */}
        <div className="vd-left">
          <div className="vd-heroCard">
            <div className="vd-heroImage" aria-hidden="true">
              🚚
            </div>

            <div className="vd-heroInfo">
              <div className="vd-titleRow">
                <h1 className="vd-title">{vendor.name}</h1>
                {vendor.verified && <span className="vd-pill">Verified</span>}
              </div>

              <div className="vd-subRow">
                <span className="vd-star">★</span>
                <span className="vd-rating">{vendor.rating}</span>
                <span className="vd-muted">({vendor.reviewsCount})</span>
                <span className="vd-dot">•</span>
                <span className="vd-muted">
                  {vendor.type} • {vendor.location}
                </span>
              </div>

              <div className="vd-aboutTitle">About This Service</div>
              <p className="vd-aboutText">{vendor.about}</p>

              <div className="vd-highlights">
                {vendor.highlights.map((h) => (
                  <div key={h} className="vd-highlight">
                    ✓ {h}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="vd-sectionCard">
            <div className="vd-sectionTitle">Specifications</div>
            <div className="vd-specGrid">
              {Object.entries(vendor.specs).map(([k, v]) => (
                <div key={k} className="vd-specRow">
                  <div className="vd-specKey">{k}</div>
                  <div className="vd-specVal">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="vd-sectionCard">
            <div className="vd-sectionTitle">Reviews</div>

            <div className="vd-reviewSummary">
              <div className="vd-reviewScore">
                <div className="vd-reviewScoreBig">{vendor.rating}</div>
                <div className="vd-starsText">★★★★★</div>
              </div>

              <div className="vd-bars">
                <BarRow label="5 stars" pct={72} />
                <BarRow label="4 stars" pct={18} />
                <BarRow label="3 stars" pct={7} />
                <BarRow label="2 stars" pct={2} />
                <BarRow label="1 star" pct={1} />
              </div>
            </div>

            <div className="vd-reviewList">
              {MOCK_REVIEWS.map((r) => (
                <div className="vd-reviewItem" key={r.id}>
                  <div className="vd-avatar">{r.name[0]}</div>
                  <div className="vd-reviewBody">
                    <div className="vd-reviewTop">
                      <div className="vd-reviewName">
                        {r.name}{" "}
                        {r.verified && (
                          <span className="vd-miniPill">Verified</span>
                        )}
                      </div>
                      <div className="vd-muted">{r.month}</div>
                    </div>
                    <div className="vd-starsSmall">
                      {"★".repeat(r.stars)}
                      {"☆".repeat(5 - r.stars)}
                    </div>
                    <div className="vd-reviewText">{r.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="vd-moreBtn" type="button">
              Show All Reviews
            </button>
          </div>
        </div>

        {/* Right side booking box */}
        <div className="vd-right">
          <div className="vd-bookCard">
            <div className="vd-priceTop">
              <div className="vd-price">{`$${vendor.price}`}</div>
              <div className="vd-muted">per hour</div>
            </div>

            <label className="vd-label">Hours</label>
            <select
              className="vd-select"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
            >
              <option value={2}>2 hours</option>
              <option value={3}>3 hours</option>
              <option value={4}>4 hours</option>
              <option value={5}>5 hours</option>
            </select>

            <div className="vd-breakdown">
              <Row label="Base" value={`$${priceBreakdown.base.toFixed(2)}`} />
              <Row
                label="Service fee"
                value={`$${priceBreakdown.serviceFee.toFixed(2)}`}
              />
              <Row label="Tax" value={`$${priceBreakdown.tax.toFixed(2)}`} />
              <div className="vd-divider" />
              <Row
                strong
                label="Total"
                value={`$${priceBreakdown.total.toFixed(2)}`}
              />
            </div>

            <button className="vd-primaryBtn" type="button" onClick={onBook}>
              Book This Vendor
            </button>

            <div className="vd-note">
              You won’t be charged until booking is confirmed.
            </div>
          </div>

          <div className="vd-sideCard">
            <div className="vd-sectionTitle">More from this Vendor</div>
            <div className="vd-miniList">
              <button
                type="button"
                className="vd-miniBtn"
                onClick={() => onGoVendor("pro")}
              >
                <MiniVendor title="Pro Transport Co." price="$75/hr" rating="4.8" />
              </button>

              <button
                type="button"
                className="vd-miniBtn"
                onClick={() => onGoVendor("city")}
              >
                <MiniVendor title="City Haulers" price="$95/hr" rating="4.7" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Row({ label, value, strong }) {
  return (
    <div className={`vd-row ${strong ? "vd-rowStrong" : ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function BarRow({ label, pct }) {
  return (
    <div className="vd-barRow">
      <span className="vd-barLabel">{label}</span>
      <div className="vd-bar">
        <div className="vd-barFill" style={{ width: `${pct}%` }} />
      </div>
      <span className="vd-barPct">{pct}%</span>
    </div>
  );
}

function MiniVendor({ title, price, rating }) {
  return (
    <div className="vd-miniVendor">
      <div className="vd-miniIcon" aria-hidden="true">
        🚚
      </div>
      <div className="vd-miniBody">
        <div className="vd-miniTitle">{title}</div>
        <div className="vd-miniMeta">
          <span className="vd-star">★</span> {rating}{" "}
          <span className="vd-dot">•</span> {price}
        </div>
      </div>
    </div>
  );
}
