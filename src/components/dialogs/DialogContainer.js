import React from "react";
import { connect } from "react-redux";

import { Modal, Button } from "react-bootstrap";

import { closeDialog } from "../../actions/appActions";

const DialogContainer = ({
  dialog,
  name,
  title,
  children,
  closeDialog,
  handleSubmit,
  submitLabel
}) => {
  return (
    <Modal show={dialog.name === name} onHide={() => closeDialog()}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => closeDialog()}>Storno</Button>
        <Button onClick={() => handleSubmit()}>{submitLabel}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(({ app: { dialog } }) => ({ dialog }), {
  closeDialog
})(DialogContainer);
