document.addEventListener("DOMContentLoaded", function () {

    
    if (typeof $ !== "undefined") {
        $("#issueTable").DataTable();
    }

    const issueModal = new bootstrap.Modal(
        document.getElementById("issueModal")
    );

    const viewModal = new bootstrap.Modal(
        document.getElementById("viewIssueModal")
    );

    const form = document.getElementById("issueForm");
    const modalLabel = document.getElementById("issueModalLabel");


    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", function () {

            document.getElementById("employeeId").value = this.dataset.employeeId;
            document.getElementById("assetId").value = this.dataset.assetId;
            document.getElementById("issueQuantity").value = this.dataset.quantity;



            document.getElementById("issueDate").value = this.dataset.date;
           
            document.getElementById("issueRemarks").value = this.dataset.remarks;

            form.action = "/issue_asset/update/" + this.dataset.id;
            modalLabel.textContent = "Edit Issue Asset";

            issueModal.show();
        });
    });

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

  
    document.getElementById("issueModal").addEventListener("hidden.bs.modal", function () {

        form.reset();
        form.action = "/issue_asset/create";
        modalLabel.textContent = "Issue Asset";
    });
});