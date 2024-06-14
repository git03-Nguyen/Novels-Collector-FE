import React, { useContext, useEffect, useState } from 'react';
import { NovelContext } from '../../context/NovelContext';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import PluginExporterService from '../../services/pluginExporter.s';


import './ExportNovelFileModal.scss';
import DetailNovelService from '../../services/detailnovel.s';

function ExportNovelFileModal(props) {
    const MAX_EXPORTED_CHAPTERS_LENGTH = 10;

    const { show, onCancel, onConfirm } = props;
    const { novelContext } = useContext(NovelContext);

    const [exporterPlugins, setExporterPlugins] = useState([]);
    const [curNovel, setCurNovel] = useState(novelContext);

    const [topExportedChapter, setTopExportedChapter] = useState('');
    const [bottomExportedChapter, setBottomExportedChapter] = useState('');
    const [selectedExporterPlugins, setSelectedExporterPlugins] = useState('');

    const buildRequestDataForExportingFile = () => {

        const topChapterID = curNovel?.chapters?.findIndex(chap => chap?.slug === topExportedChapter);
        const bottomChapterID = curNovel?.chapters?.findIndex(chap => chap?.slug === bottomExportedChapter);

        if (topChapterID === -1 || bottomChapterID === -1) {
            console.log("Chapter not found");
            return;
        }

        let requestData = curNovel?.chapters?.slice(topChapterID, bottomChapterID + 1);
        requestData = requestData?.map(chap => chap?.slug);

        return requestData;
    }

    const handleConfirm = async () => {
        const dataForRequesting = buildRequestDataForExportingFile();
        console.log("Request data: ");
        console.log(dataForRequesting);
        if (!dataForRequesting || dataForRequesting?.length <= 0 || dataForRequesting?.length > MAX_EXPORTED_CHAPTERS_LENGTH) {
            toast.error("Lựa chọn danh sách chương không hợp lệ. Xin hãy chọn lại !")
            return;
        }

        try {
            const response = await DetailNovelService.exportChapters(curNovel?.source, curNovel?.slug, selectedExporterPlugins, dataForRequesting);
            if (response && response?.data && parseInt(response?.statusCode) === 200) {
                window.open(response?.data?.path, '_blank', 'noopener,noreferrer');
                onConfirm();

            } else {
                toast.error('Error exporting chapters from try: ' + response?.message);
            }
        } catch (error) {
            console.log("Error exporting chapters from catch: " + error.message);
        }
    }

    const fetchExporterPlugins = async () => {
        try {
            const response = await PluginExporterService.fetchPluginExporters();
            if (response && response?.data && parseInt(response?.statusCode) === 200) {
                const exporterPluginData = response?.data?.map(exporter => exporter?.isLoaded === true ? exporter : undefined);
                console.log("Exporter plugins: ");
                console.log(exporterPluginData);
                setExporterPlugins(exporterPluginData);
                setSelectedExporterPlugins(exporterPluginData[0]?.name)
            } else {
                toast.error("Error fetching exporter plugins: " + response?.message)
            }
        } catch (error) {
            console.log("Error fetching exporter plugins: " + error.message);
        }
    }

    const handleChangeTopExportedChapter = (e) => {
        setTopExportedChapter(e.target.value);
    }

    const handleChangeBottomExportedChapter = (e) => {
        setBottomExportedChapter(e.target.value);
    }

    useEffect(() => {
        fetchExporterPlugins();
    }, [])

    useEffect(() => {
        setCurNovel(novelContext);
        const defaultChapter = (novelContext?.chapters && novelContext?.chapters?.length > 0) ? novelContext?.chapters[0]?.slug : '';
        setTopExportedChapter(defaultChapter);
        setBottomExportedChapter(defaultChapter);
    }, [novelContext])

    return (
        <div className='export-novel-file-modal'>
            <Modal show={show} onHide={onCancel} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xuất chương truyện thành file</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className='export-novel-file-content'>
                        <div className='brief-exported-novel-info'>
                            <h6>Truyện: {curNovel?.title} </h6>
                            <span>Nguồn: {curNovel?.source}</span>

                        </div>
                        <i className='text-center'>
                            <span>Hãy chọn chương đầu và cuối của danh sách xuất file. </span>
                            <span>Lưu ý rằng chiều dài tối đa là {MAX_EXPORTED_CHAPTERS_LENGTH} chương.</span>
                        </i>

                        <div className='exported-chapter-selection'>
                            <div className='exported-chapter-container'>
                                <label htmlFor="top-exported-chapter-selection">Chương đầu</label>
                                <select className="form-select " id="top-exported-chapter-selection"
                                    value={topExportedChapter} onChange={(e) => handleChangeTopExportedChapter(e)}>
                                    {curNovel && curNovel?.chapters && curNovel.chapters?.length > 0 &&
                                        curNovel?.chapters?.map((chap, index) => {
                                            return <option name={chap?.slug} value={chap?.slug} key={chap?.slug}>
                                                Chương {chap?.number}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className='exported-chapter-container'>
                                <label htmlFor="bottom-exported-chapter-selection">Chương cuối</label>
                                <select className="form-select " id="bottom-exported-chapter-selection"
                                    value={bottomExportedChapter} onChange={(e) => handleChangeBottomExportedChapter(e)}>
                                    {curNovel && curNovel?.chapters && curNovel.chapters?.length > 0 &&
                                        curNovel?.chapters?.map((chap, index) => {
                                            return <option name={chap?.slug} value={chap?.slug} key={chap?.slug}>
                                                Chương {chap?.number}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>

                        </div>

                        <i className='text-center'>
                            <span>Hãy chọn loại định dạng xuất file</span>
                        </i>
                        <div className='exporter-plugin-selection'>
                            <select className="form-select " id="bottom-exported-chapter-selection"
                                value={selectedExporterPlugins} onChange={(e) => setSelectedExporterPlugins(e.target.value)}>
                                {exporterPlugins && exporterPlugins?.length > 0 &&
                                    exporterPlugins?.map((plugin, index) => {
                                        return <option name={plugin?.name} value={plugin?.name} key={plugin?.name}>
                                            {`${plugin?.name}: <filename>.${plugin?.extension}`}
                                        </option>
                                    })
                                }
                            </select>
                        </div>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={onCancel}>
                        Hủy
                    </button>
                    <button className="btn btn-secondary" onClick={handleConfirm}>
                        Xác nhận
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ExportNovelFileModal;