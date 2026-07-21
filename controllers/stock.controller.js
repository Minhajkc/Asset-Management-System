const Asset = require("../models/asset.model");
const Issue = require("../models/issue.model");
const Category = require("../models/category.model");

exports.index = async (req, res) => {
    try {
        const assets = await Asset.findAll({
            where: { status: "Active" },
            include: [{ model: Category, attributes: ["category_name"] }],
            order: [["createdAt", "DESC"]]
        });

        let grandTotalValue = 0;
        const stockData = [];

        for (const asset of assets) {
            const issuedQuantity = await Issue.sum("quantity", {
                where: { asset_id: asset.id, status: "Issued" }
            }) || 0;

            const availableQuantity = asset.quantity - issuedQuantity;
            const totalValue = availableQuantity * Number(asset.purchase_cost);

            grandTotalValue += totalValue;

            stockData.push({
                ...asset.toJSON(),
                issuedQuantity,
                availableQuantity,
                totalValue
            });
        }

        const branchTotals = {};

        stockData.forEach(asset => {
            if (!branchTotals[asset.branch]) {
                branchTotals[asset.branch] = {
                    totalAssets: 0,
                    issuedAssets: 0,
                    availableAssets: 0,
                    totalValue: 0
                };
            }
branchTotals[asset.branch].totalAssets += asset.quantity;
            branchTotals[asset.branch].issuedAssets += asset.issuedQuantity;
        branchTotals[asset.branch].availableAssets += asset.availableQuantity;



        console.log('here')
            branchTotals[asset.branch].totalValue += asset.totalValue;
        });

        res.render("stock/index", {
            title: "Stock View",
            assets: stockData,
            grandTotalValue,
            branchTotals
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};