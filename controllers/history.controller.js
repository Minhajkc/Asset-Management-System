const Asset = require("../models/asset.model");
const Issue = require("../models/issue.model");
const Scrap = require("../models/scrap.model");
const Employee = require("../models/employee.model");
const Category = require("../models/category.model");

exports.index = async (req, res) => {
    try {

        const assets = await Asset.findAll({
            include: [Category],
            order: [["createdAt", "DESC"]]
        });

        let history = [];

        for (const asset of assets) {

          
            history.push({
                asset_code: asset.asset_code,
                asset_name: asset.asset_name,
                category: asset.Category.category_name,
                transaction_type: "Purchased",
                employee: "-",
                quantity: asset.quantity,
                date: asset.purchase_date,
                reason: "Initial Purchase",
                cost: asset.purchase_cost
            });

           
            const issues = await Issue.findAll({
                where: { asset_id: asset.id },
                include: [Employee]
            });

            issues.forEach(issue => {

         
                history.push({
                    asset_code: asset.asset_code,
                    asset_name: asset.asset_name,
                    category: asset.Category.category_name,
                    transaction_type: "Issued",
                    employee: issue.Employee.employee_name,
                    quantity: issue.quantity,
                    date: issue.issue_date,
                    reason: issue.remarks || "-",
                    cost: asset.purchase_cost
                });

                if (issue.status === "Returned") {
                    history.push({
                        asset_code: asset.asset_code,
                        asset_name: asset.asset_name,
                        category: asset.Category.category_name,
                        transaction_type: "Returned",
                        employee: issue.Employee.employee_name,
                        quantity: issue.quantity,
                        date: issue.return_date,
                        reason: issue.return_reason || "-",
                        cost: asset.purchase_cost
                    });
                }
            });

         
            const scraps = await Scrap.findAll({
                where: { asset_id: asset.id }
            });

            scraps.forEach(scrap => {
                history.push({
                    asset_code: asset.asset_code,
                    asset_name: asset.asset_name,
                    category: asset.Category.category_name,
                    transaction_type: "Scrapped",
                    employee: "-",
                    quantity: scrap.quantity,
                    date: scrap.scrap_date,
                    reason: scrap.reason,
                    cost: asset.purchase_cost
                });
            });
        }

        history.sort((a, b) => new Date(a.date) - new Date(b.date));

        res.render("history/index", {
            title: "Asset History",
            history
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};