const supabase = require("../db/supabase");

// Create a notification
async function createNotification(req, res) {
  try {
    const { user_id, message, type, sent_at, is_read } = req.body;

    if (
      !user_id ||
      !message ||
      !type ||
      !sent_at ||
      is_read === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: user_id, message, type, sent_at, is_read"
      });
    }

    const { data, error } = await supabase
      .from("notification")
      .insert([
        {
          user_id,
          message,
          type,
          sent_at,
          is_read
        }
      ])
      .select("*")
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      notification: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get all notifications
async function getAllNotifications(req, res) {
  try {
    const { data, error } = await supabase
      .from("notification")
      .select("*");

    if (error) throw error;

    return res.json({
      success: true,
      notifications: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get notification by ID
async function getNotificationById(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("notification")
      .select("*")
      .eq("notification_id", id)
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      notification: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Update notification
async function updateNotification(req, res) {
  try {
    const { id } = req.params;
    const { user_id, message, type, sent_at, is_read } = req.body;

    const { data, error } = await supabase
      .from("notification")
      .update({
        user_id,
        message,
        type,
        sent_at,
        is_read
      })
      .eq("notification_id", id)
      .select("*")
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      notification: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Delete notification
async function deleteNotification(req, res) {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("notification")
      .delete()
      .eq("notification_id", id);

    if (error) throw error;

    return res.json({
      success: true,
      message: "Notification deleted successfully"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification
};