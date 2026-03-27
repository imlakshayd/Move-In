import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Truck,
  Clock3,
  CheckCircle2,
  AlertCircle,
  X,
  MapPin,
  User,
  Mail,
  Phone,
} from "lucide-react";
import DashboardTopbar from "../components/DashboardTopbar";
import "./SupportDashboardPage.css";

const MOCK_BOOKINGS = [
  {
    id: "BK-2024-045",
    customerName: "Maya Hayes",
    customerEmail: "maya@example.com",
    customerPhone: "(555) 123-4567",
    vendorName: "John Wilson - Swift Movers LLC",
    vendorPhone: "(555) 987-6543",
    date: "November 25, 2024",
    time: "9:00 AM",
    status: "Booked",
    pickup: "123 Main St, Los Angeles, CA",
    dropoff: "456 Oak Ave, Los Angeles, CA",
    notes: "",
  },
  {
    id: "BK-2024-046",
    customerName: "Sarah Johnson",
    customerEmail: "sarah@example.com",
    customerPhone: "(555) 234-5678",
    vendorName: "Tim Jones - City Haulers",
    vendorPhone: "(555) 234-1111",
    date: "November 25, 2024",
    time: "2:00 PM",
    status: "In Transit",
    pickup: "88 Sunset Blvd, Los Angeles, CA",
    dropoff: "202 Palm Dr, Los Angeles, CA",
    notes: "",
  },
  {
    id: "BK-2024-047",
    customerName: "Mike Chen",
    customerEmail: "mike@example.com",
    customerPhone: "(555) 345-6789",
    vendorName: "John Wilson - Swift Movers LLC",
    vendorPhone: "(555) 987-6543",
    date: "November 25, 2024",
    time: "11:00 AM",
    status: "Pending",
    pickup: "16 River Rd, Los Angeles, CA",
    dropoff: "900 Cedar St, Los Angeles, CA",
    notes: "",
  },
];

function getStatusClass(status) {
  switch (status.toLowerCase()) {
    case "booked":
      return "sd-status booked";
    case "confirmed":
      return "sd-status confirmed";
    case "in transit":
      return "sd-status transit";
    case "completed":
      return "sd-status completed";
    case "pending":
      return "sd-status pending";
    default:
      return "sd-status";
  }
}

export default function SupportDashboardPage() {
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingNotes, setBookingNotes] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");

  const stats = {
    activeBookings: 12,
    pending: bookings.filter((b) => b.status === "Pending").length,
    completedToday: bookings.filter((b) => b.status === "Completed").length,
    issuesReported: 2,
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const q = searchTerm.toLowerCase();

      const matchesSearch =
        booking.id.toLowerCase().includes(q) ||
        booking.customerName.toLowerCase().includes(q) ||
        booking.vendorName.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "All Status" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchTerm, statusFilter]);

  const handleManageBooking = (booking) => {
    setSelectedBooking(booking);
    setBookingNotes(booking.notes || "");
    setBookingStatus(booking.status);
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
    setBookingNotes("");
    setBookingStatus("");
  };

  const handleSaveChanges = () => {
    if (!selectedBooking) return;

    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === selectedBooking.id
          ? {
              ...booking,
              status: bookingStatus,
              notes: bookingNotes,
            }
          : booking
      )
    );

    handleCloseModal();
  };

  const getProgressStep = (status) => {
    switch (status) {
      case "Booked":
        return 1;
      case "Confirmed":
        return 2;
      case "In Transit":
        return 3;
      case "Completed":
        return 4;
      case "Pending":
      default:
        return 2;
    }
  };

  const progressStep = selectedBooking ? getProgressStep(bookingStatus) : 1;

  return (
    <>
      <DashboardTopbar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="sd-page">
        <div className="sd-header">
          <div>
            <h1>Support Dashboard</h1>
            <p>Monitor and manage active bookings</p>
          </div>
        </div>

        <div className="sd-cards">
          <div className="sd-card">
            <div>
              <span>Active Bookings</span>
              <h2>{stats.activeBookings}</h2>
            </div>
            <div className="sd-icon soft-blue">
              <Truck size={18} />
            </div>
          </div>

          <div className="sd-card">
            <div>
              <span>Pending</span>
              <h2>{stats.pending}</h2>
            </div>
            <div className="sd-icon soft-orange">
              <Clock3 size={18} />
            </div>
          </div>

          <div className="sd-card">
            <div>
              <span>Completed Today</span>
              <h2>{stats.completedToday}</h2>
            </div>
            <div className="sd-icon soft-green">
              <CheckCircle2 size={18} />
            </div>
          </div>

          <div className="sd-card">
            <div>
              <span>Issues Reported</span>
              <h2>{stats.issuesReported}</h2>
            </div>
            <div className="sd-icon soft-red">
              <AlertCircle size={18} />
            </div>
          </div>
        </div>

        <div className="sd-toolbar">
          <div className="sd-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by booking ID or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="sd-filter-wrap">
            <Filter size={16} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Booked</option>
              <option>Confirmed</option>
              <option>In Transit</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <div className="sd-table-card">
          <div className="sd-table-header">
            <h3>Recent Bookings</h3>
          </div>

          <div className="sd-table-wrap">
            <table className="sd-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Vendor</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>
                        <div className="sd-customer-cell">
                          <div>{booking.customerName}</div>
                          <small>{booking.customerPhone}</small>
                        </div>
                      </td>
                      <td>{booking.vendorName}</td>
                      <td>
                        <div className="sd-date-cell">
                          <div>{booking.date}</div>
                          <small>{booking.time}</small>
                        </div>
                      </td>
                      <td>
                        <span className={getStatusClass(booking.status)}>
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <div className="sd-actions">
                          <button
                            className="sd-action-btn"
                            onClick={() => handleManageBooking(booking)}
                          >
                            Manage
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="sd-empty">
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedBooking && (
          <div className="sd-modal-overlay" onClick={handleCloseModal}>
            <div className="sd-modal" onClick={(e) => e.stopPropagation()}>
              <button className="sd-modal-close" onClick={handleCloseModal}>
                <X size={16} />
              </button>

              <div className="sd-modal-header">
                <h2>Booking Details - {selectedBooking.id}</h2>
                <p>Manage and track this booking</p>
              </div>

              <div className="sd-progress-section">
                <h4>Progress Tracker</h4>
                <div className="sd-progress">
                  <div className="sd-progress-item">
                    <div className={`sd-step ${progressStep >= 1 ? "active" : ""}`}>
                      1
                    </div>
                    <span>Booked</span>
                  </div>

                  <div
                    className={`sd-progress-line ${progressStep >= 2 ? "active" : ""}`}
                  />

                  <div className="sd-progress-item">
                    <div className={`sd-step ${progressStep >= 2 ? "active" : ""}`}>
                      2
                    </div>
                    <span>Confirmed</span>
                  </div>

                  <div
                    className={`sd-progress-line ${progressStep >= 3 ? "active" : ""}`}
                  />

                  <div className="sd-progress-item">
                    <div className={`sd-step ${progressStep >= 3 ? "active" : ""}`}>
                      3
                    </div>
                    <span>In Transit</span>
                  </div>

                  <div
                    className={`sd-progress-line ${progressStep >= 4 ? "active" : ""}`}
                  />

                  <div className="sd-progress-item">
                    <div className={`sd-step ${progressStep >= 4 ? "active" : ""}`}>
                      4
                    </div>
                    <span>Completed</span>
                  </div>
                </div>
              </div>

              <div className="sd-modal-grid">
                <div className="sd-info-block">
                  <h4>Customer Information</h4>
                  <div className="sd-info-line">
                    <User size={14} />
                    <span>{selectedBooking.customerName}</span>
                  </div>
                  <div className="sd-info-line">
                    <Mail size={14} />
                    <span>{selectedBooking.customerEmail}</span>
                  </div>
                  <div className="sd-info-line">
                    <Phone size={14} />
                    <span>{selectedBooking.customerPhone}</span>
                  </div>
                </div>

                <div className="sd-info-block">
                  <h4>Vendor Information</h4>
                  <div className="sd-info-line">
                    <User size={14} />
                    <span>{selectedBooking.vendorName}</span>
                  </div>
                  <div className="sd-info-line">
                    <Phone size={14} />
                    <span>{selectedBooking.vendorPhone}</span>
                  </div>
                </div>
              </div>

              <div className="sd-info-block">
                <h4>Route Information</h4>
                <div className="sd-info-line">
                  <MapPin size={14} />
                  <span>
                    <strong>Pickup:</strong> {selectedBooking.pickup}
                  </span>
                </div>
                <div className="sd-info-line">
                  <MapPin size={14} />
                  <span>
                    <strong>Drop-off:</strong> {selectedBooking.dropoff}
                  </span>
                </div>
              </div>

              <div className="sd-info-block">
                <h4>Support Notes</h4>
                <textarea
                  className="sd-notes"
                  placeholder="Add notes about this booking..."
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                />
              </div>

              <div className="sd-info-block">
                <h4>Update Status</h4>
                <select
                  className="sd-status-select"
                  value={bookingStatus}
                  onChange={(e) => setBookingStatus(e.target.value)}
                >
                  <option value="Booked">Booked</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="sd-modal-actions">
                <button className="sd-secondary-btn">Send Update (Email/SMS)</button>
                <button className="sd-primary-btn" onClick={handleSaveChanges}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}