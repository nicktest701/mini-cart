import React, { useContext, useEffect, useRef, useState } from "react";
import $ from "jquery";
import { Button, Card } from "react-bootstrap";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { IoAdd } from "react-icons/io5";
import { deleteSupplier, getAllSuppliers } from "../../api";
import { ProductContext } from "../../context/products/ProductProvider";
import SupplierEdit from "../modals/SupplierEdit";
import { supplierColumns } from "../../data/columns";
import SupplierView from "../modals/SupplierView";

function SupplierTable() {
  const tableRef = useRef(null);
  const { proDispatch } = useContext(ProductContext);
  const [supplierData, setSupplierData] = useState({});
  const [suppViewData, setSuppViewData] = useState({
    visible: false,
    name: "",
    address: "",
    telephone: "",
  });

  const queryClient = useQueryClient();
  const data = useQuery("suppliers", getAllSuppliers);

  const { mutateAsync } = useMutation(deleteSupplier, {
    onMutate: (id) => {
      queryClient.invalidateQueries("suppliers");
      const data = queryClient.getQueryData("suppliers");

      queryClient.setQueryData("suppliers", (prv) => {
        return prv.filter((supplier) => supplier.id !== id);
      });
      return data;
    },
    onSuccess: () => {
      alert("data deleted");
    },
    onError: (_error, _data, context) => {
      queryClient.setQueryData(context.data);
    },
    onSettled: () => {
      queryClient.invalidateQueries("suppliers");
    },
  });

  useEffect(() => {
    const handleView = (rowData) => {
      setSuppViewData({
        visible: true,
        name: rowData.name,
        address: rowData.address,
        telephone: rowData.telephone,
      });
    };
    const handleEdit = (rowData) => {
      setSupplierData(rowData);
      proDispatch({ type: "showSupplierEditModal", payload: true });
    };
    const handleDelete = (id) => {
      mutateAsync(id);
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
      data: data ? data.data : [],
      columns: supplierColumns(handleView, handleEdit, handleDelete),
    });
  }, [data, proDispatch, mutateAsync]);

  return (
    <>
      <Card className="shadow">
        <Card.Header className="text-primary d-flex justify-content-end">
          <Button
            variant="primary"
            onClick={() =>
              proDispatch({ type: "showSupplierAddModal", payload: true })
            }
          >
            <IoAdd /> Add Supplier
          </Button>
        </Card.Header>
        <Card.Body className="p-4">
          <table
            width={"100%"}
            className="table table-sm table-responsive table-hover table bordered "
            id="supplier-table"
            ref={tableRef}
          >
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Address</th>
                <th>Telephone</th>
                <th>Action</th>
              </tr>
              {/* <tr>
                <th style={{ width: "10%" }}>Id</th>
                <th style={{ width: "25%" }}>Name</th>
                <th>Address</th>
                <th style={{ width: "15%" }}>Telephone</th>
                <th>Action</th>
              </tr> */}
            </thead>

            <tbody></tbody>
          </table>
        </Card.Body>
      </Card>
      <SupplierView supplier={suppViewData} setSuppViewData={setSuppViewData} />
      <SupplierEdit data={supplierData} />
    </>
  );
}

export default SupplierTable;
