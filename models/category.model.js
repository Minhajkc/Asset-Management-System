const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define("Category", {
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
         validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM("Active", "Inactive"),
        defaultValue: "Active"
    }
}, {
    timestamps: true
});

module.exports = Category;