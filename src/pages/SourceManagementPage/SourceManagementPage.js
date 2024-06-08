import React, { useState, useEffect } from 'react';
import UnloadSourceModal from '../../Components/Modal/UnloadSourceModal';
import PluginSourceService from '../../services/pluginSource.s';
import { Button } from 'react-bootstrap';

const SourceManagementPage = (props) => {
    const [listSources, setListSources] = useState([]);
    const [unloadSource, setUnloadSource] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

    const handleUnloadSource = (source) => {
        setUnloadSource(source);
        setShowModal(true);
    };

    const handleConfirmUnload = () => {
        setListSources(listSources.filter(source => source !== unloadSource));
        setUnloadSource(null);
        setShowModal(false);
    };

    const handleCancelUnload = () => {
        setUnloadSource(null);
        setShowModal(false);
    };

    return (
        <div className="px-3 py-3 text-center">
            <div className="row mx-5 mb-2">
                <div className="d-flex justify-content-between align-items-end mb-1">
                    <a href="/">
                        <Button variant="success">
                            <i className="fas fa-plus"></i>
                            <span className="ms-1">Add New Source</span>
                        </Button>
                    </a>
                </div>

                <div className="table-responsive mt-3">
                    <table className="table">
                        <thead className="table-light table-bordered">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Source Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">URL</th>
                                <th scope="col">Version</th>
                                <th scope="col">Author</th>
                                <th scope="col">Enabled Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listSources.map((source, index) => (
                                <tr key={source.url}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{source.name}</td>
                                    <td className="text-start">{source.description}</td>
                                    <td className="text-start">{source.url}</td>
                                    <td>{source.version}</td>
                                    <td>{source.author}</td>
                                    <td>{source.enabled ? (
                                        <Button variant="success" disabled>
                                            <i className="fa-solid fa-check"></i>
                                        </Button>
                                    ) : (
                                        <Button variant="danger" disabled>
                                            <i className="fa-solid fa-xmark"></i>
                                        </Button>
                                    )}</td>
                                    <td>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <Button
                                                variant="outline-dark"
                                                onClick={() => handleUnloadSource(source)}
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
