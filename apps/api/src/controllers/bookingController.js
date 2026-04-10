const supabase = require("../db/supabase");

// valid booking statuses
const validBookingStatuses = [
  "PENDING",
  "CONFIRMED",
  "IN_TRANSIT",
  "COMPLETED",
  "CANCELLED"
];

// Create a new booking
async function createBooking(req, res) {
  try {
    const {
      customer_id,
      listing_id,
      booking_date,
      start_time,
      end_time,
      status,
      total_amount
    } = req.body;

    if (
      !customer_id ||
      !listing_id ||
      !booking_date ||
      !start_time ||
      !end_time ||
      !status ||
      total_amount === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: customer_id, listing_id, booking_date, start_time, end_time, status, total_amount"
      });
    }

    // ADD THIS HERE
    if (!validBookingStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Allowed values: PENDING, CONFIRMED, IN_TRANSIT, COMPLETED, CANCELLED"
      });
    }

    const { data, error } = await supabase
      .from("booking")
      .insert([
        {
          customer_id,
          listing_id,
          booking_date,
          start_time,
          end_time,
          status,
          total_amount
        }
      ])
      .select("*")
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      booking: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get all bookings
async function getAllBookings(req, res) {
  try {
    const { data, error } = await supabase
      .from("booking")
      .select("*");

    if (error) throw error;

    return res.json({
      success: true,
      bookings: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get booking by ID
async function getBookingById(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("booking")
      .select("*")
      .eq("booking_id", id)
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      booking: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Update booking
async function updateBooking(req, res) {
  try {
    const { id } = req.params;
    const {
      customer_id,
      listing_id,
      booking_date,
      start_time,
      end_time,
      status,
      total_amount
    } = req.body;

    // ADD THIS HERE TOO
    if (status && !validBookingStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Allowed values: PENDING, CONFIRMED, IN_TRANSIT, COMPLETED, CANCELLED"
      });
    }

    const { data, error } = await supabase
      .from("booking")
      .update({
        customer_id,
        listing_id,
        booking_date,
        start_time,
        end_time,
        status,
        total_amount
      })
      .eq("booking_id", id)
      .select("*")
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      booking: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Delete booking
async function deleteBooking(req, res) {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("booking")
      .delete()
      .eq("booking_id", id);

    if (error) throw error;

    return res.json({
      success: true,
      message: "Booking deleted successfully"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking
};