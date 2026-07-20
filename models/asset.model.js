const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./category.model");

const Asset = sequelize.define("Asset", {
    asset_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    asset_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: "id"
        }
    },


    brand: {
        type: DataTypes.STRING
    },
    model: {
        type: DataTypes.STRING
    },
    serial_number: {
        type: DataTypes.STRING,
        unique: true
    },


    purchase_date: {
        type: DataTypes.DATEONLY
    },
    purchase_cost: {
        type: DataTypes.DECIMAL(10, 2)
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    status: {
        type: DataTypes.ENUM("Active", "Inactive"),
        defaultValue: "Active"
    }

}, {
    timestamps: true
});

Category.hasMany(Asset, { foreignKey: "category_id" });

Asset.belongsTo(Category, { foreignKey: "category_id" });

module.exports = Asset;