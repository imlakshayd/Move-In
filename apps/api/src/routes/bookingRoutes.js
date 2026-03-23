const express = require("express");
const router = express.Router();

const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking
} = require("../controllers/bookingController");

router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.post("/", createBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = router;