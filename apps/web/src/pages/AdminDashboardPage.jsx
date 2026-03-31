import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboardPage.css";
import DashboardTopbar from "../components/DashboardTopbar";
import {
  Users,
  Truck,
  DollarSign,
  TrendingUp,
  X,
  Activity,
  CheckCircle2,
  HeartPulse,
} from "lucide-react";

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Emily Rodriguez",
      email: "emily@example.com",
      role: "user",
      joined: "2024-11-20",
      status: "Active",
    },
    {
      id: 2,
      name: "David Kim",
      email: "david@example.com",
      role: "vendor",
      joined: "2024-11-19",
      status: "Pending",
    },
    {
      id: 3,
      name: "Lisa Chen",
      email: "lisa@example.com",
      role: "user",
      joined: "2024-11-18",
      status: "Active",
    },
    {
      id: 4,
      name: "James Carter",
      email: "james@example.com",
      role: "user",
      joined: "2024-11-17",
      status: "Suspended",
    },
    {
      id: 5,
      name: "Sophia Patel",
      email: "sophia@example.com",
      role: "vendor",
      joined: "2024-11-16",
      status: "Pending",
    },
  ]);

  const [listingApprovals, setListingApprovals] = useState([
    {
      id: 101,
      vendor: "David Kim",
      title: "18ft Moving Truck",
      submitted: "2024-11-19",
      documents: "Complete",
      status: "Pending",
    },
    {
      id: 102,
      vendor: "Robert Taylor",
      title: "Cargo Van Service",
      submitted: "2024-11-18",
      documents: "Incomplete",
      status: "Pending",
    },
  ]);

  const [flaggedReviews, setFlaggedReviews] = useState([
    {
      id: 201,
      user: "Anonymous User",
      company: "Swift Movers LLC",
      date: "2024-11-20",
      rating: 5,
      text: "This is a test flagged review that might contain inappropriate content.",
      reason: "Inappropriate language",
      status: "Flagged",
    },
  ]);

  const [healthServices] = useState([
    {
      id: 301,
      name: "Stripe API",
      uptime: 99.9,
      status: "Operational",
    },
    {
      id: 302,
      name: "Google Maps API",
      uptime: 100,
      status: "Operational",
    },
    {
      id: 303,
      name: "Twilio SMS",
      uptime: 97.5,
      status: "Degraded",
    },
    {
      id: 304,
      name: "Email Service",
      uptime: 99.8,
      status: "Operational",
    },
  ]);

  const revenueData = [
    { month: "Jun", value: 40 },
    { month: "Jul", value: 48 },
    { month: "Aug", value: 60 },
    { month: "Sep", value: 70 },
    { month: "Oct", value: 90 },
    { month: "Nov", value: 120 },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const target =
        `${user.name} ${user.email} ${user.role} ${user.status}`.toLowerCase();
      return target.includes(searchTerm.toLowerCase());
    });
  }, [users, searchTerm]);

  const filteredApprovals = useMemo(() => {
    return listingApprovals.filter((item) => {
      const target =
        `${item.vendor} ${item.title} ${item.submitted} ${item.documents} ${item.status}`.toLowerCase();
      return target.includes(searchTerm.toLowerCase());
    });
  }, [listingApprovals, searchTerm]);

  const filteredReviews = useMemo(() => {
    return flaggedReviews.filter((review) => {
      const target =
        `${review.user} ${review.company} ${review.text} ${review.reason} ${review.status}`.toLowerCase();
      return target.includes(searchTerm.toLowerCase());
    });
  }, [flaggedReviews, searchTerm]);

  const filteredHealth = useMemo(() => {
    return healthServices.filter((service) => {
      const target =
        `${service.name} ${service.status} ${service.uptime}`.toLowerCase();
      return target.includes(searchTerm.toLowerCase());
    });
  }, [healthServices, searchTerm]);

  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleApproveVendor = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: "Active" } : user
      )
    );

    setSelectedUser((prev) =>
      prev && prev.id === id ? { ...prev, status: "Active" } : prev
    );
  };

  const handleSuspendUser = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: "Suspended" } : user
      )
    );

    setSelectedUser((prev) =>
      prev && prev.id === id ? { ...prev, status: "Suspended" } : prev
    );
  };

  const handleActivateUser = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: "Active" } : user
      )
    );

    setSelectedUser((prev) =>
      prev && prev.id === id ? { ...prev, status: "Active" } : prev
    );
  };

  const handleViewAllUsers = () => {
    navigate("/admin/users", { state: { users } });
  };

  const handleReviewListing = (listing) => {
    alert(
      `Reviewing listing:\n\nVendor: ${listing.vendor}\nTitle: ${listing.title}\nSubmitted: ${listing.submitted}\nDocuments: ${listing.documents}`
    );
  };

  const handleApproveListing = (id) => {
    setListingApprovals((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRejectListing = (id) => {
    setListingApprovals((prev) => prev.filter((item) => item.id !== id));
  };

  const handleApproveFlaggedReview = (id) => {
    setFlaggedReviews((prev) =>
      prev.map((review) =>
        review.id === id ? { ...review, status: "Approved" } : review
      )
    );
  };

  const handleRemoveFlaggedReview = (id) => {
    setFlaggedReviews((prev) => prev.filter((review) => review.id !== id));
  };

  const handleContactUser = (review) => {
    alert(
      `Contact request opened for:\n\n${review.user}\nReview for ${review.company}\nReason: ${review.reason}`
    );
  };

  const averageHealth =
    healthServices.reduce((sum, item) => sum + item.uptime, 0) /
    healthServices.length;

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Active":
      case "Operational":
      case "Approved":
      case "Complete":
        return "admin-status-green";
      case "Pending":
        return "admin-status-yellow";
      case "Incomplete":
      case "Flagged":
      case "Suspended":
      case "Rejected":
        return "admin-status-red";
      case "Degraded":
        return "admin-status-orange";
      default:
        return "admin-status-gray";
    }
  };

  const renderStars = (count) => {
    return "★".repeat(count) + "☆".repeat(5 - count);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "users":
        return (
          <div className="admin-card admin-section-card">
            <div className="admin-card-header">
              <h3 className="admin-section-title">Recent Users</h3>
              <button
                type="button"
                onClick={handleViewAllUsers}
                className="admin-outline-btn"
              >
                View All Users
              </button>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="admin-name-cell">{user.name}</td>
                      <td className="admin-muted-text">{user.email}</td>
                      <td>
                        <span className="admin-role-chip">{user.role}</span>
                      </td>
                      <td className="admin-muted-text">{user.joined}</td>
                      <td>
                        <span
                          className={`admin-badge ${getStatusBadgeClass(
                            user.status
                          )}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <div className="admin-actions">
                          <button
                            type="button"
                            onClick={() => handleViewUser(user)}
                            className="admin-neutral-btn"
                          >
                            View
                          </button>

                          {user.status === "Pending" && (
                            <button
                              type="button"
                              onClick={() => handleApproveVendor(user.id)}
                              className="admin-success-btn"
                            >
                              Approve
                            </button>
                          )}

                          {user.status === "Active" && (
                            <button
                              type="button"
                              onClick={() => handleSuspendUser(user.id)}
                              className="admin-danger-btn"
                            >
                              Suspend
                            </button>
                          )}

                          {user.status === "Suspended" && (
                            <button
                              type="button"
                              onClick={() => handleActivateUser(user.id)}
                              className="admin-success-btn"
                            >
                              Activate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="6" className="admin-empty">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "approvals":
        return (
          <div className="admin-card admin-section-card">
            <h3 className="admin-section-title">Pending Listing Approvals</h3>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Vendor</th>
                    <th>Listing Title</th>
                    <th>Submitted</th>
                    <th>Documents</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApprovals.map((item) => (
                    <tr key={item.id}>
                      <td className="admin-name-cell">{item.vendor}</td>
                      <td className="admin-muted-text">{item.title}</td>
                      <td className="admin-muted-text">{item.submitted}</td>
                      <td>
                        <span
                          className={`admin-badge ${getStatusBadgeClass(
                            item.documents
                          )}`}
                        >
                          {item.documents}
                        </span>
                      </td>
                      <td>
                        <div className="admin-actions">
                          <button
                            type="button"
                            onClick={() => handleReviewListing(item)}
                            className="admin-neutral-btn"
                          >
                            Review
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApproveListing(item.id)}
                            className="admin-success-btn"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRejectListing(item.id)}
                            className="admin-danger-btn"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredApprovals.length === 0 && (
                    <tr>
                      <td colSpan="5" className="admin-empty">
                        No pending approvals.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "moderation":
        return (
          <div className="admin-card admin-section-card">
            <h3 className="admin-section-title">Flagged Reviews</h3>

            <div className="admin-review-list">
              {filteredReviews.map((review) => (
                <div key={review.id} className="admin-review-card">
                  <div className="admin-review-top">
                    <div className="admin-review-user-wrap">
                      <div className="admin-review-user-row">
                        <span className="admin-review-user">{review.user}</span>
                        <span
                          className={`admin-badge ${getStatusBadgeClass(
                            review.status
                          )}`}
                        >
                          {review.status}
                        </span>
                      </div>

                      <p className="admin-review-meta">
                        Review for {review.company} • {review.date}
                      </p>
                    </div>

                    <div className="admin-review-stars">
                      {renderStars(review.rating)}
                    </div>
                  </div>

                  <p className="admin-review-text">"{review.text}"</p>

                  <p className="admin-review-flag">
                    Flagged for: {review.reason}
                  </p>

                  <div className="admin-actions">
                    <button
                      type="button"
                      onClick={() => handleApproveFlaggedReview(review.id)}
                      className="admin-success-btn"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveFlaggedReview(review.id)}
                      className="admin-danger-btn"
                    >
                      Remove
                    </button>
                    <button
                      type="button"
                      onClick={() => handleContactUser(review)}
                      className="admin-neutral-btn"
                    >
                      Contact User
                    </button>
                  </div>
                </div>
              ))}

              {filteredReviews.length === 0 && (
                <div className="admin-empty-card">No flagged reviews found.</div>
              )}
            </div>
          </div>
        );

      case "health":
        return (
          <div className="admin-health-wrap">
            <div className="admin-card admin-section-card">
              <h3 className="admin-section-title">API Health Status</h3>

              <div className="admin-health-list">
                {filteredHealth.map((service) => (
                  <div key={service.id} className="admin-health-card">
                    <div className="admin-health-row">
                      <div className="admin-health-name-wrap">
                        <Activity
                          size={18}
                          className={
                            service.status === "Degraded"
                              ? "admin-health-icon admin-health-icon-orange"
                              : "admin-health-icon admin-health-icon-green"
                          }
                        />
                        <span className="admin-health-name">{service.name}</span>
                      </div>

                      <span
                        className={`admin-badge ${getStatusBadgeClass(
                          service.status
                        )}`}
                      >
                        {service.status}
                      </span>
                    </div>

                    <div className="admin-progress-track">
                      <div
                        className="admin-progress-fill"
                        style={{ width: `${service.uptime}%` }}
                      />
                    </div>

                    <div className="admin-progress-label">{service.uptime}%</div>
                  </div>
                ))}

                {filteredHealth.length === 0 && (
                  <div className="admin-empty-card">
                    No services match your search.
                  </div>
                )}
              </div>
            </div>

            <div className="admin-health-stats-grid">
              <div className="admin-mini-stat-card">
                <div className="admin-mini-stat-icon admin-mini-blue">
                  <HeartPulse size={18} />
                </div>
                <div>
                  <p className="admin-mini-stat-label">Server Uptime</p>
                  <h4 className="admin-mini-stat-value">99.9%</h4>
                </div>
              </div>

              <div className="admin-mini-stat-card">
                <div className="admin-mini-stat-icon admin-mini-green">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <p className="admin-mini-stat-label">API Requests</p>
                  <h4 className="admin-mini-stat-value">1.2M/day</h4>
                </div>
              </div>

              <div className="admin-mini-stat-card">
                <div className="admin-mini-stat-icon admin-mini-purple">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <p className="admin-mini-stat-label">Avg Response</p>
                  <h4 className="admin-mini-stat-value">145ms</h4>
                </div>
              </div>
            </div>

            <div className="admin-health-summary">
              Overall system status:{" "}
              <strong>
                {averageHealth >= 99 ? "Healthy" : "Needs attention"}
              </strong>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="admin-page">
      <DashboardTopbar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <main className="admin-container">
        <div className="admin-heading">
          <h1 className="admin-page-title">Admin Dashboard</h1>
          <p className="admin-page-subtitle">
            Platform overview and management
          </p>
        </div>

        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div>
              <p className="admin-stat-label">Total Users</p>
              <h2 className="admin-stat-value">5,420</h2>
              <p className="admin-stat-note">+128 this week</p>
            </div>
            <div className="admin-stat-icon admin-stat-icon-blue">
              <Users size={20} />
            </div>
          </div>

          <div className="admin-stat-card">
            <div>
              <p className="admin-stat-label">Active Vendors</p>
              <h2 className="admin-stat-value">342</h2>
              <p className="admin-stat-note admin-stat-note-muted">
                1523 listings
              </p>
            </div>
            <div className="admin-stat-icon admin-stat-icon-purple">
              <Truck size={20} />
            </div>
          </div>

          <div>
            <div className="admin-stat-card">
              <div>
                <p className="admin-stat-label">Monthly Revenue</p>
                <h2 className="admin-stat-value">$125.8K</h2>
                <p className="admin-stat-note">+28% from last month</p>
              </div>
              <div className="admin-stat-icon admin-stat-icon-green">
                <DollarSign size={20} />
              </div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div>
              <p className="admin-stat-label">Total Bookings</p>
              <h2 className="admin-stat-value">8,943</h2>
              <p className="admin-stat-note admin-stat-note-muted">
                156 active now
              </p>
            </div>
            <div className="admin-stat-icon admin-stat-icon-orange">
              <TrendingUp size={20} />
            </div>
          </div>
        </div>

        <div className="admin-card admin-chart-card">
          <h3 className="admin-chart-title">Revenue Trend (Last 6 Months)</h3>

          <div className="admin-chart-area">
            {revenueData.map((item) => (
              <div key={item.month} className="admin-chart-col">
                <div
                  className="admin-chart-bar"
                  style={{ height: `${item.value * 1.2}px` }}
                />
                <span className="admin-chart-label">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-tabs">
          {[
            { key: "users", label: "Users" },
            { key: "approvals", label: "Listing Approvals" },
            { key: "moderation", label: "Review Moderation" },
            { key: "health", label: "System Health" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`admin-tab ${activeTab === tab.key ? "active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {getTabContent()}
      </main>

      {selectedUser && (
        <div className="admin-modal-overlay" onClick={handleCloseModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>User Details</h3>
              <button
                type="button"
                className="admin-modal-close"
                onClick={handleCloseModal}
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-detail-row">
                <span className="admin-detail-label">Name:</span>
                <span>{selectedUser.name}</span>
              </div>

              <div className="admin-detail-row">
                <span className="admin-detail-label">Email:</span>
                <span>{selectedUser.email}</span>
              </div>

              <div className="admin-detail-row">
                <span className="admin-detail-label">Role:</span>
                <span>{selectedUser.role}</span>
              </div>

              <div className="admin-detail-row">
                <span className="admin-detail-label">Joined:</span>
                <span>{selectedUser.joined}</span>
              </div>

              <div className="admin-detail-row">
                <span className="admin-detail-label">Status:</span>
                <span
                  className={`admin-badge ${getStatusBadgeClass(
                    selectedUser.status
                  )}`}
                >
                  {selectedUser.status}
                </span>
              </div>
            </div>

            <div className="admin-modal-footer">
              {selectedUser.status === "Pending" && (
                <button
                  type="button"
                  onClick={() => handleApproveVendor(selectedUser.id)}
                  className="admin-success-btn"
                >
                  Approve
                </button>
              )}

              {selectedUser.status === "Active" && (
                <button
                  type="button"
                  onClick={() => handleSuspendUser(selectedUser.id)}
                  className="admin-danger-btn"
                >
                  Suspend
                </button>
              )}

              {selectedUser.status === "Suspended" && (
                <button
                  type="button"
                  onClick={() => handleActivateUser(selectedUser.id)}
                  className="admin-success-btn"
                >
                  Activate
                </button>
              )}

              <button
                type="button"
                onClick={handleCloseModal}
                className="admin-outline-btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;