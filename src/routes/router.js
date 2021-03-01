const express = require("express");
const router = express.Router();

const {
  create,
  read,
  readOne,
  update,
  deletOne,
  deleteAll,
} = require("../controllers/cat.controller");
router.post("/post", create);
router.get("/get", read);
router.get("/get/:id", readOne);
router.put("/update/:id", update);
router.purge("/delete", deleteAll);
router.delete("/delete/:id", deletOne);

module.exports = router;
