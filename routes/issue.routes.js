const router = require("express").Router();
const issueController = require("../controllers/issue.controller");

router.get("/", issueController.index);
router.post("/create", issueController.create);


module.exports = router;