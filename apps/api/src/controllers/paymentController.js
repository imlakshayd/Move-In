const supabase = require("../db/supabase");

// Create a payment
async function createPayment(req, res) {
  try {
    const {
      booking_id,
      amount,
      status,
      transaction_id,
      payment_date,
      payment_method
    } = req.body;

    if (
      !booking_id ||
      amount === undefined ||
      !status ||
      !transaction_id ||
      !payment_date ||
      !payment_method
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: booking_id, amount, status, transaction_id, payment_date, payment_method"
      });
    }

    const { data, error } = await supabase
      .from("payment")
      .insert([
        {
          booking_id,
          amount,
          status,
          transaction_id,
          payment_date,
          payment_method
        }
      ])
      .select("*")
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      payment: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get all payments
async function getAllPayments(req, res) {
  try {
    const { data, error } = await supabase
      .from("payment")
      .select("*");

    if (error) throw error;

    return res.json({
      success: true,
      payments: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get payment by ID
async function getPaymentById(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("payment")
      .select("*")
      .eq("payment_id", id)
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      payment: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Update payment
async function updatePayment(req, res) {
  try {
    const { id } = req.params;
    const {
      booking_id,
      amount,
      status,
      transaction_id,
      payment_date,
      payment_method
    } = req.body;

    const { data, error } = await supabase
      .from("payment")
      .update({
        booking_id,
        amount,
        status,
        transaction_id,
        payment_date,
        payment_method
      })
      .eq("payment_id", id)
      .select("*")
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      payment: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Delete payment
async function deletePayment(req, res) {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("payment")
      .delete()
      .eq("payment_id", id);

    if (error) throw error;

    return res.json({
      success: true,
      message: "Payment deleted successfully"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment
};