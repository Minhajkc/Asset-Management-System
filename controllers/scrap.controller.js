const Scrap = require("../models/scrap.model");
const Asset = require("../models/asset.model");
const Issue = require("../models/issue.model");

exports.index = async (req, res) => {
    try {

        const scraps = await Scrap.findAll({
            include: [Asset],
            order: [["createdAt", "DESC"]]
        });

        const assets = await Asset.findAll({
            where: { status: "Active" }
        });
        console.log(scraps)

        res.render("scrap/index", {
            title: "Scrap Asset",
            scraps,
            assets
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("ServerError");
    }
};

exports.create = async (req, res) => {
    try {

        const { asset_id, quantity, scrap_date, reason } = req.body;
         if (!asset_id || !quantity || !scrap_date || !reason) {
            return res.status(400).send("All fields are required");
        }

        const asset = await Asset.findByPk(asset_id);

        if (!asset) {
            return res.status(404).send("Asset not found");
        }

        const issuedQty = await Issue.sum("quantity", {
            where: {
                asset_id,
                status: "Issued"
            }
        }) || 0;

        const scrappedQty = await Scrap.sum("quantity", {
            where: { asset_id }
        }) || 0;

      
        const availableStock = asset.quantity - issuedQty - scrappedQty;
        console.log(availableStock,'avv')

        if (parseInt(quantity) > availableStock) {
            return res.send(`Only ${availableStock} items available for scrap`);
        }
        await Scrap.create({
            asset_id,
            quantity,
            scrap_date,
            reason
        });






        const totalScrapped = scrappedQty + parseInt(quantity);

        if (totalScrapped >= asset.quantity) {
            await asset.update({ status: "Scrapped" });
        }

        res.redirect("/scrap_asset");

    } catch (error) {
        console.error(error);
        res.status(500).send("Server on Error");
    }
};