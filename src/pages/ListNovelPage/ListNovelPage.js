
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

                    <div class="form-floating me-3">
                        <select class="form-select " id="categories">
                            <option selected value="tien-hiep">Tiên hiệp</option>
                            <option value="the-gioi-mo">Thế giới mở</option>
                            <option value="phieu-luu">Phiêu lưu</option>
                            <option value="ngon-tinh">Ngôn tình</option>
                            <option value="hai-huoc">Hài hước</option>
                            <option value="xuyen-khong">Xuyên không</option>
                        </select>
                        <label for="floatingSelectGrid">Thể loại</label>
                    </div>
                    <div className="form-floating me-3">
                        <select className="form-select" id="yearRelease">
                            <option value="1" selected>Mới nhất</option>
                            <option value="2">Cũ nhất</option>

                        </select>
                        <label for="floatingSelectGrid">Năm phát hành</label>
                    </div>
                    <div className="form-floating me-3">
                        <select className="form-select " id="numReaders">
                            <option value="1" selected>Tăng dần</option>
                            <option value="2">Giảm dần</option>

                        </select>
                        <label for="floatingSelectGrid">Số lượt đọc</label>
                    </div>
                    <div className="form-floating me-3">
                        <select className="form-select " id="Status">
                            <option selected value="1">Đang tiến hành</option>
                            <option value="2">Tạm ngưng</option>
                            <option value="3">Đã hoàn thành</option>

                        </select>
                        <label for="floatingSelectGrid">Tình trạng</label>
                    </div>
                    <div className="form-floating me-3">
                        <select className="form-select " id="ratingPoint">
                            <option selected>Tăng dần</option>
                            <option value="1">Giảm dần</option>

                        </select>
                        <label for="floatingSelectGrid">Điểm đánh giá</label>
                    </div>

                    <div className="form-floating">
                        <select className="form-select " id="source">
                            <option selected>PluginCrawlTruyenFull</option>

                        </select>
                        <label for="floatingSelectGrid">Nguồn Truyện</label>
                    </div>


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
                                <Link to={`/novel/phong-luu-diem-hiep-truyen-ky`}>
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
                                <Link to={`/novel/phong-luu-diem-hiep-truyen-ky`}>
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
                                <Link to={`/novel/phong-luu-diem-hiep-truyen-ky`}>
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
                                <Link to={`/novel/phong-luu-diem-hiep-truyen-ky`}>
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
                </div>

            </div>

            <ReactPaginate
                containerclassName='pagination justify-content-center' //important
                activeclassName='active'
                breakLabel="..."
                nextLabel="Next ->"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                pageCount={totalPage}
                previousLabel="<- Previous"
                pageclassName='page-item'
                pageLinkclassName='page-link'
                breakclassName='page-item'
                breakLinkclassName='page-link'
                previousclassName='page-item'
                previousLinkclassName='page-link'
                nextclassName='page-item'
                nextLinkclassName='page-link'
                renderOnZeroPageCount={null}
            />
        </>

    );
}

export default ListNovelPage;