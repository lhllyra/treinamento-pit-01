/* eslint-disable react/prop-types */
import React from 'react';
import { Modal, Button, ToggleButton } from 'react-bootstrap';

function ModalComponent({
  show, toggle, children, title, onSave,
}) {
  return (
    <>
      <Modal show={show} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => ToggleButton}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;
