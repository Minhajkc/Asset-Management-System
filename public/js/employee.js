console.log("employee.js loaded");

$(document).ready(function () {


    $(document).on("click", ".viewEmployee", function () {
        const btn = $(this);

        $("#viewCode").text(btn.attr("data-code"));
        $("#viewid").text(btn.attr("data-id"));
        $("#viewName").text(btn.attr("data-name"));

        $("#viewEmail").text(btn.attr("data-email"));


        $("#viewMobile").text(btn.attr("data-mobile"));
        $("#viewDepartment").text(btn.attr("data-department"));
        $("#viewDesignation").text(btn.attr("data-designation"));
        $("#viewJoiningDate").text(btn.attr("data-joining"));
        $("#viewStatus").text(btn.attr("data-status"));
    });

   
    $(document).on("click", ".editEmployee", function () {
        const btn = $(this);

        $("#employeeId").val(btn.attr("data-id"));
            $("#employeeCode").val(btn.attr("data-code"));
          $("#employeeName").val(btn.attr("data-name"));
        $("#employeeEmail").val(btn.attr("data-email"));
        $("#employeeMobile").val(btn.attr("data-mobile"));

        
        $("#employeeDepartment").val(btn.attr("data-department"));
        $("#employeeDesignation").val(btn.attr("data-designation"));
        $("#employeeJoining").val(btn.attr("data-joining"));
        $("#employeeStatus").val(btn.attr("data-status"));

        const id = btn.attr("data-id");
        $("#employeeForm").attr("action", "/employee_master/update/" + id);
    });
});