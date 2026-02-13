const supabase = require("../db/supabase");

// Get the user by ID from the users table
async function locateUserById(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", id)
      .single();

    if (error) throw error;

    return res.json({ success: true, user: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

// Create a row in users
async function registerNewUser(req, res) {
  try {
    const {
      email, password, phone_number, first_name, last_name, role } = req.body;

    // Basic validation
    if (!email || !password || !phone_number || !first_name || !last_name || !role) {
      return res.status(400).json({
        success: false,
        message:
          "Sorry, missing required fields: email, password, phone_number, first_name, last_name, role"
      });
    }

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          email, password, phone_number, first_name, last_name, role
          
        }
      ])
      .select("*")
      .single();

    if (error) throw error;

    return res.status(201).json({ success: true, user: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { locateUserById, registerNewUser };
