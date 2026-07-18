const router = require("express").Router();
const scrapController = require("../controllers/scrap.controller");

router.get("/", scrapController.index);

module.exports = router;