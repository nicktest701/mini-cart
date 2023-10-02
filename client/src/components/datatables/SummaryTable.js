import React, { useRef, useEffect, useState } from "react";
import $ from "jquery";
import CartView from "../modals/CartView";
import { useQuery } from "react-query";
import { getAllCartByInvoiceNo } from "../../api";


function SummaryTable({ customer, setCustomerCartInfo }) {
  const tableRef = useRef(null);
  const [show, setShow] = useState(false);

  const [customerId, setCustomerId] = useState();
  const [cartDetails, setCartDetails] = useState([]);



  useQuery(["ind", customerId], () => getAllCartByInvoiceNo(customerId), {
    enabled: !!customerId,
    onSuccess: (data) => {
      setCartDetails(data);
    
    },
  });

  useEffect(() => {
    const id = tableRef.current.id;

    const summaryTable = $(`#${id}`)
      .DataTable({
        destroy: true,
        responsive: true,
        dom: "Bftrip",
        pageLength: 5,
        scrollX: true,
        data: customer.data,
        columns: [
          {
            title: "Invoice #",
            data: "invoiceNo",
          },
          {
            title: "Date",
            data: "purchasedDate",
          
          },
          {
            title: "Customer",
            data: "customer",
          },
          {
            title: "Total Items",
            data: "noOfItems",
          },
          {
            title: "Grand Total",
            data: "grossTotal",
          },
          {
            title: "Discount",
            data: "discount",
          },
          {
            title: "Net Total",
            data: "netTotal",
          },
          {
            title: "View",
            data: null,
            target: [-1],
            createdCell: (cell, cellData, rowData, row, col) => {
              const viewBtn = $(
                `<a class='btn btn-primary btn-sm'>View</a>`
              ).on("click", () => {
                setCustomerId(cellData.invoiceNo);
                setShow(true);
              });
              $(cell).html(viewBtn);
            },
          },
        ],
      })
      .on("click", "tr", function (e) {
        let selectedRow = summaryTable.row($(this)).data();
        if (selectedRow) {
          setCustomerCartInfo(selectedRow);
        }
      });
  }, [customer, setCustomerCartInfo]);

  return (
    <>
      <table
        width={"50%"}
        id="summary-table"
        className="table table-sm table-responsive table-borderless table-hover table-striped"
        style={{ fontSize: "14px", cursor: "pointer" }}
        ref={tableRef}
      >
        <thead>
          <tr>
            <th>Invoice #</th>
            <th style={{width:200}}>Date</th>
            <th>Customer</th>
            <th>Total Items</th>
            <th>Grand Total</th>
            <th>Discount</th>
            <th>Net Total</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <CartView details={cartDetails} show={show} setShow={setShow} />
    </>
  );
}

export default SummaryTable;
