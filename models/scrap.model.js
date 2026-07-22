const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Asset = require("./asset.model");

const Scrap = sequelize.define("Scrap", {
    asset_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Asset,
            key: "id"
        }
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    scrap_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    reason: {
        type: DataTypes.TEXT,
        allowNull: false
    }

}, {
    timestamps: true
});

Asset.hasMany(Scrap, { foreignKey: "asset_id" });
Scrap.belongsTo(Asset, { foreignKey: "asset_id" });

module.exports = Scrap;