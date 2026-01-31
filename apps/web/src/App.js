import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ListingsPage from "./pages/ListingsPage"; 
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ListYourTruckPage from "./pages/ListYourTruckPage";
import CustomerDashboardPage from "./pages/CustomerDashboardPage";
import VendorDetailsPage from "./pages/VendorDetailsPage";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/listings" element={<ListingsPage />} /> 
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Vendor Details (public) */}
        <Route path="/vendor/:vendorId" element={<VendorDetailsPage />} />

        {/* Customer Dashboard (CUSTOMER ONLY) */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* List Your Truck (VENDOR ONLY) */}
        <Route
          path="/list-your-truck"
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <ListYourTruckPage />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<div style={{ padding: 24 }}>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
