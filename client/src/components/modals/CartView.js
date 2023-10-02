import React from "react";
import { Modal } from "react-bootstrap";

function CartView({ details, show, setShow }) {
  return (
    <Modal show={show} animation={true} onHide={() => setShow(false)}>
      <Modal.Header>
        <Modal.Title> Customer Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table
          width={"100%"}
          className="table table-sm table-responsive table-borderless table-hover table-striped"
          style={{ fontSize: "14px" }}
        >
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {details?.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(CartView);
