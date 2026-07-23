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
        res.status(500).send("Server error");
    }
};


exports.returnAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const { return_date, return_reason } = req.body;

         if (!return_date || !return_reason) {
            return res.status(400).send("Return date and reason ss required");
        }

        const issue = await Issue.findByPk(id);

          if (!issue) {
            return res.status(404).send("Issue record not found");
        }
          if (issue.status === "Returned") {
            return res.status(400).send("This assetalready returned");
        }
        await issue.update({
            status: "Returned",
            return_date,
            return_reason
        });

        res.redirect("/return_asset");

    } catch (error) {
        console.error(error);
        res.status(500).send("Servererror");
    }
};