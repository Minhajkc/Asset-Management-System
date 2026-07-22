require("dotenv").config();

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");

const sequelize = require("./config/database");
const routes = require("./routes");
const Employee = require("./models/employee.model");

const app = express();
const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database Connected");
    } catch (err) {
        console.error(err.message);
    }
})();




app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));
app.use("/icons", express.static(path.join(__dirname, "node_modules/bootstrap-icons/font")));

app.use(routes);

app.use((req, res) => {
    res.status(404).render("errors/404", {
        title: "404"
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});