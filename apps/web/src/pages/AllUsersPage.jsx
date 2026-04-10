import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardTopbar from "../components/DashboardTopbar";
import "./AllUsersPage.css";

const fallbackUsers = [
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
];

const AllUsersPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const users = location.state?.users || fallbackUsers;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const target =
        `${user.name} ${user.email} ${user.role} ${user.status}`.toLowerCase();
      return target.includes(searchTerm.toLowerCase());
    });
  }, [users, searchTerm]);

  return (
    <div className="all-users-page">
      <DashboardTopbar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <main className="all-users-container">
        <div className="all-users-header">
          <div>
            <h1 className="all-users-title">All Users</h1>
            <p className="all-users-subtitle">
              View and manage all registered users
            </p>
          </div>

          <button
            type="button"
            className="all-users-back-btn"
            onClick={() => navigate("/admin-dashboard")}
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="all-users-card">
          <div className="all-users-card-top">
            <h3>Users List</h3>
            <span className="all-users-count">
              {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="all-users-table-wrap">
            <table className="all-users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="all-users-name">{user.name}</td>
                    <td className="all-users-email">{user.email}</td>
                    <td>
                      <span className="all-users-badge all-users-role">
                        {user.role}
                      </span>
                    </td>
                    <td className="all-users-muted">{user.joined}</td>
                    <td>
                      <span
                        className={`all-users-badge ${
                          user.status === "Active"
                            ? "all-users-active"
                            : "all-users-pending"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="all-users-empty">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllUsersPage;