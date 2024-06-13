import React, { useState, useEffect } from 'react';
import CustomModal from '../../../Components/Modal/CustomModal';
import { toast } from 'react-toastify';
import {
    CFormInput,
    CFormSelect,
    CButton,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CContainer,
    CCol,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';

import './AccountManagementPage.css';

const AccountManagementPage = () => {
    const [listAccounts, setListAccounts] = useState([]);

    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);


    const handleRemoveAction = (acc) => {

        setModalContent(`Bạn có chắc chắn muốn xoá tài khoản ${acc.email} không ?`);
        setShowRemoveModal(true);
    }

    const handleConfirmAction = () => {
        toast.success('Xoá tài khoản thành công');
        setShowRemoveModal(false);
    }
    const handleCancelAction = () => {
        setShowRemoveModal(false);
    }

    const handleAddNewAccount = () => {
        toast.success('Tạo tài khoản mới thành công');
        setShowAddModal(false);
    }

    const sampleData = [
        {
            id: '1',
            email: 'user1@example.com',
            role: 'Admin'
        },
        {
            id: '2',
            email: 'user2@example.com',
            role: 'Người dùng'
        },
        {
            id: '3',
            email: 'user3@example.com',
            role: 'Người dùng'
        }
    ];


    return (
        <CContainer className="px-3 py-3 text-center">
            <CCol className="align-self-end d-flex flex-column">
                <CButton className="mb-3 align-self-end add-btn" onClick={() => setShowAddModal(true)}><i className="fas fa-plus"></i>Thêm mới</CButton>
            </CCol>

            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                    <CTableRow>
                        <CTableHeaderCell className="bg-body-tertiary">ID</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Email</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">Vai trò</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Thao tác</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {sampleData.map((acc, index) => (
                        <CTableRow key={index}>
                            <CTableDataCell>
                                <div>{acc.id}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{acc.email}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{acc.role}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CButton className="remove-btn" onClick={() => handleRemoveAction(acc)}>
                                    <CIcon icon={cilTrash} className="remove-icon pb-1" size="lg" />
                                </CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
            <CustomModal
                show={showRemoveModal}
                onHide={handleCancelAction}
                title="Xác nhận xoá tài khoản"
                content={modalContent}
                onConfirm={handleConfirmAction}
                onCancel={handleCancelAction}
            />
            <CModal alignment="center" visible={showAddModal} onClose={() => setShowAddModal(false)}>
                <CModalHeader>
                    <CModalTitle>Tạo tài khoản mới</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CFormInput
                        type="email"
                        id="floatingInputValid"
                        floatingClassName="mb-3"
                        floatingLabel="Email addresss"
                        placeholder="name@example.com"
                    />
                    <CFormInput
                        type="password"
                        id="floatingInputInvalid"
                        floatingLabel="Mật khẩu"
                        placeholder="name@example.com"
                    />
                    <CFormSelect
                        id="floatingSelect"
                        floatingLabel="Vai trò"
                        aria-label="Floating label select example"
                        className='mt-3'
                    >
                        <option value="1">Quản trị viên</option>
                        <option value="2">Người dùng</option>
                    </CFormSelect>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setShowAddModal(false)}>Đóng</CButton>
                    <CButton color="primary" onClick={handleAddNewAccount}>Tạo mới</CButton>
                </CModalFooter>
            </CModal>
        </CContainer>
    );
};

export default AccountManagementPage;
