const router = require("express").Router();
const assetController = require("../controllers/asset.controller");

router.get("/", assetController.index);

module.exports = router;