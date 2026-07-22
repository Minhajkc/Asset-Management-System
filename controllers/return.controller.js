const Issue = require("../models/issue.model");
const Employee = require("../models/employee.model");
const Asset = require("../models/asset.model");


exports.index = async (req, res) => {
    try {
        const issuedAssets = await Issue.findAll({
    where: { status: "Issued" },
            include: [Employee, Asset],
            order: [["createdAt", "DESC"]]
        });

        res.render("returns/index", {
            title: "Return Asset",
            issuedAssets
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};


exports.returnAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const { return_date, return_reason } = req.body;

        const issue = await Issue.findByPk(id);

        if (!issue) {
            return res.send("Issue record not found");
        }

        await issue.update({
            status: "Returned",
            return_date,
            return_reason
        });

        res.redirect("/return_asset");

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};