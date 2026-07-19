const router = require("express").Router();
const employeeController = require("../controllers/employee.controller");

router.get("/", employeeController.index);
router.post("/", employeeController.store);
router.post("/update/:id", employeeController.update);

module.exports = router;