const express = require("express");
const router = express.Router();

const {
  createProgressTracker,
  getAllProgressTrackers,
  getProgressTrackerById,
  updateProgressTracker,
  deleteProgressTracker
} = require("../controllers/progressTrackerController");

router.get("/", getAllProgressTrackers);
router.get("/:id", getProgressTrackerById);
router.post("/", createProgressTracker);
router.put("/:id", updateProgressTracker);
router.delete("/:id", deleteProgressTracker);

module.exports = router;