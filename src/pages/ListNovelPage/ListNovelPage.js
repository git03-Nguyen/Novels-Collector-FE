import React from 'react';
import { Link } from 'react-router-dom';
import './ListNovelPage.css'

function ListNovelPage(props) {
    return (
        <>
            <div className="novel-card ms-1" style={{ width: '14rem' }}>
                <img src="https://rukminim2.flixcart.com/image/850/1000/kk76wsw0/book/s/t/a/the-complete-novels-sherlock-holmes-b-original-imafzhubtkywgr5w.jpeg?q=90&crop=false" className="card-img-top" alt="..." />
                <div className="flex flex-col justify-center px-1.5 pt-px pb-2.5 w-full">
                    <div className="flex gap-1 self-center px-5">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?"
                            className="shrink-0 w-5 aspect-[1.05]"
                        />
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?"
                            className="shrink-0 w-5 aspect-[1.05]"
                        />
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?"
                            className="shrink-0 w-5 aspect-[1.05]"
                        />
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e02566d1446cf77663a1ad7b9220846a5a3d65a95de27ecf844f494726023e?"
                            className="shrink-0 w-5 aspect-[1.05]"
                        />
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc3f1f1f32bf7b31ee15d34d7877e18c3fc55a9b636e1485e1e3353a00f8db4e?"
                            className="shrink-0 w-5 aspect-[1.05] fill-black"
                        />
                    </div>
                    <div className="mt-1.5 text-2xl font-bold leading-8 text-center text-black">
                        Sherlock holmes [FULL]
                    </div>
                    <button type="button" class="btn btn-danger">Đọc ngay</button>

                    <div className="flex gap-1.5 justify-between px-1.5 mt-1.5 w-full text-base leading-6 text-center text-black">
                        <div className="flex gap-1.5 justify-center">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/887cb135afc58e6b9a91786b9c574bc29b0d2777c3cee22055172f7bbd1d6f69?"
                                className="shrink-0 w-9 aspect-[1.12]"
                            />
                            <div>124 lượt đọc</div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
}

export default ListNovelPage;