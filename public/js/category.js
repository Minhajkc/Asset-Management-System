document.addEventListener("DOMContentLoaded", function () {

    if (typeof $ !== "undefined") {
        $("#categoryTable").DataTable();
    }

    const categoryModal = new bootstrap.Modal(
        document.getElementById("categoryModal")
    );

    const viewModal = new bootstrap.Modal(
        document.getElementById("viewCategoryModal")
    );

    const form = document.getElementById("categoryForm");
    const modalLabel = document.getElementById("categoryModalLabel");
    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", function () {

            document.getElementById("categoryId").value = this.dataset.id;
            document.getElementById("categoryName").value = this.dataset.name;
            document.getElementById("categoryDescription").value = this.dataset.description;
            document.getElementById("categoryStatus").value = this.dataset.status;

            form.action = "/asset_categories/update/" + this.dataset.id;
            modalLabel.textContent = "Edit Category";

            categoryModal.show();
        });
    });



 
    document.querySelectorAll(".view-btn").forEach(button => {
        button.addEventListener("click", function () {

            document.getElementById("viewCategoryName").textContent = this.dataset.name;
            document.getElementById("viewCategoryDescription").textContent = this.dataset.description;
            document.getElementById("viewCategoryStatus").textContent = this.dataset.status;

            viewModal.show();
        });
    });
    document.getElementById("categoryModal").addEventListener("hidden.bs.modal", function () {

        form.reset();
        form.action = "/asset_categories/create";
        modalLabel.textContent = "Add Category";
        document.getElementById("categoryId").value = "";
    });
});