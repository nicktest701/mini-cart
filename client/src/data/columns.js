import $ from "jquery";
// import imgView from "../../src/assets/images/view.svg";
// import imgEdit from "../../src/assets/images/edit.svg";
// import imgDelete from "../../src/assets/images/delete.svg";

export const productColumns = (handleView, handleEdit, handleDelete) => [
  {
    title: "Id",
    data: "id",
    visible: false,
  },
  {
    title: "Name",
    data: "name",
  },
  {
    title: "Price",
    data: "price",
  },
  {
    title: "Quantity",
    data: "quantity",
    targets: "quantity",
    createdCell: (cell, cellData, rowData, row, col) => {
      const quantity = +cellData;
      let lowStock = "";
      let finished = "";

      if (quantity === 0) {
        finished = `<small class="badge bg-danger">finished</small>`;
      }
      if (quantity > 0 && quantity < 10) {
        lowStock = `<small class="badge bg-primary">low</small>`;
      }
      const ce = $(`<p>${cellData}</p>`);
      $(cell).css({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      });
      $(cell).html([ce, lowStock, finished]);
    },
  },
  {
    title: "Supplier",
    data: "supplier",
  },
  {
    title: "Action",
    data: null,
    targets: [-1],
    orderable: false,
    createdCell: (cell, cellData, rowData, row, col) => {
      const viewBtn = $(
        `<button class='btn btn-primary btn-sm m-1'>View</button>`
        // `<button class='btn btn-sm btn-light m-1' title='View'> <img src=${imgView} width='20' alt='image'/></button>`
      ).on("click", () => handleView(rowData));

      const editBtn = $(
        `<button class='btn btn-dark btn-sm m-1'>Edit</button>`
        // `<button class='btn btn-sm btn-light m-1'><img src=${imgEdit} width='20' alt='image'/></button>`
      ).on("click", () => handleEdit(rowData));

      const deleteBtn = $(
        `<button class='btn btn-light btn-sm m-1'>Delete</button>`
        // `<button class='btn btn-sm btn-light m-1'><img src=${imgDelete} width='20' alt='image'/></button>`
      ).on("click", () => handleDelete(rowData?.id));

      $(cell).html([viewBtn, editBtn, deleteBtn]);
      // $(cell).css("margin-left", "auto");
    },
  },
];

export const salesProductColumns = [
  {
    title: "Id",
    data: "id",
    visible: false,
  },
  {
    title: "Name",
    data: "name",
  },
  {
    title: "Price",
    data: "price",
  },
  {
    title: "Quantity",
    data: "quantity",
    targets: "quantity",
  },
];

export const cartProductColumns = (handleDelete) => [
  {
    title: "Name",
    data: "name",
  },
  {
    title: "Price",
    data: "price",
  },
  {
    title: "Quantity",
    data: "quantity",
    targets: "quantity",
  },
  {
    title: "Total",
    data: "total",
    targets: "total",
  },
  {
    title: "Action",
    data: null,
    target: [-1],
    createdCell: (cell, cellData, rowData, row, col) => {
      // @Delete Supplier
      const deleteBtn = $(`<a class='delete-btn'>Delete</a>`).on("click", () =>
        handleDelete(rowData?.id)
      );
      $(cell).html(deleteBtn);
    },
  },
];

export const supplierColumns = (handleView, handleEdit, handleDelete) => [
  {
    title: "Id",
    data: "id",
    visible: false,
  },
  {
    title: "Name",
    data: "name",
  },
  {
    title: "Address",
    data: "address",
    orderable: false,
  },
  {
    title: "Telephone",
    data: "telephone",
    orderable: false,
  },
  {
    title: "Action",
    data: null,
    target: [-1],
    createdCell: (cell, cellData, rowData, row, col) => {
      // @View Supplier
      const viewBtn = $(
        `<button class='btn btn-primary btn-sm m-1'>View</button>`
      ).on("click", () => handleView(rowData));

      // @Edit Supplier
      const editBtn = $(
        `<button class='btn btn-dark btn-sm m-1'>Edit</button>`
      ).on("click", () => handleEdit(rowData));

      // @Delete Supplier
      const deleteBtn = $(
        `<button class='btn btn-light btn-sm m-1'>Delete</button>`
      ).on("click", () => handleDelete(rowData?.id));
      $(cell).html([viewBtn, editBtn, deleteBtn]);
    },
  },
];
