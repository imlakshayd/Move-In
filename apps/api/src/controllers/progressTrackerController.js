const supabase = require("../db/supabase");

// Create a progress tracker
async function createProgressTracker(req, res) {
  try {
    const { booking_id, current_stage, stage_timestamps } = req.body;

    if (!booking_id || !current_stage || !stage_timestamps) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: booking_id, current_stage, stage_timestamps"
      });
    }

    const { data, error } = await supabase
      .from("progress_tracker")
      .insert([
        {
          booking_id,
          current_stage,
          stage_timestamps
        }
      ])
      .select("*")
      .maybeSingle();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    return res.status(201).json({
      success: true,
      progress_tracker: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get all progress trackers
async function getAllProgressTrackers(req, res) {
  try {
    const { data, error } = await supabase
      .from("progress_tracker")
      .select("*");

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    return res.json({
      success: true,
      progress_trackers: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get progress tracker by ID
async function getProgressTrackerById(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("progress_tracker")
      .select("*")
      .eq("tracker_id", id)
      .maybeSingle();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Progress tracker not found"
      });
    }

    return res.json({
      success: true,
      progress_tracker: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Update progress tracker
async function updateProgressTracker(req, res) {
  try {
    const { id } = req.params;
    const { booking_id, current_stage, stage_timestamps } = req.body;

    const updateData = {};

    if (booking_id !== undefined) updateData.booking_id = booking_id;
    if (current_stage !== undefined) updateData.current_stage = current_stage;
    if (stage_timestamps !== undefined) updateData.stage_timestamps = stage_timestamps;

    const { data, error } = await supabase
      .from("progress_tracker")
      .update(updateData)
      .eq("tracker_id", id)
      .select("*")
      .maybeSingle();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Progress tracker not found"
      });
    }

    return res.json({
      success: true,
      progress_tracker: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Delete progress tracker
async function deleteProgressTracker(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("progress_tracker")
      .delete()
      .eq("tracker_id", id)
      .select("*")
      .maybeSingle();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Progress tracker not found"
      });
    }

    return res.json({
      success: true,
      message: "Progress tracker deleted successfully"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = {
  createProgressTracker,
  getAllProgressTrackers,
  getProgressTrackerById,
  updateProgressTracker,
  deleteProgressTracker
};