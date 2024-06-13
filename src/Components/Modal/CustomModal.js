import React from 'react';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'

const CustomModal = ({ show, onCancel, onConfirm, title, content }) => {
    return (
        <CModal visible={show} onClose={onCancel} backdrop="static" alignment="center">
            <CModalHeader onClose={onCancel}>
                <CModalTitle>{title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {content}
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={onCancel}>
                    Huỷ
                </CButton>
                <CButton color="primary" onClick={onConfirm}>
                    Xác nhận
                </CButton>
            </CModalFooter>
        </CModal>
    )
};

export default CustomModal;
