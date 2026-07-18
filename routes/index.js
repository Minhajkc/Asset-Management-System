const router = require("express").Router();

router.use("/", require("./dashboard.routes"));
router.use("/employee_master", require("./employee.routes"));
router.use("/asset_master", require("./asset.routes"));
router.use("/asset_categories", require("./category.routes"));
router.use("/stock_view", require("./stock.routes"));
router.use("/issue_asset", require("./issue.routes"));
router.use("/return_asset", require("./return.routes"));
router.use("/scrap_asset", require("./scrap.routes"));
router.use("/asset_history", require("./history.routes"));

module.exports = router;