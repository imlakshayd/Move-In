const supabase = require("../db/supabase");

// Create a service listing
async function createServiceListing(req, res) {
  try {
    const {
      listing_id,
      service_type,
      crew_size,
      equipment_provided
    } = req.body;

    if (
      !listing_id ||
      !service_type ||
      crew_size === undefined ||
      !equipment_provided
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: listing_id, service_type, crew_size, equipment_provided"
      });
    }

    const { data, error } = await supabase
      .from("service_listing")
      .insert([
        {
          listing_id,
          service_type,
          crew_size,
          equipment_provided
        }
      ])
      .select("*")
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      service_listing: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get all service listings
async function getAllServiceListings(req, res) {
  try {
    const { data, error } = await supabase
      .from("service_listing")
      .select("*");

    if (error) throw error;

    return res.json({
      success: true,
      service_listings: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get service listing by listing ID
async function getServiceListingById(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("service_listing")
      .select("*")
      .eq("listing_id", id)
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      service_listing: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Update service listing
async function updateServiceListing(req, res) {
  try {
    const { id } = req.params;
    const {
      service_type,
      crew_size,
      equipment_provided
    } = req.body;

    const { data, error } = await supabase
      .from("service_listing")
      .update({
        service_type,
        crew_size,
        equipment_provided
      })
      .eq("listing_id", id)
      .select("*")
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      service_listing: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Delete service listing
async function deleteServiceListing(req, res) {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("service_listing")
      .delete()
      .eq("listing_id", id);

    if (error) throw error;

    return res.json({
      success: true,
      message: "Service listing deleted successfully"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = {
  createServiceListing,
  getAllServiceListings,
  getServiceListingById,
  updateServiceListing,
  deleteServiceListing
};