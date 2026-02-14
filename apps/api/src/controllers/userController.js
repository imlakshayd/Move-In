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

// Get all users

async function getAllUsers(req, res) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*");

    if (error) throw error;

    return res.json({ success: true, users: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}


// Get all vendors
async function getAllVendors(req, res) {
  try {
    const { data, error } = await supabase
      .from("vendor") // your table name
      .select("*");

    if (error) throw error;

    return res.json({ success: true, vendors: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

// Create a new user
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


// Create a Vendor
async function vendor(req, res) {
  try {
    const { user_id, business_name, business_license, is_verified } = req.body;

    if (!user_id || !business_name || !business_license || is_verified === undefined) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: user_id, business_name, business_license, is_verified",
      });
    }

    const { data, error } = await supabase
      .from("vendor")
      .insert([{ user_id, business_name, business_license, is_verified }])
      .select("*")
      .single();

    if (error) throw error;

    return res.status(201).json({ success: true, vendor: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

// Create a Vehicle Owner
async function vehicle_owner(req, res) {
  try {
    const { user_id, drivers_license, insurance_info, documents_verified } = req.body;

    if (!user_id || !drivers_license || !insurance_info || documents_verified === undefined) {
      return res.status(400).json({
        success: false,
        message:
          "Sorry, missing required fields: user_id, drivers_license, insurance_info, documents_verified",
      });
    }

    const { data, error } = await supabase
      .from("vehicle_owner")
      .insert([{ user_id, drivers_license, insurance_info, documents_verified }])
      .select("*")
      .single();

    if (error) throw error;

    return res.status(201).json({ success: true, vehicle_owner: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

// Get all vechicle owners
async function getAllVehicleOwner(req, res) {
  try {
    const { data, error } = await supabase
      .from("vehicle_owner") 
      .select("*");

    if (error) throw error;

    return res.json({ success: true, vehicle_owners: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

// Create a Manager
async function manager(req, res) {
  try {
    const { user_id, department } = req.body;

    if (!user_id || !department) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: user_id, department",
      });
    }

    const { data, error } = await supabase
      .from("manager")
      .insert([{ user_id, department }])
      .select("*")
      .single();

    if (error) throw error;

    return res.status(201).json({ success: true, manager: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

// Get all managers
async function getAllManagers(req, res) {
  try {
    const { data, error } = await supabase
      .from("manager") // your table name
      .select("*");

    if (error) throw error;

    return res.json({ success: true, managers: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

// Create a Support Staff
async function support_staff(req, res) {
  try {
    const { user_id, department } = req.body; 

    if (!user_id || !department) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: user_id, department",
      });
    }

    const { data, error } = await supabase
      .from("support_staff")
      .insert([{ user_id, department }])
      .select("*")
      .single();

    if (error) throw error;

    return res.status(201).json({ success: true, support_staff: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

// Get all support staff
async function getAllSupportStaff(req, res) {
  try {
    const { data, error } = await supabase
      .from("support_staff") 
      .select("*");

    if (error) throw error;

    return res.json({ success: true, support_staff: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { locateUserById, registerNewUser, vendor, vehicle_owner, manager, support_staff, getAllVendors, getAllUsers, getAllVehicleOwner, getAllManagers, getAllSupportStaff };