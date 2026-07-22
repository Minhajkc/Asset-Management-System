const router = require("express").Router();
const returnController = require("../controllers/return.controller");

router.get("/", returnController.index);
router.post("/:id", returnController.returnAsset);

module.exports = router;