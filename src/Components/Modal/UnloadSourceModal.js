import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UnloadSourceModal = ({ source, show, onConfirm, onCancel }) => {
    return (
        <Modal show={show} onHide={onCancel} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>Gỡ bỏ Nguồn truyện</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc chắn muốn gỡ bỏ nguồn <strong>"{source?.name}"</strong> ?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Huỷ
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UnloadSourceModal;
