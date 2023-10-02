import React, { useContext, useState, useRef, useEffect } from "react";
import $ from "jquery";
import { Button, Card, Stack } from "react-bootstrap";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { deleteProduct, getAllProducts } from "../../api";
import { productColumns } from "../../data";
import { ProductContext } from "../../context/products/ProductProvider";
import ProductEdit from "../modals/ProductEdit";
import { useNavigate } from "react-router-dom";
import ProductView from "../modals/ProductView";
import { IoAddCircleOutline } from "react-icons/io5";

function ProductTables() {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const [proEditData, setProEditData] = useState();
  const [proViewData, setProViewData] = useState({
    visible: false,
    name: "",
    price: "",
    quantity: "",
    supplier: "",
  });
  const { proState, proDispatch } = useContext(ProductContext);

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(deleteProduct);

  const data = useQuery("products", getAllProducts, {
    staleTime:15000,
    cacheTime:3000,
    onSuccess: (data) => {
      proDispatch({ type: "productsDetails", payload: data });
    },
    onError: () => {
      navigate("/error", { replace: true });
    },
  });

  useEffect(() => {
    // @View Supplier
    const handleView = (rowData) => {
      setProViewData({
        visible: true,
        name: rowData.name,
        price: rowData.price,
        quantity: rowData.quantity,
        supplier: rowData.supplier,
      });
    };

    // @Edit Supplier
    const handleEdit = (rowData) => {
      setProEditData(rowData);
      proDispatch({ type: "showProductEditModal", payload: true });
    };

    // @Delete Supplier
    const handleDelete = (rowId) => {
      mutateAsync(rowId, {
        onSuccess: (data) => {
          alert("Data Deleted");
          queryClient.invalidateQueries("products");
        },
      });
    };

    $(`#${tableRef.current.id}`).DataTable({
      scrollY: 400,
      scrollX: true,
      scrollCollapse: true,
      fixedHeader: true,
      bInfo: false,
      scrollResize: true,
      destroy: true,
      responsive: true,
      buttons: ["pdf", "excel", "copy"],
      data: data ? data.data : [],
      columnDefs: [
        {
          orderable: false,
          className: "select-checkbox",
          targets: [-2],
        },
      ],
      select: {
        style: "multi",
        selector: "td:first-child",
      },
      order: [[1, "asc"]],
      columns: productColumns(handleView, handleEdit, handleDelete),
    });
  }, [data, queryClient, mutateAsync, proDispatch]);

  return (
    <>
      <Card className="shadow">
        <Card.Header className="d-flex align-items-center justify-content-between text-dark flex-wrap">
          <Stack
            direction="horizontal"
            className="products-details-container pt-3"
            gap={4}
          >
            <p className="position-relative me-3  ">
              Products
              <span className="bg-success text-white position-absolute right-0 bottom-50 badge badge-primary p-2 ">
                {proState.noOfProduct}
              </span>
            </p>
            <p className="position-relative me-3">
              Low Stock
              <span className="bg-dark text-white position-absolute right-0 bottom-50 badge badge-primary p-2">
                {proState.lowStock}
              </span>
            </p>
            <p className="position-relative me-3">
              Out of Stock
              <span className="bg-danger text-white position-absolute right-0 bottom-50 badge badge-primary p-2 ">
                {proState.outOfStock}
              </span>
            </p>
          </Stack>
          <Button
            className="rounded-1"
            variant="primary"
            onClick={() =>
              proDispatch({ type: "showProductModal", payload: true })
            }
          >
            <IoAddCircleOutline />
            Create New
          </Button>
        </Card.Header>
        <Card.Body className="p-sm-2 p-md-4">
          <table
            width={"100%"}
            id="product-table"
            ref={tableRef}
            className="table table-sm table-responsive table-hover table bordered"
          >
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Supplier</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody></tbody>
          </table>
        </Card.Body>
      </Card>
      <ProductView product={proViewData} setProViewData={setProViewData} />
      <ProductEdit data={proEditData} />
    </>
  );
}

export default React.memo(ProductTables);
