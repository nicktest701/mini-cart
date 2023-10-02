import React from "react";
import { Modal } from "react-bootstrap";

function UserView({ userView, setUserView }) {
  return (
    <Modal
      show={userView.visible}
      onHide={() =>
        setUserView({
          ...userView,
          visible: false,
        })
      }
    >
      <Modal.Header closeButton>
        <Modal.Title>View User</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <p className="fw-bold text-primary">First </p>
        <p className="lead">{userView?.user?.firstname}</p>
        <p className="fw-bold text-primary">Lastname </p>
        <p className="lead">{userView?.user?.lastname}</p>
        <p className="fw-bold text-primary">Username </p>
        <p className="lead">{userView?.user?.username}</p>
        <p className="fw-bold text-primary">Email </p>
        <p className="lead">{userView?.user?.email}</p>
      </Modal.Body>
    </Modal>
  );
}

export default UserView;
