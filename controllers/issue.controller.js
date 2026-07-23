const Issue = require("../models/issue.model");
const Employee = require("../models/employee.model");
const Asset = require("../models/asset.model");

exports.index = async (req, res) => {
    try {
        const issues = await Issue.findAll({
            where: { status: "Issued" },
            include: [Employee, Asset],
            order: [["createdAt", "DESC"]]
        });

        const employees = await Employee.findAll({
            where: { status: "Active" }
        });

        const assets = await Asset.findAll({
            where: { status: "Active" }
        });

        res.render("issue/index", {
            title: "Issue Asset",
            issues,
            employees,
            assets
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

exports.create = async (req, res) => {
    try {
        const { employee_id, asset_id, quantity, issue_date, remarks } = req.body;

        if (!employee_id || !asset_id || !quantity || !issue_date) {
            return res.status(400).send("Required fieldsmissing");
        }
         const employee = await Employee.findByPk(employee_id);
        if (!employee || employee.status !== "Active") {
            return res.status(400).send("Invalid employee ");
        }

        const asset = await Asset.findByPk(asset_id);
        if (!asset || asset.status !== "Active") {
            return res.status(400).send("Invalid asset selected");
        }

        if (!asset) {
            return res.send("Asset not found");
        }

        const issuedQty = await Issue.sum("quantity", {
            where: {
                asset_id,
                status: "Issued"
            }
        }) || 0;

        const availableStock = asset.quantity - issuedQty;

        if (parseInt(quantity) > availableStock) {
            return res.send(`Only ${availableStock} items available in stock`);
        }

        await Issue.create({
            employee_id,
            asset_id,
            quantity,
            issue_date,
            remarks
        });

        res.redirect("/issue_asset");

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};