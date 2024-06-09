import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DetailNovelService from '../../services/detailnovel.s';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { NovelContext } from '../../context/NovelContext';
import ChapterStatusConverter from '../../utils/chapterStatusConverter';
import './NovelPage.css';
import HTMLToReactParser from '../../utils/htmlToReactParser';

function NovelPage(props) {
    const navigate = useNavigate();

    const { novelSlug, sourceSlug } = useParams();
    const { setNovelContext, setChapterContext } = useContext(NovelContext);

    const [isLoadingNovelPage, setIsLoadingNovelPage] = useState(true);
    const [novel, setNovel] = useState({});
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewStars, setReviewStars] = useState([]);

    // Default max length of truncated description = 500
    const maxLengthTruncatedDescription = 500;

    const [rawNovelDescription, setRawNovelDescription] = useState('');
    const [novelDescription, setNovelDescription] = useState('');
    const [isSeeMoreDescription, setIsSeeMoreDescription] = useState(false);






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

                setTotalPage(parseInt(newNovelInfo.totalPage));
                setIsLoadingNovelPage(false);

                handleSetRawNovelDescription(newNovelInfo.description);

                handleSetReviewStars(newNovelInfo.rating, newNovelInfo.maxRating);
                setNovelContext(newNovelInfo);
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

    const handleClickChapter = (chapter, index) => {
        let newChapterContext = {
            ...chapter,
            chapterId: parseInt(index) + 1,
        };
        setChapterContext(newChapterContext);
        navigate(`/source/${sourceSlug}/novel/${novelSlug}/chapter/${chapter.slug}`);
    }


    const getInnerTextOfDescription = () => {
        const descriptionText = window.document.querySelector('#raw-novel-description');
        const description = descriptionText?.innerText ?? '';

        setNovelDescription(description);
    }

    useEffect(() => {
        fetchNovelInfo(sourceSlug, novelSlug);
        getInnerTextOfDescription();
    }, [currentPage]);

    useEffect(() => {
        getInnerTextOfDescription();
    }, [rawNovelDescription])


    return (
        <div className='novel-page-container'>
            {isLoadingNovelPage ? (
                <h1 className='loading-message'>... Loading Data ...</h1>
            ) : (
                <>
                    {novel && novel.cover && (
                        <>
                            <div className="row w-100">
                                <div className="col-md-4 mt-2">
                                    <img className='novel-img' src={novel?.cover} alt={`${novel?.title} thumbnail`} />
                                </div>
                                <div className="col-md-8 text-start px-0">
                                    <div className="pb-4 border-bottom border-white-50">
                                        <h2 className="text-white fw-bold mb-1">{novel?.title}</h2>
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
                                                <p className="text-white fw-bold mb-1">Nguồn truyện</p>
                                                <span>{sourceSlug}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-0">
                                        <h5 className="text-white fw-bold mt-3 mb-2">Giới thiệu</h5>

                                        {(sourceSlug === "DTruyenCom" || sourceSlug === "TruyenTangThuVienVn")
                                            ? <span className='d-none' id='raw-novel-description' dangerouslySetInnerHTML={{ __html: rawNovelDescription }}></span>
                                            : <span className='d-none' id='raw-novel-description' >{rawNovelDescription}</span>
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
                                </div>
                            </div>
                            <div className="accordion accordion-flush chapter-accordion mt-4" id="accordion-list-chapter">
                                <h4 >Danh sách chương</h4>

                                {novel.chapters && novel.chapters.length > 0 && novel.chapters.map((chapter, index) => (
                                    <div className="accordion-item" key={`novel-chapter-${index}`}>
                                        <h2 className="accordion-header" id={`flush-heading${index}`}>
                                            <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${index}`} aria-expanded="false" aria-controls={`flush-collapse${index}`}>
                                                {chapter.title}
                                            </button>
                                        </h2>
                                        <div id={`flush-collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`flush-heading${index}`} data-bs-parent="#accordionl-list-chapter">
                                            <div className="accordion-body">
                                                <button className='btn btn-secondary'
                                                    onClick={() => handleClickChapter(chapter, index)}>
                                                    {chapter.title}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    <ReactPaginate
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
                    />
                </>
            )}
        </div>
    )
}

export default NovelPage;
