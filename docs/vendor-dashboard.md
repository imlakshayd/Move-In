# Vendor Dashboard Feature

#  Purpose: 
The Vendor Dashboard allows service providers (vendors) 
to manage their moving service listings, monitor booking activity, 
and control the availability of their services.

#  User Role:
Vendor(authenticated user with vendor role)

#  Pages Overview:
| Page           | Route                       | Description                             |
| Dashboard Home | `/vendor/dashboard`         | Overview with stats and recent activity |
| My Listings    | `/vendor/listings`          | View and manage all vendor listings     |
| Create Listing | `/vendor/listings/new`      | Add a new service listing               |
| Edit Listing   | `/vendor/listings/:id/edit` | Update an existing listing              |
| Delete Listing | Model                       | Remove a listing                        |

#  Dashboard Home Components
 Statistics Cards 
- Total Listings 
- Active Listings 
- Pending Bookings 
- Completed Jobs

# Quick Action 
- Create New Listing button

#  Recent Activity Feed
Shows the vendor’s latest actions:
- Created a listing
- Updated a service
- Booking confirmed 
- Listing status changed
- 
# My Listings Page Components 
- Search input (by listing title)
- Filter dropdown:
    - All 
    - Active 
    - Inactive

# Listings Table Fields:
| Title        | Service name         |
| Service Type | Type of move/service |
| Price        | Service price        |
| Status       | Active/Inactive      |
| Last Updated | Date modified        |

# Actions per Listing:
 View
 Edit
 Delete

# ➕ Create / Edit Listing Form:
| Field           | Required | Description               |

| Title           | Yes      | Name of service           |
| Description     | Yes      | Details about the service |
| Service Type    | Yes      | Dropdown selection        |
| Location Served | Yes      | Area/city                 |
| Price           | Yes      | Numeric value             |
| Availability    | Optional | Days available            |
| Status          | Yes      | Active/Inactive toggle    |


# Buttons:
Save Listing + Cancel

#  Delete Listing Model:
Title: Delete Listing
Message: Are you sure you want to remove this service?
Buttons: Cancel + Delete

#  Validation Rules:
- Title cannot be empty
- Description minimum 10 characters 
- Price must be a positive number

#  API Endpoints (Frontend Expectations): 
Action	Method	Endpoint
| Action         | Method | Endpoint                   |

| Get Listings   | GET    | `/api/vendor/listings`     |
| Create Listing | POST   | `/api/vendor/listings`     |
| Update Listing | PUT    | `/api/vendor/listings/:id` |
| Delete Listing | DELETE | `/api/vendor/listings/:id` |

#  UI Behavior:
- After creating listing → redirect to Listings page

- After deleting → remove item 

- Show success & error messages

