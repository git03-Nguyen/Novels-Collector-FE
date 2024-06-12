import React, { useState, useEffect } from 'react';
import UnloadSourceModal from '../../Components/Modal/UnloadSourceModal';
import PluginSourceService from '../../services/pluginSource.s';
import { Badge, Button, Table, Form } from 'react-bootstrap';
import './SourceManagementPage.css';
import { toast } from 'react-toastify';

const SourceManagementPage = () => {
    const [listSources, setListSources] = useState([]);
    const [unloadSource, setUnloadSource] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [url, setUrl] = useState('');

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
                console.log("Unloaded source: " + source.name);
            } else {
                console.log("Error unloading source: " + response.message);
            }
        } catch (error) {
            console.log("Error unloading source: " + error.message);
        }
    };

    const handleUnloadSource = (source) => {
        setUnloadSource(source);
        setShowModal(true);
    };

    const handleConfirmUnload = async () => {
        await unloadNovelSource(unloadSource);
        setListSources(listSources.map(source =>
            source.name === unloadSource.name ? { ...source, enabled: false } : source
        ));
        setUnloadSource(null);
        setShowModal(false);
        toast.success(`Đã gỡ bỏ nguồn truyện ${unloadSource.name} thành công!`);
    };

    const handleCancelUnload = () => {
        setUnloadSource(null);
        setShowModal(false);
    };

    const reloadAllSources = async () => {
        try {
            const response = await PluginSourceService.reloadAllSources();
            if (response.statusCode === 200) {
                setListSources(response.data);
                toast.success("Đã khởi động lại tất cả nguồn truyện thành công!");
            } else {
                console.log("Error reloading all plugin sources: " + response.message);
            }
        } catch (error) {
            console.log("Error reloading all plugin sources: " + error.message);
        }
    };

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    };

    const handleUrlSubmit = async (event) => {
        event.preventDefault();
        if (!url) {
            toast.error("Vui lòng nhập URL trước khi tải lên.");
            return;
        }

        try {
            const response = await PluginSourceService.uploadPluginSource(url);
            if (response.statusCode === 200) {
                toast.success("Tải lên nguồn truyện mới thành công!");
                getAllSources();
                setUrl('');
            } else {
                toast.error("Lỗi khi tải lên nguồn truyện: " + response.message);
            }
        } catch (error) {
            toast.error("Lỗi khi tải lên nguồn truyện: " + error.message);
        }
    };

    return (
        <div className="px-3 py-3 text-center">
            <div className="row mx-5 mb-2">
                <div className="d-flex justify-content-between align-items-end mb-1">
                    <Form onSubmit={handleUrlSubmit} className="d-flex">
                        <Form.Group controlId="formUrl" className="mb-3">
                            <Form.Control type="text" placeholder="Nhập URL của nguồn truyện" value={url} onChange={handleUrlChange} />
                        </Form.Group>
                        <Button variant="success" type="submit" className="ms-2">
                            <i className="fas fa-plus"></i>
                            <span className="ms-1">Thêm Nguồn Truyện Mới</span>
                        </Button>
                    </Form>
                    <Button variant="success" onClick={() => reloadAllSources()}>
                        <i className="fa-solid fa-rotate-right"></i>
                        <span className="ms-1">Khởi động lại tất cả Nguồn Truyện</span>
                    </Button>
                </div>

                <div className="table-responsive mt-3">
                    <Table bordered striped className='border border-secondary border-3'>
                        <thead className="table-primary">
                            <tr>
                                <th>ID</th>
                                <th>Nguồn Truyện</th>
                                <th>Phiên bản</th>
                                <th>Tác giả</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="table-dark my-table">
                            {listSources.map((source, index) => (
                                <tr key={source.url} className='align-middle'>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div>
                                            <p className='fw-bold mb-1 text-start'>{source.name}</p>
                                            <p className='text-white-50 mb-0 text-start fs-10'>{source.description}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p className='fw-bold mb-1'>{source.version}</p>
                                            <p className='text-muted mb-0'><a className='text-blue-50 source-url' href={source.url}>{source.url}</a></p>
                                        </div>
                                    </td>
                                    <td className="fw-bold">{source.author}</td>
                                    <td>
                                        {source.enabled ? (
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
                                            onClick={() => handleUnloadSource(source)}
                                            disabled={!source.enabled}
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
            {unloadSource && (
                <UnloadSourceModal
                    source={unloadSource}
                    show={showModal}
                    onConfirm={handleConfirmUnload}
                    onCancel={handleCancelUnload}
                />
            )}
        </div>
    );
};

export default SourceManagementPage;
