const router = require("express").Router();


const scrapController = require("../controllers/scrap.controller");

router.get("/", scrapController.index);

router.post("/create", scrapController.create);

module.exports = router;