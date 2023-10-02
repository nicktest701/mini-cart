import { Modal } from "react-bootstrap";

function ProductView({ product, setProViewData }) {
  return (
    <Modal
    as="div"
      keyboard
      animation
      show={product.visible}
      onHide={(prev) =>
        setProViewData({
          ...prev,
          visible: false,
        })
      }
    >
      <Modal.Header closeButton>
        <Modal.Title> Product Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="fw-bold text-primary">Name </p>
        <p className="lead">{product.name}</p>
        <p className="fw-bold text-primary">Price </p>
        <p className="lead">{product.price}</p>
        <p className="fw-bold text-primary">Quantity </p>
        <p className="lead">{product.quantity}</p>
        <p className="fw-bold text-primary">Supplier </p>
        <p className="lead">{product.supplier}</p>
      </Modal.Body>
    </Modal>
  );
}

export default ProductView;
