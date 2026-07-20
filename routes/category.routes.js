const router = require("express").Router();
const categoryController = require("../controllers/category.controller");

router.get("/", categoryController.index);
router.post("/create", categoryController.create);
router.post("/update/:id", categoryController.update);
router.post("/delete/:id", categoryController.delete);

module.exports = router;