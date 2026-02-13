const express = require("express");
const router = express.Router();

// Import controller functions
const { locateUserById, registerNewUser } = require("../controllers/userController");

// Get user by ID
router.get("/:id", locateUserById);

// Create a new user
router.post("/", registerNewUser);

module.exports = router;
