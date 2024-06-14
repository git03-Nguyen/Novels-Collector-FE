// ToolbarModal.js
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ToolBar from '../ToolBar/ToolBar';

const ToolbarModal = ({ show, handleClose, onConfirm }) => {

    const [localStyles, setLocalStyles] = useState({
        fontSize: '16px',
        fontColor: '#ffffff',
        backgroundColor: '#066886',
        fontFamily: 'Arial',
        lineHeight: '1.5',
        fontStyle: 'normal',
    });

    const handleStyleChange = (newStyles) => {
        setLocalStyles((prevStyles) => ({ ...prevStyles, ...newStyles }));
    };

    const handleConfirm = () => {
        onConfirm(localStyles);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Bảng tùy chỉnh</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ToolBar onChange={handleStyleChange} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ToolbarModal;
