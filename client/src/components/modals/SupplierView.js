import { Modal } from "react-bootstrap";

function SupplierView({ supplier, setSuppViewData }) {
  return (
    <Modal
      as="div"
      keyboard
      animation
      show={supplier.visible}
      onHide={(prev) =>
        setSuppViewData({
          ...prev,
          visible: false,
        })
      }
    >
      <Modal.Header closeButton>
        <Modal.Title> supplier Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="fw-bold text-primary">Name </p>
        <p className="lead">{supplier.name}</p>
        <p className="fw-bold text-primary">Address </p>
        <p className="lead">{supplier.address}</p>
        <p className="fw-bold text-primary">Telephone </p>
        <p className="lead">{supplier.telephone}</p>
      </Modal.Body>
    </Modal>
  );
}

export default SupplierView;
