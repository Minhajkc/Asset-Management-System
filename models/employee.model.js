const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Employee = sequelize.define("Employee", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },


    employee_code: {
        type: DataTypes.STRING,

        allowNull: false,
        unique: true,

         validate: {
            notEmpty: true
        }
    },
    
    employee_name: {
        type: DataTypes.STRING,
        allowNull: false,

         validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
         validate: {
            notEmpty: true,
            isNumeric: true,
            len: [10, 15]
        }
    },



    department: {
        type: DataTypes.STRING,
        allowNull: false,
         validate: {
            notEmpty: true
        }
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false,
         validate: {
            notEmpty: true
        }
    },
    joining_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("Active", "Inactive"),
        defaultValue: "Active"
    }
}, {
    tableName: "Employees",
    timestamps: true
});

module.exports = Employee;