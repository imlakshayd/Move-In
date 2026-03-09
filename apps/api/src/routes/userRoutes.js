const express = require("express");
const router = express.Router();

// Import controller functions
const { locateUserById, registerNewUser, vendor, vehicle_owner, manager, support_staff, getAllVendors, getAllUsers, getAllVehicleOwner, getAllManagers, getAllSupportStaff  } = require("../controllers/userController");

// Get all vendors
router.get("/vendors", getAllVendors);

// Get all users
router.get("/", getAllUsers);

// Get all vehicle owners
router.get("/vehicle_owner", getAllVehicleOwner);

// Get all managers
router.get("/managers", getAllManagers);

// Get all support staff
router.get("/support_staff", getAllSupportStaff);


// Create a new user
router.post("/", registerNewUser);

// Create a Vendor
router.post("/vendor", vendor);

// Create a Vehicle Owner
router.post("/vehicle_owner", vehicle_owner);

// Create a Manager
router.post("/manager", manager);

// Create a Support Staff
router.post("/support_staff", support_staff);

// Get user by ID
router.get("/:id", locateUserById);

module.exports = router;
