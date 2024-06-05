import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import NovelService from '../../services/detailnovel.s';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import BreadCrumbGenerator from '../../utils/breadCrumbGenerator';
import { NovelContext } from '../../context/NovelContext';
import PluginSourceService from '../../services/pluginSource.s';
import ChapterStatusConverter from '../../utils/chapterStatusConverter';
import './NovelPage.css';


function NovelPage(props) {

    const { novelSlug } = useParams();
    const { pluginSources, setNovelContext } = useContext(NovelContext);

    const [isLoadingNovelPage, setIsLoadingNovelPage] = useState(true);
    const [novel, setNovel] = useState({});
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);


    const fetchNovelInfo = async (source, slug) => {
        try {
            const response = await NovelService.fetchDetailNovel(source, slug, currentPage);
            if (response && response.data && parseInt(response.statusCode) === 200) {
                response.data.source = response.meta.source;
                const newNovelInfo = handleConvertNovelStatusCode(response.data);
                setNovel(newNovelInfo);

                setTotalPage(parseInt(newNovelInfo.totalPage));
                setIsLoadingNovelPage(false);

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

    useEffect(() => {
        fetchNovelInfo(pluginSources[0].name, novelSlug);
    }, [currentPage]);

    const [listSources, setListSources] = useState([]);
    const fetchPluginSources = async () => {
        try {
            const response = await PluginSourceService.fetchPluginSources();
            if (response && response.data && parseInt(response.statusCode) === 200) {
                setListSources(response.data);
            } else {
                console.log("Error fetching plugin sources: " + response?.message);
            }
        } catch (error) {
            console.error("Error fetching plugin sources: " + error.message);
        }
    }
    useEffect(() => {
        fetchPluginSources();
    }, []);



    return (
        <div className='novel-page-container'>
            {isLoadingNovelPage === true ?
                <h1 className='loading-message'>... Loading Data ...</h1>
                : <>
                    {novel && novel.cover &&
                        <>
                            <div className="row">
                                <div className="col-md-4 mt-2">
                                    <img className='novel-img' width={320} src={novel?.cover} alt={`${novel?.title} thumbnail`} />
                                </div>
                                <div className="col-md-8 text-start">
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
                                                    <span className="text-white-400 ms-2"> <i class="fas fa-eye fs-5 text-light me-1" aria-hidden="true"></i> 124 lượt đọc</span>
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
                                                    <span key={index}>{category.name}{index < novel.categories.length - 1 ? ', ' : ''}</span>
                                                ))}
                                            </div>
                                            <div className="col">
                                                <p className="text-white fw-bold mb-1">Nguồn truyện</p>
                                                <select className="form-select" id="source-select-box">
                                                    {listSources && listSources.length > 0 && listSources.map((source, index) => (
                                                        <option key={index} value={source.name}>{source.name}</option>
                                                    ))}

                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="mt-0">
                                        <h5 className="text-white fw-bold mt-3 mb-2">Giới thiệu</h5>
                                        <p className="text-white mt-0 novel-description">{novel?.description}</p>
                                    </div>
                                    <button className='btn btn-primary'>
                                        <Link to='/novel/1/chapter/10'>Đọc ngay</Link>
                                    </button>
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
                                                <Link to={`/novel/phong-luu-diem-hiep-truyen-ky/chapter/${index}`}>{chapter.slug}</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <ReactPaginate
                                containerClassName='pagination justify-content-center' //important
                                activeClassName='active'
                                breakLabel="..."
                                nextLabel="Next ->"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                marginPagesDisplayed={2}
                                pageCount={totalPage}
                                previousLabel="<- Previous"
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