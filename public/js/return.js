document.addEventListener("DOMContentLoaded", function () {

 
    if (typeof $ !== "undefined") {
        $("#returnTable").DataTable();
    }

    const returnModal = new bootstrap.Modal(
        document.getElementById("returnModal")
    );

    const returnForm = document.getElementById("returnForm");

  
    document.querySelectorAll(".return-btn").forEach(button => {
        button.addEventListener("click", function () {

            document.getElementById("returnEmployee").textContent = this.dataset.employee;
            document.getElementById("returnAsset").textContent = this.dataset.asset;
            document.getElementById("returnQuantity").textContent = this.dataset.quantity;
            document.getElementById("returnIssueDate").textContent = this.dataset.date;

            returnForm.action = "/return_asset/" + this.dataset.id;

            returnModal.show();
        });
    });

   
    document.getElementById("returnModal").addEventListener("hidden.bs.modal", function () {
        returnForm.reset();
    });
});