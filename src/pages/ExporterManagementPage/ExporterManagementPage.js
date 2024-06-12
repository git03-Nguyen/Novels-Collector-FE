import React, { useState, useEffect } from 'react';
import PluginExporterService from '../../services/pluginExporters.s';
import { Badge, Button, Table } from 'react-bootstrap';
import './ExporterManagementPage.css';
import { toast } from 'react-toastify';
const ExporterManagementPage = () => {
    const [listExporters, setListExporters] = useState([]);

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


    const reloadAllExporters = async () => {
        try {
            const response = await PluginExporterService.reloadAllExporters();
            if (response.statusCode === 200) {
                setListExporters(response.data);
                toast.success("Đã khởi động lại tất cả định dạng truyện thành công!");
            } else {
                console.log("Error reloading all plugin exporters: " + response.message);
            }
        } catch (error) {
            console.log("Error reloading all plugin exporters: " + error.message);
        }
    }
    return (
        <div className="px-3 py-3 text-center">
            <div className="row mx-5 mb-2">
                <div className="d-flex justify-content-between align-items-end mb-1">
                    <a href="/">
                        <Button variant="success">
                            <i className="fas fa-plus"></i>
                            <span className="ms-1">Thêm Định Dạng Mới</span>
                        </Button>
                    </a>
                    <a href="#">
                        <Button variant="success" onClick={() => reloadAllExporters()}>
                            <i className="fa-solid fa-rotate-right"></i>
                            <span className="ms-1">Khởi động lại tất cả</span>
                        </Button>
                    </a>
                </div>

                <div className="table-responsive mt-3">
                    <Table bordered striped className='border border-secondary border-3'>
                        <thead className="table-primary">
                            <tr>
                                <th>ID</th>
                                <th>Tên định dạng</th>
                                <th>Định dạng tập tin</th>
                                <th>Phiên bản</th>
                                <th>Tác giả</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="table-dark my-table">
                            {listExporters.map((exporter, index) => (
                                <tr key={exporter.fileFormat} className='align-middle'>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div>
                                            <p className='fw-bold mb-1 text-start'>{exporter.name}</p>
                                            <p className='text-white-50 mb-0 text-start fs-10'>{exporter.description}</p>
                                        </div>
                                    </td>
                                    <td className='fw-bold mb-1'>{exporter.fileFormat}</td>
                                    <td className='fw-bold mb-1'>{exporter.version}</td>
                                    <td className="fw-bold">{exporter.author}</td>
                                    <td>
                                        {exporter.enabled ? (
                                            <Badge bg='success'>
                                                Đang hoạt động
                                            </Badge>
                                        ) : (
                                            <Badge bg='danger'>
                                                Đã gỡ bỏ
                                            </Badge>
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            variant='danger'
                                            // onClick={() => handleUnloadExporter(exporter)}
                                            disabled //Need to handle if have api unload a exporter
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default ExporterManagementPage;
