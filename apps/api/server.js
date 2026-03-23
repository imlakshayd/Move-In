const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = require("./src/db/supabase");

// Import routes
const userRoutes = require("./src/routes/userRoutes");
app.use("/users", userRoutes);

const bookingRoutes = require("./src/routes/bookingRoutes");
app.use("/bookings", bookingRoutes);

const listingRoutes = require("./src/routes/listingRoutes");
app.use("/listings", listingRoutes);

const vehicleListingRoutes = require("./src/routes/vehicleListingRoutes");
app.use("/vehicle-listings", vehicleListingRoutes);

const serviceListingRoutes = require("./src/routes/serviceListingRoutes");
app.use("/service-listings", serviceListingRoutes);

const progressTrackerRoutes = require("./src/routes/progressTrackerRoutes");
app.use("/progress-trackers", progressTrackerRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/test-db", async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*').limit(1);
    if (error) throw error;
    res.json({ status: "success", data });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});