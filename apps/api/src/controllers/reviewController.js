const supabase = require("../db/supabase");

// Create a review
async function createReview(req, res) {
  try {
    const {
      booking_id,
      reviewer_id,
      reviewee_id,
      rating,
      comment,
      is_verified
    } = req.body;

    if (
      !booking_id ||
      !reviewer_id ||
      !reviewee_id ||
      rating === undefined ||
      is_verified === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: booking_id, reviewer_id, reviewee_id, rating, is_verified"
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
      });
    }

    const { data, error } = await supabase
      .from("review")
      .insert([
        {
          booking_id,
          reviewer_id,
          reviewee_id,
          rating,
          comment,
          is_verified
        }
      ])
      .select("*")
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      review: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get all reviews
async function getAllReviews(req, res) {
  try {
    const { data, error } = await supabase
      .from("review")
      .select("*");

    if (error) throw error;

    return res.json({
      success: true,
      reviews: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get review by ID
async function getReviewById(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("review")
      .select("*")
      .eq("review_id", id)
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      review: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Update review
async function updateReview(req, res) {
  try {
    const { id } = req.params;
    const {
      booking_id,
      reviewer_id,
      reviewee_id,
      rating,
      comment,
      is_verified
    } = req.body;

    if (rating !== undefined && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
      });
    }

    const { data, error } = await supabase
      .from("review")
      .update({
        booking_id,
        reviewer_id,
        reviewee_id,
        rating,
        comment,
        is_verified
      })
      .eq("review_id", id)
      .select("*")
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      review: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Delete review
async function deleteReview(req, res) {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("review")
      .delete()
      .eq("review_id", id);

    if (error) throw error;

    return res.json({
      success: true,
      message: "Review deleted successfully"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview
};