const { Router } = require("express");
const {
  createSiding,
  getAllSidings,
  updateSiding,
} = require("../controllers/siding/sidingController");

const router = Router();

router.post("/create-siding", createSiding);
router.get("/all-sidings", getAllSidings);
router.get("/update-siding/:id", updateSiding);

module.exports = router;
