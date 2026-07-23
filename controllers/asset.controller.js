

const { Op } = require("sequelize");
const Asset = require("../models/asset.model");
const Category = require("../models/category.model");



exports.index = async (req, res) => {
    try {

        const { category, search } = req.query;

        const whereCondition = {
            status: { [Op.ne]: "Scrapped" }
        };
        if (category && category !== "") {
            whereCondition.category_id = category;
        }


        if (search && search.trim() !== "") {
            whereCondition[Op.or] = [
                { asset_code: { [Op.iLike]: `%${search}%` } },
                { asset_name: { [Op.iLike]: `%${search}%` } },

        { brand: { [Op.iLike]: `%${search}%` } },
                { model: { [Op.iLike]: `%${search}%` } },
                { serial_number: { [Op.iLike]: `%${search}%` } }
            ];
        }

        const assets = await Asset.findAll({
            where: whereCondition,
            include: [{ model: Category }],
            order: [["createdAt", "DESC"]]
        });

        const categories = await Category.findAll({
            where: { status: "Active" },
            order: [["category_name", "ASC"]]
        });

        res.render("assets/index", {
            title: "Asset Master",
            assets,
            categories,
            filters: {
                category: category || "",
                search: search || ""
            }
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


        if (!asset_code || !asset_name || !category_id || !branch) {
            return res.status(400).send("fields are missing");
        }

         const category = await Category.findByPk(category_id);

        if (!category) {
            return res.status(400).send("Invalid category ");
        }


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
        const asset = await Asset.findByPk(id);

        if (!asset) {
            return res.status(404).send("Asset not found");
        }

        if (asset.status === "Scrapped") {
            return res.status(400).send("Scrapped asset cannot delete");
        }

         await asset.destroy();

        res.redirect("/asset_master");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};