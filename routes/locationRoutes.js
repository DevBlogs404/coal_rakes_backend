const { Router } = require("express");
const {
  createLocation,
  getLocation,
} = require("../controllers/location/locationController");

const router = Router();

router.post("/create-location", createLocation);
router.get("/all-locations", getLocation);

module.exports = router;
