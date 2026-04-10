const supabase = require("../db/supabase");

// Create a message
async function createMessage(req, res) {
  try {
    const {
      sender_id,
      receiver_id,
      content,
      sent_at,
      is_read
    } = req.body;

    if (
      !sender_id ||
      !receiver_id ||
      !content ||
      !sent_at ||
      is_read === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: sender_id, receiver_id, content, sent_at, is_read"
      });
    }

    const { data, error } = await supabase
      .from("message")
      .insert([
        {
          sender_id,
          receiver_id,
          content,
          sent_at,
          is_read
        }
      ])
      .select("*")
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      message_record: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get all messages
async function getAllMessages(req, res) {
  try {
    const { data, error } = await supabase
      .from("message")
      .select("*");

    if (error) throw error;

    return res.json({
      success: true,
      messages: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get message by ID
async function getMessageById(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("message")
      .select("*")
      .eq("message_id", id)
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      message_record: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Update message
async function updateMessage(req, res) {
  try {
    const { id } = req.params;
    const {
      sender_id,
      receiver_id,
      content,
      sent_at,
      is_read
    } = req.body;

    const { data, error } = await supabase
      .from("message")
      .update({
        sender_id,
        receiver_id,
        content,
        sent_at,
        is_read
      })
      .eq("message_id", id)
      .select("*")
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      message_record: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Delete message
async function deleteMessage(req, res) {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("message")
      .delete()
      .eq("message_id", id);

    if (error) throw error;

    return res.json({
      success: true,
      message: "Message deleted successfully"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage
};