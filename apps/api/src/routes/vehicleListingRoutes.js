const express = require("express");
const router = express.Router();

const {
  createVehicleListing,
  getAllVehicleListings,
  getVehicleListingById,
  updateVehicleListing,
  deleteVehicleListing
} = require("../controllers/vehicleListingController");

router.get("/", getAllVehicleListings);
router.get("/:id", getVehicleListingById);
router.post("/", createVehicleListing);
router.put("/:id", updateVehicleListing);
router.delete("/:id", deleteVehicleListing);

module.exports = router;