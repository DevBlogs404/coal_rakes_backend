const { Router } = require("express");
const {
  createRake,
  getAllRakes,
  updateRake,
  deleteRake,
} = require("../controllers/rakes/rakesController");

const router = Router();

router.post("/create-rake", createRake);

router.get("/all-rakes", getAllRakes);

router.put("/update-rake/:id", updateRake);

router.delete("/delete-rake/:id", deleteRake);

module.exports = router;
