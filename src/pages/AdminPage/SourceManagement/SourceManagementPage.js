import React, { useState, useEffect } from 'react';
import PluginSourceService from '../../../services/pluginSource.s';
import CustomModal from '../../../Components/Modal/CustomModal';
import { toast } from 'react-toastify';
import {
    CForm,
    CFormInput,
    CButton,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CBadge,
    CContainer,
    CRow,
    CCol,
    CImage,
    CFormSwitch,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';

import './SourceManagementPage.css';

const SourceManagementPage = () => {
    const [listSources, setListSources] = useState([]);
    const [currentSource, setCurrentSource] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [actionType, setActionType] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const getAllSources = async () => {
        try {
            const response = await PluginSourceService.fetchPluginSources();
            if (response.statusCode === 200) {
                setListSources(response.data);
            } else {
                console.log("Error fetching plugin sources: " + response.message);
            }
        } catch (error) {
            console.log("Error fetching plugin sources: " + error.message);
        }
    };

    useEffect(() => {
        getAllSources();
    }, []);

    const unloadNovelSource = async (source) => {
        try {
            const response = await PluginSourceService.unloadPluginSource(source.name);
            if (response.statusCode === 200) {
                setListSources(listSources.map(src =>
                    src.name === source.name ? { ...src, isLoaded: false } : src
                ));
                toast.success(`Đã tạm ngưng nguồn truyện ${source.name} thành công!`);
            } else {
                console.log("Error unloading source: " + response.message);
            }
        } catch (error) {
            console.log("Error unloading source: " + error.message);
        }
    };

    const reloadNovelSource = async (source) => {
        try {
            const response = await PluginSourceService.reloadPluginSource(source.name);
            if (response.statusCode === 200) {
                setListSources(listSources.map(src =>
                    src.name === source.name ? { ...src, isLoaded: true } : src
                ));
                toast.success(`Đã tải lại nguồn truyện ${source.name} thành công!`);
            } else {
                console.log("Error reloading source: " + response.message);
            }
        } catch (error) {
            console.log("Error reloading source: " + error.message);
        }
    };

    const deleteNovelSource = async (source) => {
        try {
            const response = await PluginSourceService.deletePluginSource(source.name);
            if (response.statusCode === 200) {
                setListSources(listSources.filter(src => src.name !== source.name));
                toast.success(`Đã xóa nguồn truyện ${source.name} thành công!`);
            } else {
                toast.error(`Lỗi! Xóa nguồn truyện ${source.name} không thành công!`);
                console.log("Error deleting source: " + response.message);
            }
        } catch (error) {
            console.log("Error deleting source: " + error.message);
        }
    };

    const handleConfirmAction = async () => {
        try {
            if (actionType === 'unload') {
                await unloadNovelSource(currentSource);
            } else if (actionType === 'reload') {
                await reloadNovelSource(currentSource);
            } else if (actionType === 'delete') {
                await deleteNovelSource(currentSource);
            }
        } catch (error) {
            console.log(`Error during ${actionType} operation: ` + error.message);
            toast.error(`Lỗi! ${actionType === 'unload' ? 'tạm ngưng' : actionType === 'reload' ? 'tải lại' : 'xóa'} nguồn truyện ${currentSource.name} không thành công!`);
        } finally {
            setCurrentSource(null);
            setShowModal(false);
        }
    };

    const handleAction = (source, action) => {
        setCurrentSource(source);
        setActionType(action);

        let content = '';
        if (action === 'unload') {
            content = `Bạn có chắc chắn muốn tạm ngưng nguồn "${source.name}"?`;
        } else if (action === 'reload') {
            content = `Bạn có chắc chắn muốn tải lại nguồn "${source.name}"?`;
        } else if (action === 'delete') {
            content = `Bạn có chắc chắn muốn xóa nguồn "${source.name}"? Việc này sẽ xóa toàn bộ dữ liệu truyện liên quan đến nguồn này!`;
        }

        setModalContent(content);
        setShowModal(true);
    };

    const handleCancelAction = () => {
        setCurrentSource(null);
        setShowModal(false);
    };
    const handleAddNewSource = async () => {
        if (!selectedFile) {
            toast.error("Vui lòng chọn một tệp.");
            return;
        }

        if (selectedFile.size > 150 * 1024 * 1024) {
            toast.error("Tệp phải có kích thước nhỏ hơn 150MB.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await PluginSourceService.uploadPluginSource(formData);
            if (response.statusCode === 200) {
                toast.success(`Đã thêm nguồn truyện mới: ${response.meta.added}  thành công!`);
                getAllSources();
                setShowAddModal(false);
                setSelectedFile(null);
            } else {
                toast.error("Lỗi! Thêm nguồn truyện mới không thành công!");
                console.log("Error uploading source: " + response.message);
            }
        } catch (error) {
            console.log("Error uploading source: " + error.message);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    return (
        <CContainer className="px-3 py-3 text-center">
            <CCol className="align-self-end d-flex flex-column">
                <CButton className="mb-3 align-self-end add-btn" onClick={() => setShowAddModal(true)}><i className="fas fa-plus"></i>Thêm Nguồn Truyện mới</CButton>
            </CCol>

            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                    <CTableRow>
                        <CTableHeaderCell className="bg-body-tertiary">ID</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Logo</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">Nguồn Truyện</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Phiên bản</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">Tác giả</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Trạng thái</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Thao tác</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {listSources.map((src, index) => (
                        <CTableRow key={index}>
                            <CTableDataCell>
                                <div>{index + 1}</div>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                                <CImage src={src.icon} width={30} />
                                <p className='text-muted mb-0'><a className='text-blue-50' href={src.url}>{src.url}</a></p>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{src.name}</div>
                                <div className="small text-body-secondary text-nowrap">
                                    <span>{src.description}</span>
                                </div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{src.version}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{src.author}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                {src.isLoaded ? (
                                    <CBadge color="success">
                                        Đang hoạt động
                                    </CBadge>
                                ) : (
                                    <CBadge color="warning">
                                        Đã tạm ngưng
                                    </CBadge>
                                )}
                            </CTableDataCell>
                            <CTableDataCell>
                                <div className="d-flex align-items-center">
                                    <CFormSwitch
                                        label=""
                                        id={`isLoadedChecked${index}`}
                                        className="ms-2"
                                        defaultChecked={src.isLoaded}
                                        onChange={() => handleAction(src, src.isLoaded ? 'unload' : 'reload')}
                                    />
                                    <CButton className="remove-btn" onClick={() => handleAction(src, 'delete')}>
                                        <CIcon icon={cilTrash} className="remove-icon pb-1" size="lg" />
                                    </CButton>
                                </div>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
            <CustomModal
                show={showModal}
                onHide={handleCancelAction}
                title="Xác nhận"
                content={modalContent}
                onConfirm={handleConfirmAction}
                onCancel={handleCancelAction}
            />
            <CModal alignment="center" visible={showAddModal} onClose={() => setShowAddModal(false)}>
                <CModalHeader>
                    <CModalTitle>Thêm Nguồn Truyện Mới</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormInput
                            type="file"
                            accept=".zip"
                            onChange={handleFileChange}
                        />
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setShowAddModal(false)}>Đóng</CButton>
                    <CButton color="primary" onClick={handleAddNewSource}>Tải lên</CButton>
                </CModalFooter>
            </CModal>
        </CContainer>
    );
};

export default SourceManagementPage
