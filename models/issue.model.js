const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Employee = require("./employee.model");
const Asset = require("./asset.model");

const Issue = sequelize.define("Issue", {
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: "id"
        }
    },

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
        allowNull: false,
        defaultValue: 1
    },

    issue_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    return_reason: {
    type: DataTypes.ENUM("Upgrade", "Repair", "Resignation", "Other"),
    allowNull: true
},

    remarks: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    status: {
        type: DataTypes.ENUM("Issued", "Returned"),
        defaultValue: "Issued"
    }
    

}, {
    timestamps: true
});


Employee.hasMany(Issue, { foreignKey: "employee_id" });
Issue.belongsTo(Employee, { foreignKey: "employee_id" });

Asset.hasMany(Issue, { foreignKey: "asset_id" });
Issue.belongsTo(Asset, { foreignKey: "asset_id" });

module.exports = Issue;