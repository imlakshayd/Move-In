const express = require("express");
const router = express.Router();

const {
  createSearchFilter,
  getAllSearchFilters,
  getSearchFilterById,
  updateSearchFilter,
  deleteSearchFilter
} = require("../controllers/searchFilterController");

router.get("/", getAllSearchFilters);
router.get("/:id", getSearchFilterById);
router.post("/", createSearchFilter);
router.put("/:id", updateSearchFilter);
router.delete("/:id", deleteSearchFilter);

module.exports = router;