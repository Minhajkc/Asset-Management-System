exports.index = (req, res) => {
    res.render("categories/index", {
        title: "Asset Categories"
    });
};

const Category = require("../models/category.model");


exports.index = async (req, res) => {
    try {
        const categories = await Category.findAll({
            order: [["createdAt", "DESC"]]
        });

        res.render("categories/index", {
            title: "Asset Categories",
            categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Serveris Error");
    }
};


exports.create = async (req, res) => {
    console.log(req.body,'dagttt')
    try {
        const { category_name, description, status } = req.body;

        await Category.create({
            category_name,
            description,
            status
        });

        res.redirect("/asset_categories");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server is Error");
    }
};


exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id,'this is id')
        const { category_name, description, status } = req.body;

        await Category.update(
            { category_name, description, status },
            { where: { id } }
        );

        res.redirect("/asset_categories");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};


exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        await Category.destroy({
            where: { id }
        });

        res.redirect("/asset_categories");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};