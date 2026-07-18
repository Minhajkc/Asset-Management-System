const router = require("express").Router();
const stockController = require("../controllers/stock.controller");

router.get("/", stockController.index);

module.exports = router;