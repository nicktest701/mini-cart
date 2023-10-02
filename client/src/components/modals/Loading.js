import { Modal, Spinner } from "react-bootstrap";

const Loading = () => {


  return (
    <Modal centered show={true} animation={false} className="text-center">
      <Modal.Body>
        <Spinner variant="primary" animation="border" />
        <p>Loading..</p>
      </Modal.Body>
    </Modal>
  );
};

export default Loading;
