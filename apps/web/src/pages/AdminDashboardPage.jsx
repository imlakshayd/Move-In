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
      status: "Active",
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

  const handleViewAllUsers = () => {
    navigate("/admin/users", { state: { users } });
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "users":
        return (
          <div className="admin-card admin-users-card">
            <div className="admin-card-header improved-header">
              <div className="admin-card-heading-block">
                <h3 className="admin-card-title">Recent Users</h3>
                <p className="admin-card-subtitle">
                  Manage and review user accounts
                </p>
              </div>

              <button
                type="button"
                onClick={handleViewAllUsers}
                className="admin-outline-btn improved-btn"
              >
                View All Users →
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
                  {filteredUsers.slice(0, 5).map((user) => (
                    <tr key={user.id}>
                      <td className="admin-name">{user.name}</td>
                      <td className="admin-email">{user.email}</td>
                      <td>
                        <span className="admin-badge admin-role-badge">
                          {user.role}
                        </span>
                      </td>
                      <td className="admin-muted-text">{user.joined}</td>
                      <td>
                        <span
                          className={`admin-badge ${
                            user.status === "Active"
                              ? "admin-status-active"
                              : "admin-status-pending"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <div className="admin-actions">
                          <button
                            type="button"
                            onClick={() => handleViewUser(user)}
                            className="admin-view-btn"
                          >
                            View
                          </button>

                          {user.status === "Pending" && (
                            <button
                              type="button"
                              onClick={() => handleApproveVendor(user.id)}
                              className="admin-approve-btn"
                            >
                              Approve
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
          <div className="admin-panel-card">
            <h3 className="admin-card-title">Listing Approvals</h3>
            <p className="admin-panel-text">
              Review listings waiting for approval.
            </p>
            <button
              type="button"
              onClick={() => alert("Open listing approvals")}
              className="admin-solid-btn admin-solid-btn-blue"
            >
              Open Approvals
            </button>
          </div>
        );

      case "moderation":
        return (
          <div className="admin-panel-card">
            <h3 className="admin-card-title">Review Moderation</h3>
            <p className="admin-panel-text">
              Manage flagged reviews and reported content.
            </p>
            <button
              type="button"
              onClick={() => alert("Open moderation panel")}
              className="admin-solid-btn admin-solid-btn-purple"
            >
              Open Moderation
            </button>
          </div>
        );

      case "health":
        return (
          <div className="admin-panel-card">
            <h3 className="admin-card-title">System Health</h3>
            <p className="admin-panel-text">
              Monitor application uptime, performance, and service status.
            </p>
            <button
              type="button"
              onClick={() => alert("Open system health")}
              className="admin-solid-btn admin-solid-btn-green"
            >
              View System Status
            </button>
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
          {["users", "approvals", "moderation", "health"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`admin-tab ${activeTab === tab ? "active" : ""}`}
            >
              {tab === "users"
                ? "Users"
                : tab === "approvals"
                ? "Listing Approvals"
                : tab === "moderation"
                ? "Review Moderation"
                : "System Health"}
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
                  className={`admin-badge ${
                    selectedUser.status === "Active"
                      ? "admin-status-active"
                      : "admin-status-pending"
                  }`}
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
                  className="admin-approve-btn"
                >
                  Approve
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