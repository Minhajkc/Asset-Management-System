

const { Op } = require("sequelize");
const Asset = require("../models/asset.model");
const Category = require("../models/category.model");



exports.index = async (req, res) => {
    try {
        const assets = await Asset.findAll({
             where: {
                status: { [Op.ne]: "Scrapped" }
            },
            include: [{ model: Category }],
            order: [["createdAt", "DESC"]]
        });

        console.log(assets)




        const categories = await Category.findAll({
            where: { status: "Active" },
            order: [["category_name", "ASC"]]
        });

        res.render("assets/index", {
            title: "Asset Master",
            assets,
            categories
        });


    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};


exports.create = async (req, res) => {
    console.log(req.body,'this is data')
    try {
        const {
            asset_code,
            asset_name,


            category_id,
              branch,
            brand,
            model,
            serial_number,
            purchase_date,
            purchase_cost,
            quantity,
            status
        } = req.body;

        await Asset.create({
            asset_code,
            asset_name,
            category_id,
            branch,
            brand,
            model,
            serial_number,
            purchase_date,
            purchase_cost,
            quantity,
            status
        });

        res.redirect("/asset_master");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};


exports.update = async (req, res) => {
    try {
        const { id } = req.params;

        const existingAsset = await Asset.findByPk(id);
        if (!existingAsset) {
            return res.status(404).send("Asset not found in the db");
        }

        if (existingAsset.status === "Scrapped" ) {
            return res.status(400).send("You cannot modify a scrapped item");
        }

        await Asset.update(req.body, {
            where: { id },
        });

        res.redirect("/asset_master");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};


exports.delete = async (req, res) => {
    try {




        const { id } = req.params;

        await Asset.destroy({
            where: { id }
        });

        res.redirect("/asset_master");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};