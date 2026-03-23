const supabase = require("../db/supabase");

// Create a new listing
async function createListing(req, res) {
  try {
    const {
      owner_id,
      title,
      description,
      base_price,
      location,
      is_active
    } = req.body;

    if (
      !owner_id ||
      !title ||
      !description ||
      base_price === undefined ||
      !location ||
      is_active === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: owner_id, title, description, base_price, location, is_active"
      });
    }

    const { data, error } = await supabase
      .from("listing")
      .insert([
        {
          owner_id,
          title,
          description,
          base_price,
          location,
          is_active
        }
      ])
      .select("*")
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      listing: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get all listings
async function getAllListings(req, res) {
  try {
    const { data, error } = await supabase
      .from("listing")
      .select("*");

    if (error) throw error;

    return res.json({
      success: true,
      listings: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get listing by ID
async function getListingById(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("listing")
      .select("*")
      .eq("listing_id", id)
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      listing: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Update listing
async function updateListing(req, res) {
  try {
    const { id } = req.params;
    const {
      owner_id,
      title,
      description,
      base_price,
      location,
      is_active
    } = req.body;

    const { data, error } = await supabase
      .from("listing")
      .update({
        owner_id,
        title,
        description,
        base_price,
        location,
        is_active,
        updated_at: new Date().toISOString()
      })
      .eq("listing_id", id)
      .select("*")
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      listing: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Delete listing
async function deleteListing(req, res) {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("listing")
      .delete()
      .eq("listing_id", id);

    if (error) throw error;

    return res.json({
      success: true,
      message: "Listing has been deleted successfully"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing
};