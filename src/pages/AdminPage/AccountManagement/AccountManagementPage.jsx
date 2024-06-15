import React, { useState, useEffect } from 'react';
import UserServices from '../../../services/user.s';
import CustomModal from '../../../Components/Modal/CustomModal';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

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

import './AccountManagementPage.scss';

const AccountManagementPage = () => {
    const [listAccounts, setListAccounts] = useState([]);

    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [deletingAccount, setDeletingAccount] = useState(null);

    const getAllUsers = async () => {
        try {
            const response = await UserServices.fetchListUsers();
            if (response.statusCode === 200) {
                setListAccounts(response.data);
            } else {
                console.log("Error fetching users: " + response.message);
                toast.error('Lỗi khi lấy danh sách tài khoản');
            }
        } catch (error) {
            console.log("Error fetching users: " + error.message);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const handleRemoveAction = (acc) => {
        setModalContent(`Chắc chắn muốn xoá tài khoản [ ${acc.email} ]?`);
        setDeletingAccount(acc);
        setShowRemoveModal(true);
    }

    const handleConfirmAction = async () => {
        if (!deletingAccount) {
            toast.error('Lỗi khi xoá tài khoản');
        } else {
            const response = await UserServices.fetchDeleteUser(deletingAccount.id);
            console.log(response);
            if (response.statusCode !== 200) {
                const message = response.message ?? 'Xoá tài khoản thất bại';
                toast.error(message);
            } else {
                toast.success('Xoá tài khoản thành công');
                getAllUsers();
            }
        }
        setDeletingAccount(null);
        setShowRemoveModal(false);
    }
    const handleCancelAction = () => {
        setDeletingAccount(null);
        setShowRemoveModal(false);
    }

    const handleAddNewAccount = async () => {
        const email = document.getElementById('floatingInputValid').value;
        const password = document.getElementById('floatingInputInvalid').value;
        const role = document.getElementById('floatingSelect').value;

        if (!email || !password || !role) {
            toast.error('Vui lòng điền đầy đủ thông tin');
            return;
        }

        const response = await UserServices.fetchAddUser(email, password, role);
        if (response.statusCode !== 200) {
            console.log(response);
            const message = response.message ?? 'Tạo tài khoản mới thất bại';
            toast.error(message);
        } else {
            toast.success('Tạo tài khoản mới thành công');
            // refresh the list
            getAllUsers();
        }
        setShowAddModal(false);
    }


    return (
        <CContainer className="px-3 py-3 text-center">
            <CCol className="align-self-end d-flex flex-column">
                <CButton className="mb-3 align-self-end add-btn" onClick={() => setShowAddModal(true)}><i className="fas fa-plus"></i>Thêm mới</CButton>
            </CCol>

            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                    <CTableRow>
                        <CTableHeaderCell className="bg-body-tertiary text=center">STT</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-start fixed-width">ID</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-start">Email</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-start">Vai trò</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Thao tác</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {listAccounts.map((acc, index) => (
                        <CTableRow key={index} className='text-start'>
                            <CTableDataCell className="text-center">
                                <div>{index + 1}</div>
                            </CTableDataCell>
                            <CTableDataCell className="text-start fixed-width">
                                <div>{acc.id}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{acc.email}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{"Quản trị viên"}</div>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
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
                        floatingLabel="Email"
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
                        <option value="Quản trị viên">Quản trị viên</option>
                        <option value="Người dùng">Người dùng</option>
                    </CFormSelect>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setShowAddModal(false)}>Đóng</CButton>
                    <CButton color="primary" onClick={handleAddNewAccount}>Tạo mới</CButton>
                </CModalFooter>
            </CModal>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </CContainer>
    );
};

export default AccountManagementPage;
