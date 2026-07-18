const router = require("express").Router();
const employeeController = require("../controllers/employee.controller");

router.get("/", employeeController.index);
router.post("/", employeeController.store);

module.exports = router;