import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import DetailNovelService from '../../services/detailnovel.s';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { NovelContext } from '../../context/NovelContext';
import PluginSourceService from '../../services/pluginSource.s';
import ChapterStatusConverter from '../../utils/chapterStatusConverter';
import './NovelPage.css';
import HTMLToReactParser from '../../utils/htmlToReactParser';

import { domToReact } from 'html-react-parser';

function NovelPage(props) {

    const { novelSlug } = useParams();
    const { pluginSources, setNovelContext } = useContext(NovelContext);

    const [isLoadingNovelPage, setIsLoadingNovelPage] = useState(true);
    const [novel, setNovel] = useState({});
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // Default max length of truncated description = 500
    const maxLengthTruncatedDescription = 500;

    const [novelDescription, setNovelDescription] = useState('');
    const [isSeeMoreDescription, setIsSeeMoreDescription] = useState(false);

    const handleSetNovelDescription = (description) => {
        let newNovelDescription = description;
        if (pluginSources[0].name === "TruyenTangThuVienVn") {
            newNovelDescription = truncateNovelDescription(description);
        }

        setNovelDescription(newNovelDescription);
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

                handleSetNovelDescription(newNovelInfo.description);


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

    const truncateNovelDescription = (desc) => {
        const truncatedDesc = HTMLToReactParser.truncateHtml(desc, maxLengthTruncatedDescription);
        return truncatedDesc;
    }



    useEffect(() => {
        fetchNovelInfo(pluginSources[0].name, novelSlug);
    }, [currentPage]);


    return (
        <div className='novel-page-container'>
            {isLoadingNovelPage === true ?
                <h1 className='loading-message'>... Loading Data ...</h1>
                : <>
                    {novel && novel.cover &&
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
                                                <span className="text-white-50 me-1">{novel?.rating}/{novel?.maxRating}</span>
                                                <div className="d-flex align-items-center">
                                                    {[...Array(parseInt(novel?.rating)) || 0].map((_, index) => (
                                                        <img
                                                            key={index}
                                                            src="https://waka.vn/svgs/icon-star.svg"
                                                            alt="icon-star"
                                                            className="cursor-pointer me-1"
                                                            width="16"
                                                            height="24"
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-white-50 mb-1">
                                                    <span className="text-white-400 ms-2"> <i className="fas fa-eye fs-5 text-light me-1" aria-hidden="true"></i> 124 lượt đọc</span>
                                                </p>
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
                                                <span>{pluginSources[0].name}</span>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="mt-0">
                                        <h5 className="text-white fw-bold mt-3 mb-2">Giới thiệu</h5>

                                        <div className="text-white mt-0 novel-description">
                                            {isSeeMoreDescription === true
                                                ? novelDescription
                                                : novelDescription.slice(0, maxLengthTruncatedDescription) + ' ...'
                                            }
                                        </div>

                                        <button className='btn btn-secondary my-2' onClick={() => setIsSeeMoreDescription(!isSeeMoreDescription)}>
                                            {isSeeMoreDescription === true ? "Thu gọn" : "Xem thêm"}
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
                                                <Link to={`/novel/${novelSlug}/chapter/${chapter.slug}`}>{chapter.slug}</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <ReactPaginate
                                containerClassName='pagination justify-content-center' //important
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
                    }
                </>}
            {/* <BookPreview /> */}
        </div >
    );
}

export default NovelPage;