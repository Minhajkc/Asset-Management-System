exports.index = (req, res) => {
    res.render("stock/index", {
        title: "Stock View"
    });
};