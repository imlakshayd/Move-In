import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListYourTruckPage.css";
import DashboardTopbar from "../components/DashboardTopbar";

const INITIAL_LISTINGS = [
  {
    id: "L-001",
    title: "16ft Box Truck - Professional Moving",
    type: "Box Truck",
    price: 89,
    minHours: 2,
    description: "Reliable moving truck for home and apartment moves.",
    location: "Los Angeles, CA",
    status: "Active",
    verified: true,
    views: 542,
    bookings: 23,
    rating: 4.9,
    availability: "Available",
  },
  {
    id: "L-002",
    title: "Cargo Van - Quick Moves",
    type: "Cargo Van",
    price: 65,
    minHours: 2,
    description: "Perfect for smaller moves and local deliveries.",
    location: "Los Angeles, CA",
    status: "Active",
    verified: true,
    views: 389,
    bookings: 15,
    rating: 4.8,
    availability: "Available",
  },
  {
    id: "L-003",
    title: "Large Moving Truck - Heavy Duty",
    type: "Moving Truck",
    price: 120,
    minHours: 4,
    description: "Heavy-duty truck for large family moves.",
    location: "Los Angeles, CA",
    status: "Pending",
    verified: false,
    views: 0,
    bookings: 0,
    rating: null,
    availability: "Unavailable",
  },
];

const INITIAL_BOOKINGS = [
  {
    id: "BK-2024-045",
    customer: "Maya Hayes",
    customerId: "maya-hayes",
    date: "November 25, 2024",
    time: "9:00 AM",
    listing: "16ft Box Truck",
    amount: 312.45,
    status: "Approved",
  },
  {
    id: "BK-2024-046",
    customer: "Sarah Johnson",
    customerId: "sarah-johnson",
    date: "November 28, 2024",
    time: "2:00 PM",
    listing: "Cargo Van",
    amount: 275.0,
    status: "Pending",
  },
  {
    id: "BK-2024-044",
    customer: "Mike Chen",
    customerId: "mike-chen",
    date: "November 15, 2024",
    time: "10:00 AM",
    listing: "16ft Box Truck",
    amount: 410.25,
    status: "Completed",
  },
];

const INITIAL_PAYMENTS = [
  {
    id: "TXN-2024-156",
    date: "November 15, 2024",
    description: "Payout for October 2024",
    amount: 4250.0,
    status: "Completed",
  },
  {
    id: "TXN-2024-157",
    date: "November 20, 2024",
    description: "Booking BK-2024-044",
    amount: 410.25,
    status: "Pending",
  },
];

const INITIAL_REVIEWS = [
  {
    id: "R-001",
    customer: "Sarah Martinez",
    stars: 5,
    month: "October 2024",
    text: "Excellent service! Very professional and careful with my belongings.",
  },
  {
    id: "R-002",
    customer: "Mike Johnson",
    stars: 5,
    month: "September 2024",
    text: "Best moving experience I've ever had. Will definitely use again!",
  },
];

const EMPTY_FORM = {
  title: "",
  type: "",
  price: "",
  minHours: "",
  description: "",
  location: "",
  documents: null,
};

function money(value) {
  return `$${Number(value).toFixed(2)}`;
}

function ratingText(value) {
  if (value === null || value === undefined) return "N/A";
  return value.toFixed(1);
}

function ListingStatusPill({ status }) {
  const className =
    status === "Active"
      ? "vendor-pill vendor-pill-active"
      : status === "Pending"
      ? "vendor-pill vendor-pill-pending"
      : "vendor-pill";

  return <span className={className}>{status}</span>;
}

function BookingStatusPill({ status }) {
  const className =
    status === "Approved"
      ? "vendor-pill vendor-pill-approved"
      : status === "Pending"
      ? "vendor-pill vendor-pill-pending"
      : status === "Completed"
      ? "vendor-pill vendor-pill-completed"
      : "vendor-pill";

  return <span className={className}>{status}</span>;
}

function PaymentStatusPill({ status }) {
  const className =
    status === "Completed"
      ? "vendor-pill vendor-pill-completed"
      : "vendor-pill vendor-pill-pending";

  return <span className={className}>{status}</span>;
}

export default function ListYourTruckPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("listings");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [payments] = useState(INITIAL_PAYMENTS);
  const [reviews] = useState(INITIAL_REVIEWS);

  const [form, setForm] = useState(EMPTY_FORM);

  const filteredListings = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return listings;

    return listings.filter((item) => {
      return (
        item.title.toLowerCase().includes(s) ||
        item.type.toLowerCase().includes(s) ||
        item.location.toLowerCase().includes(s)
      );
    });
  }, [listings, search]);

  const stats = useMemo(() => {
    const totalEarnings = payments.reduce((sum, p) => sum + Number(p.amount), 0);
    const pendingPayouts = payments
      .filter((p) => p.status === "Pending")
      .reduce((sum, p) => sum + Number(p.amount), 0);

    const completedBookings = bookings.filter(
      (b) => b.status === "Completed" || b.status === "Approved"
    ).length;

    const ratedListings = listings.filter((l) => typeof l.rating === "number");
    const avgRating =
      ratedListings.length > 0
        ? ratedListings.reduce((sum, l) => sum + l.rating, 0) / ratedListings.length
        : 0;

    return {
      totalEarnings,
      pendingPayouts,
      completedBookings,
      avgRating,
    };
  }, [payments, bookings, listings]);

  const totalReviews = reviews.length + 122;

  const openCreateModal = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEditModal = (listing) => {
    setEditingId(listing.id);
    setForm({
      title: listing.title,
      type: listing.type,
      price: String(listing.price),
      minHours: String(listing.minHours),
      description: listing.description,
      location: listing.location,
      documents: null,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateOrUpdate = (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.type.trim() ||
      !form.price ||
      !form.minHours ||
      !form.description.trim() ||
      !form.location.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (editingId) {
      setListings((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                title: form.title,
                type: form.type,
                price: Number(form.price),
                minHours: Number(form.minHours),
                description: form.description,
                location: form.location,
              }
            : item
        )
      );
    } else {
      const newListing = {
        id: `L-${Date.now()}`,
        title: form.title,
        type: form.type,
        price: Number(form.price),
        minHours: Number(form.minHours),
        description: form.description,
        location: form.location,
        status: "Pending",
        verified: false,
        views: 0,
        bookings: 0,
        rating: null,
        availability: "Available",
      };

      setListings((prev) => [newListing, ...prev]);
    }

    closeModal();
  };

  const handleDeleteListing = (listingId) => {
    const ok = window.confirm("Delete this listing?");
    if (!ok) return;
    setListings((prev) => prev.filter((item) => item.id !== listingId));
  };

  const handleViewListing = (listing) => {
    alert(`Viewing listing: ${listing.title}`);
  };

  const handleApproveBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "Approved" } : b))
    );
  };

  const handleDeclineBooking = (bookingId) => {
    const ok = window.confirm("Decline this booking request?");
    if (!ok) return;

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "Declined" } : b))
    );
  };

  const handleMessageCustomer = (booking) => {
    navigate("/vendor/messages", {
      state: {
        selectedCustomer: {
          customerId: booking.customerId || booking.id,
          customerName: booking.customer,
          bookingId: booking.id,
          listing: booking.listing,
        },
      },
    });
  };

  return (
    <>
      <DashboardTopbar
        searchValue={search}
        onSearchChange={setSearch}
      />

      <div className="vendor-page">
        <div className="vendor-header-row">
          <div>
            <h1>Vendor Dashboard</h1>
            <p>Manage your listings and bookings</p>
          </div>

          <button
            className="vendor-add-btn"
            type="button"
            onClick={openCreateModal}
          >
            + Add New Listing
          </button>
        </div>

        <div className="vendor-stats-grid">
          <div className="vendor-stat-card">
            <div className="vendor-stat-label">Total Earnings</div>
            <div className="vendor-stat-value">{money(stats.totalEarnings)}</div>
            <div className="vendor-stat-icon vendor-stat-icon-green">💵</div>
          </div>

          <div className="vendor-stat-card">
            <div className="vendor-stat-label">Pending Payouts</div>
            <div className="vendor-stat-value">{money(stats.pendingPayouts)}</div>
            <div className="vendor-stat-icon vendor-stat-icon-yellow">📈</div>
          </div>

          <div className="vendor-stat-card">
            <div className="vendor-stat-label">Completed Bookings</div>
            <div className="vendor-stat-value">{stats.completedBookings}</div>
            <div className="vendor-stat-icon vendor-stat-icon-blue">✅</div>
          </div>

          <div className="vendor-stat-card">
            <div className="vendor-stat-label">Average Rating</div>
            <div className="vendor-stat-value">
              {stats.avgRating.toFixed(1)} <span className="star">⭐</span>
            </div>
            <div className="vendor-stat-icon vendor-stat-icon-purple">✩</div>
          </div>
        </div>

        <div className="vendor-tabs">
          <button
            className={`vendor-tab ${activeTab === "listings" ? "vendor-tab-active" : ""}`}
            onClick={() => setActiveTab("listings")}
            type="button"
          >
            My Listings
          </button>

          <button
            className={`vendor-tab ${activeTab === "bookings" ? "vendor-tab-active" : ""}`}
            onClick={() => setActiveTab("bookings")}
            type="button"
          >
            Bookings
          </button>

          <button
            className={`vendor-tab ${activeTab === "payments" ? "vendor-tab-active" : ""}`}
            onClick={() => setActiveTab("payments")}
            type="button"
          >
            Payments
          </button>

          <button
            className={`vendor-tab ${activeTab === "reviews" ? "vendor-tab-active" : ""}`}
            onClick={() => setActiveTab("reviews")}
            type="button"
          >
            Reviews
          </button>
        </div>

        {activeTab === "listings" && (
          <div className="vendor-section">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="vendor-listing-card">
                <div className="vendor-listing-main">
                  <div className="vendor-listing-title">{listing.title}</div>

                  <div className="vendor-listing-badges">
                    <ListingStatusPill status={listing.status} />
                    {listing.verified && (
                      <span className="vendor-pill vendor-pill-verified">
                        ✓ Verified
                      </span>
                    )}
                  </div>

                  <div className="vendor-listing-meta-grid">
                    <div>
                      <div className="vendor-meta-label">Views</div>
                      <div className="vendor-meta-value">👁 {listing.views}</div>
                    </div>

                    <div>
                      <div className="vendor-meta-label">Bookings</div>
                      <div className="vendor-meta-value">{listing.bookings}</div>
                    </div>

                    <div>
                      <div className="vendor-meta-label">Rating</div>
                      <div className="vendor-meta-value">
                        ⭐ {ratingText(listing.rating)}
                      </div>
                    </div>

                    <div>
                      <div className="vendor-meta-label">Availability</div>
                      <div className="vendor-meta-value">{listing.availability}</div>
                    </div>
                  </div>
                </div>

                <div className="vendor-listing-side">
                  <div className="vendor-price">
                    ${listing.price}
                    <span>/hour</span>
                  </div>

                  <button
                    className="vendor-side-btn"
                    type="button"
                    onClick={() => openEditModal(listing)}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="vendor-side-btn"
                    type="button"
                    onClick={() => handleViewListing(listing)}
                  >
                    View
                  </button>

                  <button
                    className="vendor-side-btn vendor-side-btn-danger"
                    type="button"
                    onClick={() => handleDeleteListing(listing.id)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}

            {filteredListings.length === 0 && (
              <div className="vendor-empty">No listings found.</div>
            )}
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="vendor-card-block">
            <div className="vendor-block-title">Booking Requests</div>

            <div className="vendor-table-wrap">
              <table className="vendor-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Date & Time</th>
                    <th>Listing</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.customer}</td>
                      <td>
                        {booking.date}
                        <br />
                        {booking.time}
                      </td>
                      <td>{booking.listing}</td>
                      <td className="vendor-money">{money(booking.amount)}</td>
                      <td>
                        <BookingStatusPill status={booking.status} />
                      </td>
                      <td>
                        <div className="vendor-action-row">
                          {booking.status === "Pending" ? (
                            <>
                              <button
                                className="vendor-action-btn vendor-approve-btn"
                                type="button"
                                onClick={() => handleApproveBooking(booking.id)}
                              >
                                Approve
                              </button>
                              <button
                                className="vendor-action-btn"
                                type="button"
                                onClick={() => handleDeclineBooking(booking.id)}
                              >
                                Decline
                              </button>
                            </>
                          ) : (
                            <button
                              className="vendor-action-btn"
                              type="button"
                              onClick={() => handleMessageCustomer(booking)}
                            >
                              💬 Message
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "payments" && (
          <>
            <div className="vendor-payments-summary">
              <div className="vendor-card-block vendor-payment-box">
                <div className="vendor-stat-label">Total Earnings</div>
                <div className="vendor-payment-big">
                  {money(stats.totalEarnings)}
                </div>
              </div>

              <div className="vendor-card-block vendor-payment-box">
                <div className="vendor-stat-label">Pending Payouts</div>
                <div className="vendor-payment-big">
                  {money(stats.pendingPayouts)}
                </div>
              </div>

              <div className="vendor-card-block vendor-payment-box">
                <div className="vendor-stat-label">This Month</div>
                <div className="vendor-payment-big">$3,450</div>
                <div className="vendor-growth-text">+22% from last month</div>
              </div>
            </div>

            <div className="vendor-card-block">
              <div className="vendor-block-title">Payment History</div>

              <div className="vendor-table-wrap">
                <table className="vendor-table">
                  <thead>
                    <tr>
                      <th>Transaction ID</th>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td>{payment.id}</td>
                        <td>{payment.date}</td>
                        <td>{payment.description}</td>
                        <td className="vendor-money">+{money(payment.amount)}</td>
                        <td>
                          <PaymentStatusPill status={payment.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === "reviews" && (
          <div className="vendor-card-block">
            <div className="vendor-reviews-top">
              <div className="vendor-block-title">Customer Reviews</div>
              <div className="vendor-review-summary">
                ⭐ <strong>{stats.avgRating.toFixed(1)}</strong> ({totalReviews} reviews)
              </div>
            </div>

            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`vendor-review-item ${
                  index !== reviews.length - 1 ? "vendor-review-divider" : ""
                }`}
              >
                <div className="vendor-review-head">
                  <div>
                    <div className="vendor-review-name">{review.customer}</div>
                    <div className="vendor-review-stars">
                      {"★".repeat(review.stars)}
                    </div>
                  </div>
                  <div className="vendor-review-month">{review.month}</div>
                </div>

                <div className="vendor-review-text">{review.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="vendor-modal-overlay">
          <div className="vendor-modal">
            <div className="vendor-modal-header">
              <div>
                <h2>{editingId ? "Edit Listing" : "Create New Listing"}</h2>
                <p>Add a new vehicle or service to your catalog</p>
              </div>

              <button
                className="vendor-modal-close"
                type="button"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateOrUpdate}>
              <div className="vendor-form-group">
                <label>Listing Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g. 16ft Box Truck - Professional Moving"
                />
              </div>

              <div className="vendor-form-group">
                <label>Vehicle Type</label>
                <select
                  value={form.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                >
                  <option value="">Select vehicle type</option>
                  <option value="Box Truck">Box Truck</option>
                  <option value="Cargo Van">Cargo Van</option>
                  <option value="Moving Truck">Moving Truck</option>
                  <option value="Pickup Truck">Pickup Truck</option>
                </select>
              </div>

              <div className="vendor-form-row">
                <div className="vendor-form-group">
                  <label>Price per Hour</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    placeholder="89"
                  />
                </div>

                <div className="vendor-form-group">
                  <label>Minimum Hours</label>
                  <input
                    type="number"
                    value={form.minHours}
                    onChange={(e) => handleChange("minHours", e.target.value)}
                    placeholder="2"
                  />
                </div>
              </div>

              <div className="vendor-form-group">
                <label>Description</label>
                <textarea
                  rows="4"
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe your service, vehicle features, and what's included..."
                />
              </div>

              <div className="vendor-form-group">
                <label>Service Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="Los Angeles, CA"
                />
              </div>

              <div className="vendor-form-group">
                <label>Vehicle Documents</label>
                <div className="vendor-upload-box">
                  <div className="vendor-upload-icon">⇪</div>
                  <div className="vendor-upload-text">
                    Upload license, registration, and insurance
                  </div>
                  <div className="vendor-upload-subtext">
                    PDF or JPG up to 10MB
                  </div>

                  <input
                    id="vendor-documents"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      handleChange("documents", e.target.files?.[0] || null)
                    }
                  />

                  <label htmlFor="vendor-documents" className="vendor-file-btn">
                    Choose Files
                  </label>

                  {form.documents && (
                    <div className="vendor-file-name">{form.documents.name}</div>
                  )}
                </div>
              </div>

              <div className="vendor-modal-actions">
                <button
                  className="vendor-cancel-btn"
                  type="button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button className="vendor-create-btn" type="submit">
                  {editingId ? "Update Listing" : "Create Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}