import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UnloadSourceModal = ({ source, show, onConfirm, onCancel }) => {
    return (
        <Modal show={show} onHide={onCancel} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>Unload Source</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to unload the source "{source?.name}"?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UnloadSourceModal;
