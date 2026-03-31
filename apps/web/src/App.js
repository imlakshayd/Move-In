import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ListYourTruckPage from "./pages/ListYourTruckPage";
import CustomerDashboardPage from "./pages/CustomerDashboardPage";
import VendorDetailsPage from "./pages/VendorDetailsPage";
import ListingsPage from "./pages/ListingsPage";
import CompareListingsPage from "./pages/CompareListingsPage";
import BookingPage from "./pages/BookingPage";
import VendorMessagesPage from "./pages/VendorMessagesPage";
import SupportDashboardPage from "./pages/SupportDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AllUsersPage from "./pages/AllUsersPage";

import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

import "./App.css";

const cardStyle = {
  background: "#ffffff",
  padding: "22px",
  borderRadius: "14px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
};

function SimpleInfoPage({ title, text }) {
  return (
    <div
      style={{
        minHeight: "80vh",
        background: "#f8fafc",
        padding: "56px 20px 72px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #2563eb, #1e3a8a)",
            color: "#ffffff",
            padding: "42px 36px",
            borderRadius: "20px",
            marginBottom: "28px",
            boxShadow: "0 18px 40px rgba(37, 99, 235, 0.22)",
          }}
        >
          <p
            style={{
              margin: "0 0 10px",
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              opacity: 0.9,
            }}
          >
            Move-In Information
          </p>

          <h1
            style={{
              margin: "0 0 12px",
              fontSize: "38px",
              lineHeight: "1.15",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: "16px",
              lineHeight: "1.8",
              maxWidth: "760px",
              color: "rgba(255,255,255,0.92)",
            }}
          >
            {text}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <div style={cardStyle}>
            <h3
              style={{
                marginTop: 0,
                marginBottom: "10px",
                color: "#111827",
              }}
            >
              Professional Service
            </h3>
            <p
              style={{
                margin: 0,
                color: "#4b5563",
                lineHeight: "1.7",
              }}
            >
              Move-In is designed to make searching, comparing, and booking
              moving services easier for customers and more effective for
              vendors.
            </p>
          </div>

          <div style={cardStyle}>
            <h3
              style={{
                marginTop: 0,
                marginBottom: "10px",
                color: "#111827",
              }}
            >
              Clear Experience
            </h3>
            <p
              style={{
                margin: 0,
                color: "#4b5563",
                lineHeight: "1.7",
              }}
            >
              We focus on a smoother user journey with better visibility into
              listings, service details, communication, and booking support.
            </p>
          </div>

          <div style={cardStyle}>
            <h3
              style={{
                marginTop: 0,
                marginBottom: "10px",
                color: "#111827",
              }}
            >
              Customer & Vendor Support
            </h3>
            <p
              style={{
                margin: 0,
                color: "#4b5563",
                lineHeight: "1.7",
              }}
            >
              Our platform supports both sides of the marketplace by providing
              tools, guidance, and resources that improve trust and usability.
            </p>
          </div>
        </div>

        <div
          style={{
            ...cardStyle,
            padding: "26px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: "12px",
              fontSize: "24px",
              color: "#111827",
            }}
          >
            Why this page matters
          </h2>

          <p
            style={{
              margin: 0,
              color: "#4b5563",
              lineHeight: "1.8",
            }}
          >
            This section provides additional information to help users better
            understand the Move-In platform, its services, and the resources
            available for customers, vendors, and support-related needs. It also
            makes the page feel more complete, useful, and professional within
            the overall application.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/vendor/:vendorId" element={<VendorDetailsPage />} />
        <Route path="/book/:vendorId" element={<BookingPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/compare" element={<CompareListingsPage />} />

        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/list-your-truck"
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <ListYourTruckPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/messages"
          element={
            <ProtectedRoute allowedRoles={["vendor", "support"]}>
              <VendorMessagesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/support/dashboard"
          element={
            <ProtectedRoute allowedRoles={["support"]}>
              <SupportDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AllUsersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <SimpleInfoPage
              title="About Us"
              text="Move-In connects customers with trusted moving services and independent truck owners through a simple, modern booking platform."
            />
          }
        />

        <Route
          path="/contact"
          element={
            <SimpleInfoPage
              title="Contact"
              text="Need help? Reach out to the Move-In team for booking questions, support requests, or general inquiries."
            />
          }
        />

        <Route
          path="/careers"
          element={
            <SimpleInfoPage
              title="Careers"
              text="Join the Move-In team and help us build better tools for customers, movers, and independent truck owners."
            />
          }
        />

        <Route
          path="/press"
          element={
            <SimpleInfoPage
              title="Press"
              text="Find the latest company updates, announcements, and media information about Move-In."
            />
          }
        />

        <Route
          path="/faqs"
          element={
            <SimpleInfoPage
              title="FAQs"
              text="Find answers to common questions about browsing listings, booking a move, payments, and account support."
            />
          }
        />

        <Route
          path="/help-center"
          element={
            <SimpleInfoPage
              title="Help Center"
              text="Visit the Help Center for guidance on using Move-In, managing bookings, and resolving common issues."
            />
          }
        />

        <Route
          path="/safety-guidelines"
          element={
            <SimpleInfoPage
              title="Safety Guidelines"
              text="Learn about the recommended safety practices for customers, movers, and vendors using the Move-In platform."
            />
          }
        />

        <Route
          path="/insurance-info"
          element={
            <SimpleInfoPage
              title="Insurance Info"
              text="Review general insurance-related information for services listed through Move-In."
            />
          }
        />

        <Route
          path="/terms"
          element={
            <SimpleInfoPage
              title="Terms of Service"
              text="Read the terms and conditions for using the Move-In platform and related services."
            />
          }
        />

        <Route
          path="/privacy"
          element={
            <SimpleInfoPage
              title="Privacy Policy"
              text="Read how Move-In collects, uses, and protects your information."
            />
          }
        />

        <Route
          path="/cookies"
          element={
            <SimpleInfoPage
              title="Cookie Policy"
              text="Learn how cookies and similar technologies are used across the Move-In platform."
            />
          }
        />

        <Route
          path="/accessibility"
          element={
            <SimpleInfoPage
              title="Accessibility"
              text="Move-In is committed to providing an accessible experience for all users."
            />
          }
        />

        <Route
          path="*"
          element={<div style={{ padding: 24 }}>Page not found</div>}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}