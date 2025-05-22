const express = require("express");
const {
    addData,
    viewData,
    updateData,
    deleteData
} = require("../controller/dataController");

const router = express.Router();

router.post("/addData", addData);
router.get("/", viewData);
router.put("/:id", updateData);
router.delete("/:id", deleteData);

module.exports = router;
