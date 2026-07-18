const router = require("express").Router();
const issueController = require("../controllers/issue.controller");

router.get("/", issueController.index);

module.exports = router;