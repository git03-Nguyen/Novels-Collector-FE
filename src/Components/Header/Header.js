import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css'


function Header(props) {
    return (
        <header className='app-header'>
            <Link to='/'>
                <img src='./logo.png' className='app-logo' alt='logo' />
            </Link>
            <div className='search-engine'>
                <div className='category-container'>
                    <div className='category-list'>
                        <button className='btn btn-primary category-tag'>Tiên hiệp</button>
                        <button className='btn btn-primary category-tag'>Thế giới mở</button>
                        <button className='btn btn-primary category-tag'>Phiêu lưu</button>
                        <button className='btn btn-primary category-tag'>Ngôn tình</button>
                        <button className='btn btn-primary category-tag'>Hài hước</button>
                        <button className='btn btn-primary category-tag'>Xuyên không</button>
                    </div>

                    <Link >
                        <button className='btn btn-primary category-tag'>Xem thêm ...</button>
                    </Link>
                </div>

                <div className='search-bar'>
                    <input type='text' className='form-control' placeholder='Tìm kiếm tiểu thuyết theo tên, thể loại, tác giả, ...' />
                    <button className='btn btn-primary'>Tìm kiếm</button>
                </div>
            </div>

            <button className='btn btn-primary'>
                <i className='fa-solid fa-gear'></i>
                Cài đặt
            </button>
        </header>
    );
}

export default Header;