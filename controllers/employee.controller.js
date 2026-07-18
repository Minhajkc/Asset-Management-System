const Employee = require("../models/employee.model");


exports.index = async (req, res) => {

    try {

        const employees = await Employee.findAll({
            order: [["id", "DESC"]]
        });

        res.render("employees/index", {
            title: "Employee Master",
            employees
        });

    } catch (err) {

        console.error(err);

        res.render("employees/index", {
            title: "Employee Master",
            employees: []
        });

    }

};

exports.store = async (req, res) => {
    console.log(req.body)

    try {

        await Employee.create(req.body);

        res.redirect("/employee_master");

    } catch (err) {

        console.log(err);

        res.redirect("/employee_master");

    }

};