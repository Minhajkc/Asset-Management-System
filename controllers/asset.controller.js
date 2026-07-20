exports.index = (req, res) => {
    res.render("assets/index", {
        title: "Asset Master"
    });
};


const Asset = require("../models/asset.model");
const Category = require("../models/category.model");


exports.index = async (req, res) => {
    try {
        const assets = await Asset.findAll({
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

        await Asset.update(req.body, {
            where: { id }
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