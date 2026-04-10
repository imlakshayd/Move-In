const express = require("express");
const router = express.Router();

const {
  createServiceListing,
  getAllServiceListings,
  getServiceListingById,
  updateServiceListing,
  deleteServiceListing
} = require("../controllers/serviceListingController");

router.get("/", getAllServiceListings);
router.get("/:id", getServiceListingById);
router.post("/", createServiceListing);
router.put("/:id", updateServiceListing);
router.delete("/:id", deleteServiceListing);

module.exports = router;