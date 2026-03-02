import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerDashboard.css";
import DashboardTopbar from "../components/DashboardTopbar";

const MOCK_BOOKINGS = [
  {
    id: "BK-2024-001",
    vendorId: "swift",
    vendorName: "Swift Movers LLC",
    status: "Confirmed",
    date: "November 25, 2024",
    time: "9:00 AM - 12:00 PM",
    pickup: "123 Main St, Los Angeles, CA",
    dropoff: "456 Oak Ave, Los Angeles, CA",
    total: 312.45,
  },
  {
    id: "BK-2024-002",
    vendorId: "city",
    vendorName: "City Haulers",
    status: "In Progress",
    date: "November 28, 2024",
    time: "2:00 PM - 5:00 PM",
    pickup: "789 Pine St, San Francisco, CA",
    dropoff: "321 Elm Dr, San Francisco, CA",
    total: 410.25,
  },
  {
    id: "BK-2024-003",
    vendorId: "pro",
    vendorName: "Pro Transport Co.",
    status: "Completed",
    date: "October 15, 2024",
    time: "10:00 AM - 1:00 PM",
    pickup: "555 Beach Rd, San Diego, CA",
    dropoff: "888 Hill St, San Diego, CA",
    total: 275.5,
  },
];

const MOCK_SAVED_VENDORS = [
  { id: "swift", name: "Swift Movers LLC", rating: 4.9, reviews: 342, price: 89 },
  { id: "pro", name: "Pro Transport Co.", rating: 4.8, reviews: 256, price: 75 },
];

const MOCK_REVIEWS = [
  {
    id: "R-1",
    vendorName: "Pro Transport Co.",
    stars: 5,
    month: "October 2024",
    text: "Excellent service! The team was professional, on time, and handled everything with care. Highly recommend!",
  },
];

function money(n) {
  return `$${Number(n).toFixed(2)}`;
}

function StatusPill({ status }) {
  const cls =
    status === "Confirmed"
      ? "pill pill-confirmed"
      : status === "In Progress"
      ? "pill pill-progress"
      : status === "Completed"
      ? "pill pill-completed"
      : "pill pill-cancelled";

  return <span className={cls}>{status}</span>;
}

export default function CustomerDashboardPage() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("fullName") ||
    localStorage.getItem("username") ||
    "customer";

  const [activeTab, setActiveTab] = useState("bookings"); 
  const [topSearch, setTopSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [savedVendors, setSavedVendors] = useState(MOCK_SAVED_VENDORS);
  const [reviews] = useState(MOCK_REVIEWS);

  const stats = useMemo(() => {
    const upcoming = bookings.filter(
      (b) => b.status === "Confirmed" || b.status === "In Progress"
    ).length;
    const completed = bookings.filter((b) => b.status === "Completed").length;
    const vendors = savedVendors.length;
    return { upcoming, completed, vendors };
  }, [bookings, savedVendors]);

  const filteredBookings = useMemo(() => {
    const s = topSearch.trim().toLowerCase();

    return bookings.filter((b) => {
      const matchSearch =
        !s ||
        b.vendorName.toLowerCase().includes(s) ||
        b.id.toLowerCase().includes(s) ||
        b.pickup.toLowerCase().includes(s) ||
        b.dropoff.toLowerCase().includes(s);

      const matchStatus =
        statusFilter === "All Status" || b.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [bookings, topSearch, statusFilter]);

  
  const onViewDetails = (booking) => {
    if (!booking.vendorId) return;
    navigate(`/vendor/${booking.vendorId}`);
  };

  const onMessageVendor = (booking) => {
    // change later to your real messages route
    navigate(`/customer?tab=messages&bookingId=${encodeURIComponent(booking.id)}`);
  };

  const onCancelBooking = (booking) => {
    if (booking.status === "Completed" || booking.status === "Cancelled") return;

    const ok = window.confirm(`Cancel booking ${booking.id}?`);
    if (!ok) return;

    setBookings((prev) =>
      prev.map((b) => (b.id === booking.id ? { ...b, status: "Cancelled" } : b))
    );
  };

  const onVendorView = (vendor) => navigate(`/vendor/${vendor.id}`);
  const onVendorBook = (vendor) => navigate(`/book/${vendor.id}`);
  const onUnsaveVendor = (vendorId) =>
    setSavedVendors((prev) => prev.filter((v) => v.id !== vendorId));

  return (
    <>
      <DashboardTopbar searchValue={topSearch} onSearchChange={setTopSearch} />

      <div className="cust-page">
        <div className="cust-header">
          <h1>Welcome back, {username}!</h1>
          <p className="muted">Manage your bookings and track your moves</p>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-title">Upcoming Bookings</div>
            <div className="stat-value">{stats.upcoming}</div>
          </div>

          <div className="stat-card">
            <div className="stat-title">Completed Moves</div>
            <div className="stat-value">{stats.completed}</div>
          </div>

          <div className="stat-card">
            <div className="stat-title">Saved Vendors</div>
            <div className="stat-value">{stats.vendors}</div>
          </div>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === "bookings" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("bookings")}
            type="button"
          >
            My Bookings
          </button>
          <button
            className={`tab ${activeTab === "vendors" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("vendors")}
            type="button"
          >
            Saved Vendors
          </button>
          <button
            className={`tab ${activeTab === "reviews" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("reviews")}
            type="button"
          >
            My Reviews
          </button>
        </div>

        {/* BOOKINGS TAB */}
        {activeTab === "bookings" && (
          <>
           
            <div className="booking-toolbar">
              <div className="booking-search">
                <span className="bk-icon" aria-hidden="true">🔍</span>
                <input
                  value={topSearch}
                  onChange={(e) => setTopSearch(e.target.value)}
                  placeholder="Search bookings..."
                />
              </div>

              <div className="booking-status">
                <span className="bk-icon" aria-hidden="true">⚲</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All Status</option>
                  <option>Confirmed</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>

            <div className="list">
              {filteredBookings.map((b) => {
                const cancelDisabled =
                  b.status === "Completed" || b.status === "Cancelled";

                return (
                  <div key={b.id} className="booking-card-sample">
                    <div className="bk-left">
                      <div className="bk-head">
                        <div className="bk-vendor">{b.vendorName}</div>
                        <StatusPill status={b.status} />
                      </div>

                      <div className="bk-sub">Booking ID: {b.id}</div>

                      <div className="bk-info">
                        <div className="bk-item">
                          <span className="bk-i" aria-hidden="true">📅</span>
                          <span>{b.date}</span>
                        </div>

                        <div className="bk-item">
                          <span className="bk-i" aria-hidden="true">🕒</span>
                          <span>{b.time}</span>
                        </div>

                        <div className="bk-item">
                          <span className="bk-i" aria-hidden="true">📍</span>
                          <span>{b.pickup}</span>
                        </div>

                        <div className="bk-item">
                          <span className="bk-i" aria-hidden="true">📍</span>
                          <span>{b.dropoff}</span>
                        </div>
                      </div>

                      <div className="bk-total">
                        Total: <span className="bk-money">{money(b.total)}</span>
                      </div>
                    </div>

                    <div className="bk-actions">
                      <button
                        className="bk-btn"
                        onClick={() => onViewDetails(b)}
                        type="button"
                      >
                        View Details
                      </button>
                      <button
                        className="bk-btn"
                        onClick={() => onMessageVendor(b)}
                        type="button"
                      >
                        Message
                      </button>
                      <button
                        className={`bk-btn bk-btn-danger ${
                          cancelDisabled ? "bk-btn-disabled" : ""
                        }`}
                        onClick={() => onCancelBooking(b)}
                        disabled={cancelDisabled}
                        type="button"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredBookings.length === 0 && (
                <div className="empty">No bookings found.</div>
              )}
            </div>
          </>
        )}

        {/* SAVED VENDORS TAB */}
        {activeTab === "vendors" && (
          <div className="list">
            {savedVendors.map((v) => (
              <div key={v.id} className="card vendor-card">
                <div className="vendor-left">
                  <div className="vendor-name">{v.name}</div>
                  <div className="vendor-meta">
                    ⭐ {v.rating} • {v.reviews} reviews •{" "}
                    <span className="money">${v.price}/hr</span>
                  </div>
                </div>

                <div className="vendor-actions">
                  <button className="btn" onClick={() => onVendorView(v)} type="button">
                    View
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => onVendorBook(v)}
                    type="button"
                  >
                    Book
                  </button>
                  <button
                    className="btn btn-ghost"
                    onClick={() => onUnsaveVendor(v.id)}
                    type="button"
                  >
                    Unsave
                  </button>
                </div>
              </div>
            ))}

            {savedVendors.length === 0 && (
              <div className="empty">No saved vendors yet.</div>
            )}
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === "reviews" && (
          <div className="list">
            {reviews.map((r) => (
              <div key={r.id} className="card review-card">
                <div className="review-top">
                  <div>
                    <div className="vendor">{r.vendorName}</div>
                    <div className="stars">
                      {"★".repeat(r.stars)}
                      {"☆".repeat(5 - r.stars)}
                    </div>
                  </div>
                  <div className="muted">{r.month}</div>
                </div>
                <div className="review-text">{r.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
