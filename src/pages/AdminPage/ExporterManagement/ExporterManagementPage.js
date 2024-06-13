import React, { useState, useEffect } from 'react';
import PluginExporterService from '../../../services/pluginExporter.s';
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

import './ExporterManagementPage.css';

const ExporterManagementPage = () => {
    const [listExporters, setListExporters] = useState([]);
    const [currentExporter, setCurrentExporter] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [actionType, setActionType] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const getAllExporters = async () => {
        try {
            const response = await PluginExporterService.fetchPluginExporters();
            if (response.statusCode === 200) {
                setListExporters(response.data);
            } else {
                console.log("Error fetching plugin exporters: " + response.message);
            }
        } catch (error) {
            console.log("Error fetching plugin exporters: " + error.message);
        }
    };

    useEffect(() => {
        getAllExporters();
    }, []);

    const unloadExporter = async (exporter) => {
        try {
            const response = await PluginExporterService.unloadPluginExporter(exporter.name);
            if (response.statusCode === 200) {
                setListExporters(listExporters.map(exp =>
                    exp.name === exporter.name ? { ...exp, isLoaded: false } : exp
                ));
                toast.success(`Đã tạm ngưng nguồn xuất bản ${exporter.name} thành công!`);
            } else {
                console.log("Error unloading exporter: " + response.message);
            }
        } catch (error) {
            console.log("Error unloading exporter: " + error.message);
        }
    };

    const reloadExporter = async (exporter) => {
        try {
            const response = await PluginExporterService.reloadPluginExporter(exporter.name);
            if (response.statusCode === 200) {
                setListExporters(listExporters.map(exp =>
                    exp.name === exporter.name ? { ...exp, isLoaded: true } : exp
                ));
                toast.success(`Đã tải lại nguồn xuất bản ${exporter.name} thành công!`);
            } else {
                console.log("Error reloading exporter: " + response.message);
            }
        } catch (error) {
            console.log("Error reloading exporter: " + error.message);
        }
    };

    const deleteExporter = async (exporter) => {
        try {
            const response = await PluginExporterService.deletePluginExporter(exporter.name);
            if (response.statusCode === 200) {
                setListExporters(listExporters.filter(exp => exp.name !== exporter.name));
                toast.success(`Đã xóa nguồn xuất bản ${exporter.name} thành công!`);
            } else {
                toast.error(`Lỗi! Xóa nguồn xuất bản ${exporter.name} không thành công!`);
                console.log("Error deleting exporter: " + response.message);
            }
        } catch (error) {
            console.log("Error deleting exporter: " + error.message);
        }
    };

    const handleConfirmAction = async () => {
        try {
            if (actionType === 'unload') {
                await unloadExporter(currentExporter);
            } else if (actionType === 'reload') {
                await reloadExporter(currentExporter);
            } else if (actionType === 'delete') {
                await deleteExporter(currentExporter);
            }
        } catch (error) {
            console.log(`Error during ${actionType} operation: ` + error.message);
            toast.error(`Lỗi! ${actionType === 'unload' ? 'tạm ngưng' : actionType === 'reload' ? 'tải lại' : 'xóa'} exporter ${currentExporter.name} không thành công!`);
        } finally {
            setCurrentExporter(null);
            setShowModal(false);
        }
    };

    const handleAction = (exporter, action) => {
        setCurrentExporter(exporter);
        setActionType(action);

        let content = '';
        if (action === 'unload') {
            content = `Bạn có chắc chắn muốn tạm ngưng nguồn xuất bản"${exporter.name}"?`;
        } else if (action === 'reload') {
            content = `Bạn có chắc chắn muốn tải lại nguồn xuất bản "${exporter.name}"?`;
        } else if (action === 'delete') {
            content = `Bạn có chắc chắn muốn xóa nguồn xuất bản "${exporter.name}"? Người dùng không thể tiếp tục lưu tiểu thuyết theo định dạng này!`;
        }

        setModalContent(content);
        setShowModal(true);
    };

    const handleCancelAction = () => {
        setCurrentExporter(null);
        setShowModal(false);
    };

    const handleAddNewExporter = async () => {
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

            const response = await PluginExporterService.uploadPluginExporter(formData);
            if (response.statusCode === 200) {
                toast.success(`Đã thêm nguồn xuất bản mới: ${response.meta.added} thành công!`);
                getAllExporters();
                setShowAddModal(false);
                setSelectedFile(null);
            } else {
                toast.error("Lỗi! Thêm nguồn xuất bản mới không thành công!");
                console.log("Error uploading exporter: " + response.message);
            }
        } catch (error) {
            console.log("Error uploading exporter: " + error.message);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    return (
        <CContainer className="px-3 py-3 text-center">
            <CCol className="align-self-end d-flex flex-column">
                <CButton className="mb-3 align-self-end add-btn" onClick={() => setShowAddModal(true)}><i className="fas fa-plus"></i>Thêm mới</CButton>
            </CCol>

            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                    <CTableRow>
                        <CTableHeaderCell className="bg-body-tertiary">ID</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Logo</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">Nguồn xuất bản</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Phiên bản</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Phần mở rộng</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Tập tin cài đặt</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">Tác giả</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Trạng thái</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Thao tác</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {listExporters.map((exp, index) => (
                        <CTableRow key={index}>
                            <CTableDataCell>
                                <div>{index + 1}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CImage src={exp.icon} width={30} />
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{exp.name}</div>
                                <div className="small text-body-secondary text-nowrap">
                                    <span>{exp.description}</span>
                                </div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{exp.version}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{exp.extension}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{exp.assembly}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{exp.author}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                {exp.isLoaded ? (
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
                                        defaultChecked={exp.isLoaded}
                                        onChange={() => handleAction(exp, exp.isLoaded ? 'unload' : 'reload')}
                                    />
                                    <CButton className="remove-btn" onClick={() => handleAction(exp, 'delete')}>
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
                    <CModalTitle>Thêm Nguồn xuất bản mới</CModalTitle>
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
                    <CButton color="primary" onClick={handleAddNewExporter}>Tải lên</CButton>
                </CModalFooter>
            </CModal>
        </CContainer>
    );
};

export default ExporterManagementPage;
