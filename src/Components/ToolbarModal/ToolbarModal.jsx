// ToolbarModal.js
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ToolBar from '../ToolBar/ToolBar';
import UserStyleSettingsManager from '../../utils/localStorage/userStyleSettingsManager';

const ToolbarModal = ({ show, handleClose, onConfirm }) => {
    const defaultStyleSettings = {
        fontSize: '16px',
        fontColor: '#ffffff',
        backgroundColor: '#066886',
        fontFamily: 'Arial',
        lineHeight: '1.5',
        fontStyle: 'normal',
    };

    const [localStyles, setLocalStyles] = useState(
        UserStyleSettingsManager.getUserStyleSettings()?.fontSize
            ? UserStyleSettingsManager.getUserStyleSettings()
            : defaultStyleSettings
    );

    const handleStyleChange = (newStyles) => {
        setLocalStyles(newStyles);
    };

    const handleConfirm = () => {
        onConfirm(localStyles);

        UserStyleSettingsManager.saveStyleSettings(localStyles);
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
