const supabase = require("../db/supabase");

// Create a vehicle listing
async function createVehicleListing(req, res) {
  try {
    const {
      listing_id,
      vehicle_type,
      vehicle_model,
      capacity,
      insurance_status,
      photos
    } = req.body;

    if (
      !listing_id ||
      !vehicle_type ||
      !vehicle_model ||
      capacity === undefined ||
      !insurance_status ||
      !photos
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Sorry, missing required fields: listing_id, vehicle_type, vehicle_model, capacity, insurance_status, photos"
      });
    }

    const { data, error } = await supabase
      .from("vehicle_listing")
      .insert([
        {
          listing_id,
          vehicle_type,
          vehicle_model,
          capacity,
          insurance_status,
          photos
        }
      ])
      .select("*")
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      vehicle_listing: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get all vehicle listings
async function getAllVehicleListings(req, res) {
  try {
    const { data, error } = await supabase
      .from("vehicle_listing")
      .select("*");

    if (error) throw error;

    return res.json({
      success: true,
      vehicle_listings: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get vehicle listing by listing ID
async function getVehicleListingById(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("vehicle_listing")
      .select("*")
      .eq("listing_id", id)
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      vehicle_listing: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Update vehicle listing
async function updateVehicleListing(req, res) {
  try {
    const { id } = req.params;
    const {
      vehicle_type,
      vehicle_model,
      capacity,
      insurance_status,
      photos
    } = req.body;

    const { data, error } = await supabase
      .from("vehicle_listing")
      .update({
        vehicle_type,
        vehicle_model,
        capacity,
        insurance_status,
        photos
      })
      .eq("listing_id", id)
      .select("*")
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      vehicle_listing: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Delete vehicle listing
async function deleteVehicleListing(req, res) {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("vehicle_listing")
      .delete()
      .eq("listing_id", id);

    if (error) throw error;

    return res.json({
      success: true,
      message: "The vehicle listing has been deleted successfully"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = {
  createVehicleListing,
  getAllVehicleListings,
  getVehicleListingById,
  updateVehicleListing,
  deleteVehicleListing
};