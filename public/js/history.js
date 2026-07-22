document.addEventListener("DOMContentLoaded", function () {

    if (typeof $ !== "undefined") {
        $("#historyTable").DataTable({
            order: [[0, "asc"]]
        });
    }

});