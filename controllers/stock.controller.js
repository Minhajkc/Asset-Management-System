const Asset = require("../models/asset.model");
const Issue = require("../models/issue.model");
const Scrap = require("../models/scrap.model");
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
        const branchTotals = {};

        for (const asset of assets) {
            const issuedQuantity = await Issue.sum("quantity", {
                where: {
                    asset_id: asset.id,
                    status: "Issued"
                }
            }) || 0;

          


            const scrappedQuantity = await Scrap.sum("quantity", {
                where: {
                    asset_id: asset.id
                }
            }) || 0;

          
            const availableQuantity =
                asset.quantity - issuedQuantity - scrappedQuantity;

       
            const totalValue =  availableQuantity * Number(asset.purchase_cost);

            grandTotalValue += totalValue;

            const stockItem = {
                ...asset.toJSON(),
                issuedQuantity,
                scrappedQuantity,
                availableQuantity,
                totalValue
            };

            stockData.push(stockItem);

       



            if (!branchTotals[asset.branch]) {
                branchTotals[asset.branch] = {
                    totalAssets: 0,
                    issuedAssets: 0,

                    scrappedAssets: 0,

                    availableAssets: 0,
                    totalValue: 0
                };
            }

            branchTotals[asset.branch].totalAssets += asset.quantity;
    branchTotals[asset.branch].issuedAssets += issuedQuantity;
        branchTotals[asset.branch].scrappedAssets += scrappedQuantity;
            branchTotals[asset.branch].availableAssets += availableQuantity;
            
            branchTotals[asset.branch].totalValue += totalValue;
        }

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