const router = require("express").Router();
const categoryController = require("../controllers/category.controller");

router.get("/", categoryController.index);

module.exports = router;