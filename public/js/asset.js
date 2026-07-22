document.addEventListener("DOMContentLoaded", function () {
    if (typeof $ !== "undefined") {
        $("#assetTable").DataTable();
    }

    const assetModal = new bootstrap.Modal(
        document.getElementById("assetModal")
    );

    const viewModal = new bootstrap.Modal(
        document.getElementById("viewAssetModal")
    );

    const form = document.getElementById("assetForm");
    const modalLabel = document.getElementById("assetModalLabel");
    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", function () {

            document.getElementById("assetId").value = this.dataset.id;
            document.getElementById("assetCode").value = this.dataset.code;
            document.getElementById("assetName").value = this.dataset.name;
            document.getElementById("assetCategory").value = this.dataset.category;

            document.getElementById("assetBranch").value = this.dataset.branch;


            document.getElementById("assetBrand").value = this.dataset.brand;
            document.getElementById("assetModel").value = this.dataset.model;
            document.getElementById("assetSerial").value = this.dataset.serial;
            document.getElementById("assetDate").value = this.dataset.date;
            document.getElementById("assetCost").value = this.dataset.cost;
            document.getElementById("assetQuantity").value = this.dataset.quantity;
            document.getElementById("assetStatus").value = this.dataset.status;

            form.action = "/asset_master/update/" + this.dataset.id;
            modalLabel.textContent = "Edit Asset";

            assetModal.show();
        });
    });

  


    document.querySelectorAll(".view-btn").forEach(button => {
        button.addEventListener("click", function () {

            document.getElementById("viewAssetCode").textContent = this.dataset.code;
            document.getElementById("viewAssetName").textContent = this.dataset.name;
            document.getElementById("viewAssetCategory").textContent = this.dataset.categoryname;
            document.getElementById("viewAssetBranch").textContent = this.dataset.branch;

            document.getElementById("viewAssetBrand").textContent = this.dataset.brand;
        document.getElementById("viewAssetModel").textContent = this.dataset.model;
            
        document.getElementById("viewAssetSerial").textContent = this.dataset.serial;
            
        
        document.getElementById("viewAssetDate").textContent = this.dataset.date;
            document.getElementById("viewAssetCost").textContent = this.dataset.cost;
            document.getElementById("viewAssetQuantity").textContent = this.dataset.quantity;
            document.getElementById("viewAssetStatus").textContent = this.dataset.status;

            viewModal.show();
        });
    });





    document.getElementById("assetModal").addEventListener("hidden.bs.modal", function () {

        form.reset();
        form.action = "/asset_master/create";
        modalLabel.textContent = "Add Asset";
        document.getElementById("assetId").value = "";
    });
});