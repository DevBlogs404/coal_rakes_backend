const { Router } = require("express");
const {
  createRecord,
  getAllRecords,
} = require("../controllers/records/recordsController");

const router = Router();

router.post("/create-record", createRecord);

router.get("/all-records", getAllRecords);

module.exports = router;
