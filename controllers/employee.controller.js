const Employee = require("../models/employee.model");
const { Op, fn, col, where } = require("sequelize");

exports.index = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;
        const offset = (page - 1) * limit;

        const search = (req.query.search || "").trim().toLowerCase();
        const status = req.query.status || "";

        const whereCondition = {};

        if (search) {
            whereCondition[Op.or] = [
                where(fn("LOWER", col("employee_code")), { [Op.like]: `%${search}%` }),


                where(fn("LOWER", col("employee_name")), { [Op.like]: `%${search}%` }),
                where(fn("LOWER", col("email")), { [Op.like]: `%${search}%` }),

                where(fn("LOWER", col("mobile")), { [Op.like]: `%${search}%` }),
                where(fn("LOWER", col("department")), { [Op.like]: `%${search}%` }),
                where(fn("LOWER", col("designation")), { [Op.like]: `%${search}%` })
            ];
        }

        if (status) {
            whereCondition.status = status;
        }

        const { count, rows } = await Employee.findAndCountAll({
            where: whereCondition,
            order: [["id", "DESC"]],
            limit,
            offset
        });

        const totalPages = Math.ceil(count / limit) || 1;

        res.render("employees/index", {
            title: "Employee Master",
            employees: rows,
            currentPage: page,
            totalPages,


            search: req.query.search || "",
            status,
            limit
        });
    } catch (err) {
        console.error(err);

        res.render("employees/index", {
            title: "Employee Master",
            employees: [],
            currentPage: 1,
            totalPages: 1,
            search: "",
            status: "",
            limit: 5
        });
    }
};

exports.store = async (req, res) => {
    try {
          const {
            employee_code,
            employee_name,
            email,
            mobile,
            department,
            designation,
            joining_date,
            status
        } = req.body;

        if (
            !employee_code ||
            !employee_name ||
            !email ||
            !mobile ||
            !department ||
            !designation ||
            !joining_date
        ) {
            return res.status(400).send("All required fieldsneed filled");
        }


       await Employee.create({
            employee_code: employee_code.trim(),
            employee_name: employee_name.trim(),
            email: email.trim(),
            mobile: mobile.trim(),


        department: department.trim(),
            designation: designation.trim(),
            joining_date,
            status
        });

        res.redirect("/employee_master");
    } catch (err) {
        console.error(err);
        res.redirect("/employee_master");
    }
};

exports.update = async (req, res) => {
    console.log(req.params.id)
    try {
        const { id } = req.params;
        const { id: bodyId, ...employeeData } = req.body;

         const employee = await Employee.findByPk(id);


        if (!employee) {
            return res.status(404).send("Employee not found");
        }

        await Employee.update(employeeData, {
            where: { id }
        });



        res.redirect("/employee_master");
    } catch (err) {
        console.error(err);
        res.redirect("/employee_master");
    }
};