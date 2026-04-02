const express = require("express");
const router = express.Router();

const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview
} = require("../controllers/reviewController");

router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.post("/", createReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;