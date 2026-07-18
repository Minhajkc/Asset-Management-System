exports.index = (req, res) => {
    res.render("history/index", {
        title: "Asset History"
    });
};