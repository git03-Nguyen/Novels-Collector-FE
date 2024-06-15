import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DetailNovelService from '../../services/detailnovel.s';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { NovelContext } from '../../context/NovelContext';
import { UserContext } from '../../context/UserContext';
import ChapterStatusConverter from '../../utils/chapterStatusConverter';
import './NovelPage.scss';
import UserLatestNovelsManager from '../../utils/localStorage/userLatestNovelsManager';
import { LoadingContext } from '../../context/LoadingContext';
import ExportNovelFileModal from '../../Components/ExportNovelFileModal/ExportNovelFileModal';

function NovelPage(props) {
    const navigate = useNavigate();

    const { novelSlug, sourceSlug } = useParams();

    const { setNovelContext } = useContext(NovelContext);
    const { setUserLatestNovels } = useContext(UserContext);
    const { isLoadingContext, setIsLoadingContext } = useContext(LoadingContext);

    const [novel, setNovel] = useState({});
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewStars, setReviewStars] = useState([]);

    // Default max length of truncated description = 500
    const maxLengthTruncatedDescription = 500;

    const [rawNovelDescription, setRawNovelDescription] = useState('');
    const [novelDescription, setNovelDescription] = useState('');
    const [isSeeMoreDescription, setIsSeeMoreDescription] = useState(false);

    const [isShowExportFileModal, setIsShowExportFileModal] = useState(false);

    const [isNovelInfoFetched, setIsNovelInfoFetched] = useState(false);
    const [otherSources, setOtherSources] = useState([]);
    const [selectedSource, setSelectedSource] = useState(sourceSlug);

    const handleCancelExportFile = () => {
        setIsShowExportFileModal(false);
    }

    const handleConfirmExportFile = async () => {
        handleCancelExportFile();
    }

    const buildPersistDataForOtherSources = () => {
        const bodyRequest = {
            title: novel?.title,
            authors: novel?.authors?.map(author => author),
        };
        return bodyRequest;
    }

    const handleChangeSelectedSource = async (e) => {
        const newSelectedSource = e.target.value;
        setSelectedSource(newSelectedSource);
        if (newSelectedSource === sourceSlug) {
            return;
        }

        console.log("other sources: ");
        console.log(otherSources);
        const newNovelSlug = otherSources?.find(src => src?.name === newSelectedSource)?.slug;
        console.log("new novel slug: ");
        console.log(newNovelSlug);

        navigate(`/source/${newSelectedSource}/novel/${newNovelSlug}`)
    }

    const handleSetRawNovelDescription = (description) => {
        let newRawNovelDescription = description;
        setRawNovelDescription(newRawNovelDescription);

    }

    const handleSetReviewStars = (rating, maxRating) => {
        let ratingArr = [];

        for (let i = 1; i <= maxRating; i++) {
            ratingArr[i] = {
                className: "fa-regular fa-star",
                color: "#FFD43B",
            }
            const decisionPoint = parseFloat(parseFloat(rating) - i);
            if (decisionPoint >= 0) {
                ratingArr[i].className = "fa-solid fa-star";
            } else if (decisionPoint > -1) {
                ratingArr[i].className = "fa-regular fa-star-half-stroke";
            }
        }

        setReviewStars(ratingArr);
    }

    const fetchNovelInfo = async (source, slug) => {
        try {
            const response = await DetailNovelService.fetchDetailNovel(source, slug, currentPage);
            if (response && response.data && parseInt(response.statusCode) === 200) {
                response.data.source = response.meta.source;
                const newNovelInfo = handleConvertNovelStatusCode(response.data);
                setNovel(newNovelInfo);

                console.log("novel: ");
                console.log(newNovelInfo);
                setTotalPage(parseInt(newNovelInfo.totalPage));
                setIsNovelInfoFetched(true);

                handleSetRawNovelDescription(newNovelInfo.description);

                handleSetReviewStars(newNovelInfo.rating, newNovelInfo.maxRating);
                setNovelContext(newNovelInfo);

                saveNovelToUserLatestNovels(newNovelInfo);
            } else {
                toast.error("Error fetching novel Info: " + response?.message);
            }
        } catch (error) {
            console.error("Error fetching novel Info: " + error.message);
        }
    }

    const handleConvertNovelStatusCode = (newNovel) => {
        return {
            ...newNovel,
            status: ChapterStatusConverter.convertCodeToStatus(newNovel.status)
        }
    }

    const handlePageClick = async (e) => {
        let selectedPage = parseInt(e.selected) + 1;
        setCurrentPage(selectedPage);
    }


    const getInnerTextOfDescription = () => {
        const descriptionText = window.document.querySelector('#raw-novel-description');
        const description = descriptionText?.innerText ?? '';

        setNovelDescription(description);
    }

    const saveNovelToUserLatestNovels = (newNovel) => {
        const newUserLatestNovels = UserLatestNovelsManager.saveNovelToUserStorage(newNovel);
        setUserLatestNovels(newUserLatestNovels);
    }

    const handleUpdatePage = async () => {
        setIsLoadingContext(true);
        await fetchNovelInfo(sourceSlug, novelSlug);
        getInnerTextOfDescription();
        setIsLoadingContext(false);
    }

    const fetchOtherSources = async () => {
        const requestingData = buildPersistDataForOtherSources();
        console.log("Requesting data: ");
        console.log(requestingData);
        try {
            const response = await DetailNovelService.fetchOtherSources(sourceSlug, novelSlug, requestingData);
            if (response && response?.data && parseInt(response?.statusCode) === 200) {

                const otherSourceData = Object.keys(response?.data)?.map(src => {
                    const srcName = response?.data[src];
                    return {
                        ...srcName,
                        name: src,
                    }
                });

                setOtherSources(otherSourceData);
            } else {
                toast.error("Error fetching other sources: " + response?.message);
            }
        } catch (error) {
            console.log("Error fetch other sources: " + error.message);
        }
    }

    useEffect(() => {
        console.log("Start use effect here ...");
        setIsLoadingContext(true);
        setIsNovelInfoFetched(false);
        setSelectedSource(sourceSlug);
        handleUpdatePage();
    }, [sourceSlug, novelSlug])

    useEffect(() => {
        setIsLoadingContext(false);
        if (isNovelInfoFetched === true) {
            fetchOtherSources();
        }
    }, [isNovelInfoFetched])

    useEffect(() => {
        setIsLoadingContext(true);
        if (isNovelInfoFetched === true) {
            handleUpdatePage();
        }
    }, [currentPage]);

    useEffect(() => {
        getInnerTextOfDescription();
    }, [rawNovelDescription])


    return (
        <div className='novel-page-container  dark:bg-black dark:text-white'>
            {novel && novel?.slug && (
                <>
                    <div className="row w-100">
                        <div className="col-md-4 mt-2">
                            <img className='novel-img' src={novel?.cover ?? '/novel_cover_placeholder.png'} alt={`Ảnh bìa truyện ${novel?.title}`} />
                        </div>
                        <div className="col-md-8 text-start px-0">

                            <div className="pb-4 border-bottom border-white-50">
                                <div className='title-and-export-row'>
                                    <h2 className="text-white fw-bold mb-1">{novel?.title}</h2>
                                    <button className='btn btn-secondary' onClick={() => setIsShowExportFileModal(true)}>
                                        <span className='pe-3'>Xuất file</span>
                                        <i className="fa-solid fa-file-export"></i>
                                    </button>
                                </div>
                                <div className="d-flex">
                                    <div className="d-flex align-items-center mr-3">
                                        <span className="text-white-50 me-1">Đánh giá: {novel?.rating}/{novel?.maxRating}</span>
                                        <div className="d-flex align-items-center">
                                            {reviewStars && reviewStars.length > 0 && reviewStars.map((ele, index) => (
                                                <i
                                                    key={`review-star-${index}`}
                                                    className={ele.className}
                                                    style={{ color: ele.color }}
                                                ></i>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 row">
                                    <div className="col">
                                        <p className="text-white fw-bold mb-1">Tác giả</p>
                                        {novel.authors && novel.authors.length > 0 && novel.authors.map((author, index) => (
                                            <span key={index}>{author.name}{index < novel.authors.length - 1 ? ', ' : ''}</span>
                                        ))}
                                    </div>
                                    <div className="col">
                                        <p className="text-white fw-bold mb-1">Thể loại</p>
                                        {novel.categories && novel.categories.length > 0 && novel.categories.map((category, index) => (
                                            <span key={index}>{category.title}{index < novel.categories.length - 1 ? ', ' : ''}</span>
                                        ))}
                                    </div>
                                    <div className="col">
                                        <p className="text-white fw-bold mb-1">Nguồn dùng cho truyện</p>
                                        <select className="form-select " id="source-selection"
                                            value={selectedSource} onChange={(e) => handleChangeSelectedSource(e)}
                                        >
                                            <option value={sourceSlug} name={sourceSlug}>{sourceSlug}</option>
                                            <option disabled>──────────</option>

                                            {otherSources && otherSources?.length > 0 && otherSources.map((src, index) => {

                                                return <option key={`other-source-${src?.name}`} value={src?.name} name={src?.name}>
                                                    {src?.name}
                                                </option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-0">
                                <h5 className="text-white fw-bold mt-3 mb-2">Giới thiệu</h5>

                                {sourceSlug === "TruyenFullVn"
                                    ? <span className='d-none novel-description' id='raw-novel-description' >{rawNovelDescription}</span>
                                    : <span className='d-none novel-description' id='raw-novel-description'
                                        dangerouslySetInnerHTML={{ __html: rawNovelDescription }}>
                                    </span>
                                }

                                <span className="text-white mt-0 novel-description">
                                    {isSeeMoreDescription === true
                                        ? novelDescription
                                        : novelDescription?.slice(0, maxLengthTruncatedDescription) + ' ...'
                                    }
                                </span>
                                <div></div>

                                <button className='btn btn-secondary my-2' onClick={() => setIsSeeMoreDescription(!isSeeMoreDescription)}>
                                    {isSeeMoreDescription ? "Thu gọn" : "Xem thêm"}
                                </button>
                            </div>
                            <h5 className="text-white fw-bold mt-3 mb-2">Danh sách chương</h5>
                            <div className="list-group scrollable-list-group mt-3 border border-dark border-4 mb-4 round-pill">
                                {novel.chapters && novel.chapters.length > 0
                                    ? novel.chapters.map((chapter, index) => (
                                        <Link
                                            to={`/source/${sourceSlug}/novel/${novelSlug}/chapter/${chapter.slug}`}
                                            className="list-group-item list-group-item-action border border-double"
                                            key={`novel-chapter-${index}`}
                                        >
                                            <strong>{chapter.title}</strong>
                                        </Link>
                                    ))
                                    : <h5 className='text-white text-center'>Có lỗi xảy ra khi tải danh sách chương, xin vui lòng thử lại !</h5>}
                            </div>
                        </div>
                    </div>

                </>
            )}

            {isLoadingContext === false && <ReactPaginate
                containerClassName='pagination justify-content-center'
                activeClassName='active'
                breakLabel="..."
                nextLabel="Sau >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                pageCount={totalPage}
                previousLabel="< Trước"
                pageClassName='page-item'
                pageLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                renderOnZeroPageCount={null}
                forcePage={currentPage - 1}
            />}

            <ExportNovelFileModal show={isShowExportFileModal} onCancel={handleCancelExportFile} onConfirm={handleConfirmExportFile} />
        </div>
    )
}

export default NovelPage;
