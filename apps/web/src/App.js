// apps/web/src/App.js
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

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Browse + Vendor details */}
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/vendor/:vendorId" element={<VendorDetailsPage />} />
        <Route path="/book/:vendorId" element={<BookingPage />} />

        {/* Compare page */}
        <Route path="/compare" element={<CompareListingsPage />} />

        {/* Customer only */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Vendor only */}
        <Route
          path="/list-your-truck"
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <ListYourTruckPage />
            </ProtectedRoute>
          }
        />

        {/* Vendor + Support */}
        <Route
          path="/vendor/messages"
          element={
            <ProtectedRoute allowedRoles={["vendor", "support"]}>
              <VendorMessagesPage />
            </ProtectedRoute>
          }
        />

        {/* Support only */}
        <Route
          path="/support/dashboard"
          element={
            <ProtectedRoute allowedRoles={["support"]}>
              <SupportDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Admin only */}
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

        {/* 404 */}
        <Route
          path="*"
          element={<div style={{ padding: 24 }}>Page not found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}