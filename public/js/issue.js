document.addEventListener("DOMContentLoaded", function () {

    if (typeof $ !== "undefined") {
        $("#issueTable").DataTable();
    }

    const viewModal = new bootstrap.Modal(
        document.getElementById("viewIssueModal")
    );

    document.querySelectorAll(".view-btn").forEach(button => {
        button.addEventListener("click", function () {

            document.getElementById("viewEmployee").textContent = this.dataset.employee;
            
            
            document.getElementById("viewAsset").textContent = this.dataset.asset;
            
        
        document.getElementById("viewQuantity").textContent = this.dataset.quantity;
            document.getElementById("viewDate").textContent = this.dataset.date;
            document.getElementById("viewStatus").textContent = this.dataset.status;
            document.getElementById("viewRemarks").textContent = this.dataset.remarks;

            viewModal.show();
        });
    });
});