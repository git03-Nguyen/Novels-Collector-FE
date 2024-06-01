import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NovelService from '../../services/detailnovel.s';
import ReactPaginate from 'react-paginate';
import './NovelPage.css';
import { set } from 'lodash';
function NovelPage(props) {

    const defaultNovel = {
        title: `Mushoku Tensei - Old Dragon's Tale`,
        imageURL: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/311151454_441803738051212_5345550456087243642_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGcq4yB9NvQ5r0ZeDkS8a4zKw6RxbcPf9MrDpHFtw9_0_6QJkJDdbsRmH2GnS0a0SWzzOOn1nKRiJ2UEr_cgHZ0&_nc_ohc=fmkLaF8s1-UQ7kNvgFfhqXR&_nc_ht=scontent.fsgn4-1.fna&oh=00_AYDv9FvVwJIMDxxAwNMsYxyMKqQgdZTnAb9c6y5uzCW7Ew&oe=6659FA4D',
        rating: 0.0,
        ratingNum: 0,
        view: 100,
        updatedAt: Date.now(),
        categories: ['Phiêu lưu', 'Thế giới mở', 'Hành động', 'Giả tưởng', 'Xuyên không'],
    }
    const [novel, setNovel] = useState();
    const getNovelInfo = async (source, slug) => {
        const content = await NovelService.fetchDetailNovel(source, slug);
        const data = content.data;
        setNovel(data);
    }

    useEffect(() => {
        getNovelInfo('PluginCrawlTruyenFull', 'phong-luu-diem-hiep-truyen-ky');
    }, []);
    const [itemOffset, setItemOffset] = useState(0);
    console.log(novel);
    const items = novel.chapters;
    const perPage = 8;
    const offset = 0;
    const currentPage = offset / perPage;
    const pageCount = Math.ceil(items.length / perPage);
    const start = offset;
    const end = start + perPage;
    const slice = items.slice(start, end);
    const totalPage = Math.ceil(items.length / perPage);
    const handlePageClick = async (e) => {
        const newOffset = (e.selected * perPage) % items.length;
        setItemOffset(newOffset);
    }
    return (
        <div className='novel-page-container'>
            {novel &&
                <>
                    <div className="row">
                        <div className="col-md-4 mt-2">
                            <img width={300} src={novel.cover} alt={`${novel.title} thumbnail`} />
                        </div>
                        <div className="col-md-8 text-start">
                            <h4>{novel.title}</h4>

                            <span className="fw-bold">Tác giả: </span>
                            {novel.authors.map((author, index) => (
                                <span key={index}>{author.name}{index < novel.authors.length - 1 ? ', ' : ''}</span>
                            ))}
                            <br></br>
                            <span className="fw-bold">Thể loại: </span>
                            {novel.categories.map((categorie, index) => (
                                <span key={index}>{categorie.name}{index < novel.categories.length - 1 ? ', ' : ''}</span>
                            ))}
                            <br></br>
                            <span className="fw-bold">Điểm đánh giá: {novel.rating}</span>
                            <p>{novel.description}</p>
                            <button className='btn btn-primary'>
                                <Link to='/novel/1/chapter/10'>Đọc ngay</Link>
                            </button>
                        </div>
                    </div>

                    <h5>Danh sách chương</h5>
                    <div className="chapter-table-container">
                        <table className="table table-bordered border-secondary table-hover table-striped chapter-table">
                            <thead className="table-primary">
                                <tr>
                                    <th>ID</th>
                                    <th>Nội dung</th>
                                </tr>
                            </thead>
                            <tbody className="table-striped">
                                {novel.chapters.map((chapter, index) => (
                                    <tr >
                                        <th scope="row"><a href="/detailactor/">{chapter.slug}</a></th>
                                        <td>{chapter.title}</td>
                                    </tr>
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
        </div>
    );
}

export default NovelPage;