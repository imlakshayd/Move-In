const supabase = require("../db/supabase");

// Create a search filter
async function createSearchFilter(req, res) {
  try {
    const {
      user_id,
      vehicle_type,
      min_price,
      max_price,
      start_date,
      end_date,
      location,
      distance_radius
    } = req.body;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "Missing required field: user_id"
      });
    }

    const { data, error } = await supabase
      .from("search_filter")
      .insert([
        {
          user_id,
          vehicle_type,
          min_price,
          max_price,
          start_date,
          end_date,
          location,
          distance_radius
        }
      ])
      .select("*")
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      search_filter: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get all search filters
async function getAllSearchFilters(req, res) {
  try {
    const { data, error } = await supabase
      .from("search_filter")
      .select("*");

    if (error) throw error;

    return res.json({
      success: true,
      search_filters: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get search filter by ID
async function getSearchFilterById(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("search_filter")
      .select("*")
      .eq("filter_id", id)
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      search_filter: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Update search filter
async function updateSearchFilter(req, res) {
  try {
    const { id } = req.params;
    const {
      user_id,
      vehicle_type,
      min_price,
      max_price,
      start_date,
      end_date,
      location,
      distance_radius
    } = req.body;

    const { data, error } = await supabase
      .from("search_filter")
      .update({
        user_id,
        vehicle_type,
        min_price,
        max_price,
        start_date,
        end_date,
        location,
        distance_radius
      })
      .eq("filter_id", id)
      .select("*")
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      search_filter: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Delete search filter
async function deleteSearchFilter(req, res) {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("search_filter")
      .delete()
      .eq("filter_id", id);

    if (error) throw error;

    return res.json({
      success: true,
      message: "Search filter deleted successfully"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = {
  createSearchFilter,
  getAllSearchFilters,
  getSearchFilterById,
  updateSearchFilter,
  deleteSearchFilter
};