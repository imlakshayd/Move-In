import React, { useMemo, useState } from "react";
import "./CustomerDashboard.css";
import DashboardTopbar from "../components/DashboardTopbar";

const MOCK_BOOKINGS = [
  {
    id: "BK-2024-001",
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
  { id: "V-1", name: "Swift Movers LLC", rating: 4.9, reviews: 342, price: 89 },
  { id: "V-2", name: "Pro Transport Co.", rating: 4.8, reviews: 256, price: 75 },
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
  // Use fullName if you have it, fallback to username
  const username =
    localStorage.getItem("fullName") ||
    localStorage.getItem("username") ||
    "customer";

  const [activeTab, setActiveTab] = useState("bookings"); // bookings | vendors | reviews

  // Topbar search (global)
  const [topSearch, setTopSearch] = useState("");

  // Bookings filters
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

  // Use topSearch for filtering bookings (so the top bar actually works)
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

  // Actions
  const onViewDetails = (booking) => {
    alert(`View Details: ${booking.id} (${booking.vendorName})`);
  };

  const onMessageVendor = (booking) => {
    alert(`Message vendor: ${booking.vendorName}`);
  };

  const onCancelBooking = (booking) => {
    if (booking.status === "Completed" || booking.status === "Cancelled") return;

    const ok = window.confirm(`Cancel booking ${booking.id}?`);
    if (!ok) return;

    setBookings((prev) =>
      prev.map((b) =>
        b.id === booking.id ? { ...b, status: "Cancelled" } : b
      )
    );
  };

  const onVendorView = (vendor) => alert(`View vendor: ${vendor.name}`);
  const onVendorBook = (vendor) => alert(`Book vendor: ${vendor.name}`);
  const onUnsaveVendor = (vendorId) => {
    setSavedVendors((prev) => prev.filter((v) => v.id !== vendorId));
  };

  return (
    <>
      {/* ✅ Top bar like your screenshot */}
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
          >
            My Bookings
          </button>
          <button
            className={`tab ${activeTab === "vendors" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("vendors")}
          >
            Saved Vendors
          </button>
          <button
            className={`tab ${activeTab === "reviews" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            My Reviews
          </button>
        </div>

        {/* BOOKINGS TAB */}
        {activeTab === "bookings" && (
          <>
            {/* Keep Status filter (top search is in header now) */}
            <div className="filters">
              <div className="searchbox">
                {/* Optional: show what you typed in top search */}
                <input
                  value={topSearch}
                  onChange={(e) => setTopSearch(e.target.value)}
                  placeholder="Search bookings..."
                />
              </div>

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

            <div className="list">
              {filteredBookings.map((b) => (
                <div key={b.id} className="card booking-card">
                  <div className="card-left">
                    <div className="row">
                      <div className="vendor">{b.vendorName}</div>
                      <StatusPill status={b.status} />
                    </div>

                    <div className="sub">Booking ID: {b.id}</div>

                    <div className="grid">
                      <div className="kv">
                        <div className="k">Date</div>
                        <div className="v">{b.date}</div>
                      </div>
                      <div className="kv">
                        <div className="k">Time</div>
                        <div className="v">{b.time}</div>
                      </div>
                      <div className="kv">
                        <div className="k">Pickup</div>
                        <div className="v">{b.pickup}</div>
                      </div>
                      <div className="kv">
                        <div className="k">Dropoff</div>
                        <div className="v">{b.dropoff}</div>
                      </div>
                    </div>

                    <div className="total">
                      Total: <span className="money">{money(b.total)}</span>
                    </div>
                  </div>

                  <div className="card-right">
                    <button className="btn" onClick={() => onViewDetails(b)}>
                      View Details
                    </button>
                    <button className="btn" onClick={() => onMessageVendor(b)}>
                      Message
                    </button>
                    <button
                      className={`btn btn-danger ${
                        b.status === "Completed" || b.status === "Cancelled"
                          ? "btn-disabled"
                          : ""
                      }`}
                      onClick={() => onCancelBooking(b)}
                      disabled={
                        b.status === "Completed" || b.status === "Cancelled"
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}

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
                  <button className="btn" onClick={() => onVendorView(v)}>
                    View
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => onVendorBook(v)}
                  >
                    Book
                  </button>
                  <button
                    className="btn btn-ghost"
                    onClick={() => onUnsaveVendor(v.id)}
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
