# 🔌 Move-In API Routes

This document defines backend API endpoints for integration between 
frontend and backend services.

---
## 🔐 Authentication
| Action | Method | Endpoint | Auth |

| Register | POST | /api/auth/register | No |
| Login | POST | /api/auth/login | No |
| Get Profile | GET | /api/auth/me | Yes |


## 🚚 Vendor Endpoints
| Action | Method | Endpoint | Auth |

| Get Vendor Dashboard Stats | GET | /api/vendor/dashboard | Yes (Vendor) |
| Get Listings | GET | /api/vendor/listings | Yes (Vendor) |
| Create Listing | POST | /api/vendor/listings | Yes (Vendor) |
| Update Listing | PUT | /api/vendor/listings/:id | Yes (Vendor) |
| Delete Listing | DELETE | /api/vendor/listings/:id | Yes (Vendor) |

---

## 🔍 Public Listings
| Action | Method | Endpoint | Auth |

| Search Listings | GET | /api/listings/search | No |
| Get Listing Details | GET | /api/listings/:id | No |

---

## 📦 Booking Endpoints
| Action | Method | Endpoint | Auth |

| Create Booking | POST | /api/bookings | Yes (Customer) |
| Get My Bookings | GET | /api/bookings | Yes |
| Update Booking Status | PUT | /api/bookings/:id/status | Yes (Vendor/Admin) |

---

## 🛡 Admin / Staff
| Action | Method | Endpoint | Auth |

| Get All Users | GET | /api/admin/users | Yes (Admin) |
| Suspend User | PUT | /api/admin/users/:id/status | Yes (Admin) |

---

## 📌 Notes
- All protected routes require JWT authentication.
- Role-based access control must be implemented.
