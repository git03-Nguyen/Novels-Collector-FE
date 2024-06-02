import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import NovelService from '../../services/detailnovel.s';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import BreadCrumbGenerator from '../../utils/breadCrumbGenerator';
import { NovelContext } from '../../context/NovelContext';

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




    return (
        <div className='novel-page-container'>
            {isLoadingNovelPage === true ?
                <h1 className='loading-message'>... Loading Data ...</h1>
                : <>
                    {novel && novel.cover &&
                        <>
                            <div className="row">
                                <div className="col-md-4 mt-2">
                                    <img width={300} src={novel?.cover} alt={`${novel?.title} thumbnail`} />
                                </div>
                                <div className="col-md-8 text-start">
                                    <h4>{novel?.title}</h4>

                                    <span className="fw-bold">Tác giả: </span>
                                    {novel.authors && novel.authors.length > 0 && novel.authors.map((author, index) => (
                                        <span key={index}>{author.name}{index < novel.authors.length - 1 ? ', ' : ''}</span>
                                    ))}
                                    <br></br>
                                    <span className="fw-bold">Thể loại: </span>
                                    {novel.categories && novel.categories.length > 0 && novel.categories.map((category, index) => (
                                        <span key={index}>{category.name}{index < novel.categories.length - 1 ? ', ' : ''}</span>
                                    ))}

                                    <br></br>
                                    <br></br>

                                    <span className="fw-bold">Điểm đánh giá: {novel.rating} / {novel.maxRating}</span>
                                    <h5>Trạng thái: {novel.status}</h5>
                                    <br></br>


                                    <p>{novel?.description}</p>
                                    <button className='btn btn-primary'>
                                        <Link to='/novel/phong-luu-diem-hiep-truyen-ky/chapter/10'>Đọc ngay</Link>
                                    </button>
                                </div>
                            </div>

                            <h5>Danh sách chương</h5>

                            <div className="chapter-table-container">
                                <table className="table table-bordered border-primary table-hover table-striped chapter-table">
                                    <thead className="table-primary">
                                        <tr>
                                            <th>ID</th>
                                            <th>Nội dung</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-striped">
                                        {novel.chapters && novel.chapters.length > 0 && novel.chapters.map((chapter, index) => (
                                            <tr key={`novel-chapter-${index}`}>
                                                <td>{chapter.title}</td>
                                                <th scope="row">
                                                    <Link to={`/novel/phong-luu-diem-hiep-truyen-ky/chapter/${chapter.slug}`}>
                                                        {chapter.slug}
                                                    </Link>
                                                </th>
                                            </tr>
                                            //                                     <tbody className="table-striped">
                                            //                                         {displayChapters && displayChapters.length > 0 && displayChapters.map((chapter, index) => (
                                            //                                             <tr key={`novel-chapter-${index}`}>
                                            //                                                 <td>{chapter.title}</td>
                                            //                                                 <th scope="row"><Link to={`/novel/phong-luu-diem-hiep-truyen-ky/chapter/${index}`}>{chapter.slug}</Link></th>
                                            //                                             </tr>
                                        ))}
                                    </tbody>
                                </table>
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

        </div>
    );
}

export default NovelPage;