
import './ListNovelPage.css'
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
function ListNovelPage(props) {
    const [totalPage, setTotalPage] = useState(3);

    const handlePageClick = async () => {

    }

    return (
        <>
            <div className="filter-engine d-flex justify-content-between align-items-center my-3">
                <div className="btn-group filter-button-list">
                    <button type="button" className="btn btn-primary dropdown-toggle me-3" data-bs-toggle="dropdown" aria-expanded="false">
                        Tên
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="#">Tăng dần</Link></li>
                        <li><Link className="dropdown-item" to="#">Giảm dần</Link></li>
                    </ul>
                    <button type="button" className="btn btn-primary dropdown-toggle me-3" data-bs-toggle="dropdown" aria-expanded="false">
                        Thể loại
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="#">Tiên hiệp</Link></li>
                        <li><Link className="dropdown-item" to="#">Thế giới mở</Link></li>
                        <li><Link className="dropdown-item" to="#">Phiêu lưu</Link></li>
                        <li><Link className="dropdown-item" to="#">Ngôn tình</Link></li>
                        <li><Link className="dropdown-item" to="#">Hài hước</Link></li>
                        <li><Link className="dropdown-item" to="#">Xuyên không</Link></li>

                    </ul>
                    <button type="button" className="btn btn-primary dropdown-toggle me-3" data-bs-toggle="dropdown" aria-expanded="false">
                        Năm phát hành
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="#">Mới nhất</Link></li>
                        <li><Link className="dropdown-item" to="#">Cũ nhất</Link></li>
                    </ul>
                    <button type="button" className="btn btn-primary dropdown-toggle me-3" data-bs-toggle="dropdown" aria-expanded="false">
                        Số lượt đọc
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="#">Tăng dần</Link></li>
                        <li><Link className="dropdown-item" to="#">Giảm dần</Link></li>
                    </ul>
                    <button type="button" className="btn btn-primary dropdown-toggle me-3" data-bs-toggle="dropdown" aria-expanded="false">
                        Tình trạng
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="#">Đang tiến hành</Link></li>
                        <li><Link className="dropdown-item" to="#">Tạm ngưng</Link></li>
                        <li><Link className="dropdown-item" to="#">Đã hoàn thành</Link></li>
                    </ul>
                    <button type="button" className="btn btn-primary dropdown-toggle me-3" data-bs-toggle="dropdown" aria-expanded="false">
                        Điểm đánh giá
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="#">Tăng dần</Link></li>
                        <li><Link className="dropdown-item" to="#">Giảm dần</Link></li>
                    </ul>
                    <button type="button" className="btn btn-primary dropdown-toggle me-3" data-bs-toggle="dropdown" aria-expanded="false">
                        Nguồn cung cấp
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="#">Truyen Full</Link></li>
                        <li><Link className="dropdown-item" to="#">Net Truyen</Link></li>
                    </ul>


                </div>
                <div className='filter-result'>
                    <h3>Kết quả lọc (4): </h3>
                    <h5 className="header-title ms-5">Thịnh hành</h5>
                </div>

            </div>

            <div className="trending-novel-container">
                <div className="novel-grid">
                    <div className="novel-item">
                        <img alt='novel-thumbnail' src="https://rukminim2.flixcart.com/image/850/1000/kk76wsw0/book/s/t/a/the-complete-novels-sherlock-holmes-b-original-imafzhubtkywgr5w.jpeg?q=90&crop=false" className="novel-thumbnail" />
                        <div className="card-body">
                            <div className="flex gap-1 self-center px-5">
                                <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc3f1f1f32bf7b31ee15d34d7877e18c3fc55a9b636e1485e1e3353a00f8db4e?" className="shrink-0 w-5 aspect-[1.05] fill-black" />
                            </div>
                            <div className="mt-1.5 fs-4 fw-bold leading-8 text-center text-black">Sherlock holmes [FULL]</div>
                            <button type="button" className="btn btn-primary">
                                <Link to={`/novel/1`}>
                                    Xem chi tiết
                                </Link>
                            </button>
                            <div className="flex gap-1.5 justify-between px-1.5 mt-1.5 w-full text-base leading-6 text-center text-black">
                                <div className="flex gap-1.5 justify-center">
                                    <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/887cb135afc58e6b9a91786b9c574bc29b0d2777c3cee22055172f7bbd1d6f69?" className="shrink-0 w-9 aspect-[1.12]" />
                                    <div>124 lượt đọc</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="novel-item">
                        <img alt='novel-thumbnail' src="https://rukminim2.flixcart.com/image/850/1000/kk76wsw0/book/s/t/a/the-complete-novels-sherlock-holmes-b-original-imafzhubtkywgr5w.jpeg?q=90&crop=false" className="novel-thumbnail" />
                        <div className="card-body">
                            <div className="flex gap-1 self-center px-5">
                                <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc3f1f1f32bf7b31ee15d34d7877e18c3fc55a9b636e1485e1e3353a00f8db4e?" className="shrink-0 w-5 aspect-[1.05] fill-black" />
                            </div>
                            <div className="mt-1.5 fs-4 fw-bold leading-8 text-center text-black">Sherlock holmes [FULL]</div>
                            <button type="button" className="btn btn-primary">
                                <Link to={`/novel/1`}>
                                    Xem chi tiết
                                </Link>
                            </button>                            <div className="flex gap-1.5 justify-between px-1.5 mt-1.5 w-full text-base leading-6 text-center text-black">
                                <div className="flex gap-1.5 justify-center">
                                    <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/887cb135afc58e6b9a91786b9c574bc29b0d2777c3cee22055172f7bbd1d6f69?" className="shrink-0 w-9 aspect-[1.12]" />
                                    <div>124 lượt đọc</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="novel-item">
                        <img alt='novel-thumbnail' src="https://rukminim2.flixcart.com/image/850/1000/kk76wsw0/book/s/t/a/the-complete-novels-sherlock-holmes-b-original-imafzhubtkywgr5w.jpeg?q=90&crop=false" className="novel-thumbnail" />
                        <div className="card-body">
                            <div className="flex gap-1 self-center px-5">
                                <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc3f1f1f32bf7b31ee15d34d7877e18c3fc55a9b636e1485e1e3353a00f8db4e?" className="shrink-0 w-5 aspect-[1.05] fill-black" />
                            </div>
                            <div className="mt-1.5 fs-4 fw-bold leading-8 text-center text-black">Sherlock holmes [FULL]</div>
                            <button type="button" className="btn btn-primary">
                                <Link to={`/novel/1`}>
                                    Xem chi tiết
                                </Link>
                            </button>                            <div className="flex gap-1.5 justify-between px-1.5 mt-1.5 w-full text-base leading-6 text-center text-black">
                                <div className="flex gap-1.5 justify-center">
                                    <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/887cb135afc58e6b9a91786b9c574bc29b0d2777c3cee22055172f7bbd1d6f69?" className="shrink-0 w-9 aspect-[1.12]" />
                                    <div>124 lượt đọc</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="novel-item">
                        <img alt='novel-thumbnail' src="https://rukminim2.flixcart.com/image/850/1000/kk76wsw0/book/s/t/a/the-complete-novels-sherlock-holmes-b-original-imafzhubtkywgr5w.jpeg?q=90&crop=false" className="novel-thumbnail" />
                        <div className="card-body">
                            <div className="flex gap-1 self-center px-5">
                                <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc3f1f1f32bf7b31ee15d34d7877e18c3fc55a9b636e1485e1e3353a00f8db4e?" className="shrink-0 w-5 aspect-[1.05] fill-black" />
                            </div>
                            <div className="mt-1.5 fs-4 fw-bold leading-8 text-center text-black">Sherlock holmes [FULL]</div>
                            <button type="button" className="btn btn-primary">
                                <Link to={`/novel/1`}>
                                    Xem chi tiết
                                </Link>
                            </button>                            <div className="flex gap-1.5 justify-between px-1.5 mt-1.5 w-full text-base leading-6 text-center text-black">
                                <div className="flex gap-1.5 justify-center">
                                    <img alt='novel-thumbnail' loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/887cb135afc58e6b9a91786b9c574bc29b0d2777c3cee22055172f7bbd1d6f69?" className="shrink-0 w-9 aspect-[1.12]" />
                                    <div>124 lượt đọc</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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

    );
}

export default ListNovelPage;