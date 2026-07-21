const router = require("express").Router();
const issueController = require("../controllers/issue.controller");

router.get("/", issueController.index);
router.post("/create", issueController.create);
router.post("/update/:id", issueController.update);
router.post("/delete/:id", issueController.delete);

module.exports = router;