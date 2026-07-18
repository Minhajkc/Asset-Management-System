const router = require("express").Router();
const returnController = require("../controllers/return.controller");

router.get("/", returnController.index);

module.exports = router;