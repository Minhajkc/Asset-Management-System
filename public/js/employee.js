$(document).ready(function () {

    const table = $("#employeeTable").DataTable();

    $("#searchEmployee").on("keyup", function () {

        const value = $(this).val();
        console.log(value);

        table.search(value).draw();

    });

    $("#statusFilter").on("change", function () {

        table.column(7).search($(this).val()).draw();

    });

});