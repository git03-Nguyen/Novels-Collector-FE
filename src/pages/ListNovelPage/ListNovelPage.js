
import './ListNovelPage.css'
import React from 'react';
function ListNovelPage(props) {
    return (
        <>

            <div className="d-flex w-75 justify-content-between align-items-center mb-3">
                <h3 className="header-title ms-5">Thịnh hành</h3>
                <div className="btn-group">
                    <button type="button" className="btn btn-danger dropdown-toggle me-3" data-bs-toggle="dropdown" aria-expanded="false">
                        Thể loại
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Tiên hiệp</a></li>
                        <li><a className="dropdown-item" href="#">Thế giới mở</a></li>
                        <li><a className="dropdown-item" href="#">Phiêu lưu</a></li>
                        <li><a className="dropdown-item" href="#">Ngôn tình</a></li>
                        <li><a className="dropdown-item" href="#">Hài hước</a></li>
                        <li><a className="dropdown-item" href="#">Xuyên không</a></li>

                    </ul>
                    <button type="button" className="btn btn-danger dropdown-toggle me-3" data-bs-toggle="dropdown" aria-expanded="false">
                        Năm phát hành
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Mới nhất</a></li>
                        <li><a className="dropdown-item" href="#">Cũ nhất</a></li>
                    </ul>
                    <button type="button" className="btn btn-danger dropdown-toggle me-3" data-bs-toggle="dropdown" aria-expanded="false">
                        Số Lượt đọc
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Tăng dần</a></li>
                        <li><a className="dropdown-item" href="#">Giảm dần</a></li>
                    </ul>
                    <button type="button" className="btn btn-danger dropdown-toggle me-3" data-bs-toggle="dropdown" aria-expanded="false">
                        Điểm đánh giá
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Tăng dần</a></li>
                        <li><a className="dropdown-item" href="#">Giảm dần</a></li>
                    </ul>
                    <button type="button" className="btn btn-danger dropdown-toggle me-3" data-bs-toggle="dropdown" aria-expanded="false">
                        Nguồn cung cấp
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Truyen Full</a></li>
                        <li><a className="dropdown-item" href="#">Net Truyen</a></li>
                    </ul>


                </div>
            </div>
            <div className="trending-novel-container">
                <div className="novel-grid">
                    <div className="novel-item">
                        <img src="https://rukminim2.flixcart.com/image/850/1000/kk76wsw0/book/s/t/a/the-complete-novels-sherlock-holmes-b-original-imafzhubtkywgr5w.jpeg?q=90&crop=false" className="novel-thumbnail" alt="..." />
                        <div className="card-body">
                            <div className="flex gap-1 self-center px-5">
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc3f1f1f32bf7b31ee15d34d7877e18c3fc55a9b636e1485e1e3353a00f8db4e?" className="shrink-0 w-5 aspect-[1.05] fill-black" />
                            </div>
                            <div className="mt-1.5 fs-4 fw-bold leading-8 text-center text-black">Sherlock holmes [FULL]</div>
                            <button type="button" className="btn btn-danger">Đọc ngay</button>
                            <div className="flex gap-1.5 justify-between px-1.5 mt-1.5 w-full text-base leading-6 text-center text-black">
                                <div className="flex gap-1.5 justify-center">
                                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/887cb135afc58e6b9a91786b9c574bc29b0d2777c3cee22055172f7bbd1d6f69?" className="shrink-0 w-9 aspect-[1.12]" />
                                    <div>124 lượt đọc</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="novel-item">
                        <img src="https://rukminim2.flixcart.com/image/850/1000/kk76wsw0/book/s/t/a/the-complete-novels-sherlock-holmes-b-original-imafzhubtkywgr5w.jpeg?q=90&crop=false" className="novel-thumbnail" alt="..." />
                        <div className="card-body">
                            <div className="flex gap-1 self-center px-5">
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc3f1f1f32bf7b31ee15d34d7877e18c3fc55a9b636e1485e1e3353a00f8db4e?" className="shrink-0 w-5 aspect-[1.05] fill-black" />
                            </div>
                            <div className="mt-1.5 fs-4 fw-bold leading-8 text-center text-black">Sherlock holmes [FULL]</div>
                            <button type="button" className="btn btn-danger">Đọc ngay</button>
                            <div className="flex gap-1.5 justify-between px-1.5 mt-1.5 w-full text-base leading-6 text-center text-black">
                                <div className="flex gap-1.5 justify-center">
                                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/887cb135afc58e6b9a91786b9c574bc29b0d2777c3cee22055172f7bbd1d6f69?" className="shrink-0 w-9 aspect-[1.12]" />
                                    <div>124 lượt đọc</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="novel-item">
                        <img src="https://rukminim2.flixcart.com/image/850/1000/kk76wsw0/book/s/t/a/the-complete-novels-sherlock-holmes-b-original-imafzhubtkywgr5w.jpeg?q=90&crop=false" className="novel-thumbnail" alt="..." />
                        <div className="card-body">
                            <div className="flex gap-1 self-center px-5">
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc3f1f1f32bf7b31ee15d34d7877e18c3fc55a9b636e1485e1e3353a00f8db4e?" className="shrink-0 w-5 aspect-[1.05] fill-black" />
                            </div>
                            <div className="mt-1.5 fs-4 fw-bold leading-8 text-center text-black">Sherlock holmes [FULL]</div>
                            <button type="button" className="btn btn-danger">Đọc ngay</button>
                            <div className="flex gap-1.5 justify-between px-1.5 mt-1.5 w-full text-base leading-6 text-center text-black">
                                <div className="flex gap-1.5 justify-center">
                                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/887cb135afc58e6b9a91786b9c574bc29b0d2777c3cee22055172f7bbd1d6f69?" className="shrink-0 w-9 aspect-[1.12]" />
                                    <div>124 lượt đọc</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="novel-item">
                        <img src="https://rukminim2.flixcart.com/image/850/1000/kk76wsw0/book/s/t/a/the-complete-novels-sherlock-holmes-b-original-imafzhubtkywgr5w.jpeg?q=90&crop=false" className="novel-thumbnail" alt="..." />
                        <div className="card-body">
                            <div className="flex gap-1 self-center px-5">
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?" className="shrink-0 w-5 aspect-[1.05]" />
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc3f1f1f32bf7b31ee15d34d7877e18c3fc55a9b636e1485e1e3353a00f8db4e?" className="shrink-0 w-5 aspect-[1.05] fill-black" />
                            </div>
                            <div className="mt-1.5 fs-4 fw-bold leading-8 text-center text-black">Sherlock holmes [FULL]</div>
                            <button type="button" className="btn btn-danger">Đọc ngay</button>
                            <div className="flex gap-1.5 justify-between px-1.5 mt-1.5 w-full text-base leading-6 text-center text-black">
                                <div className="flex gap-1.5 justify-center">
                                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/887cb135afc58e6b9a91786b9c574bc29b0d2777c3cee22055172f7bbd1d6f69?" className="shrink-0 w-9 aspect-[1.12]" />
                                    <div>124 lượt đọc</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <nav aria-label="trending-pagination">
                <ul className="pagination my-pagination">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </>

    );
}

export default ListNovelPage;