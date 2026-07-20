const router = require("express").Router();
const assetController = require("../controllers/asset.controller");

router.get("/", assetController.index);
router.post("/create", assetController.create);
router.post("/update/:id", assetController.update);
router.post("/delete/:id", assetController.delete);

module.exports = router;