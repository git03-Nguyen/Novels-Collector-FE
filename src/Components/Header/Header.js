import { React, useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'

import CategoryService from '../../services/category.s';

function Header(props) {
    const [categories, setCategories] = useState([]);
    const [categoryDisplayQuantity, setCategoryDisplayQuantity] = useState(7);


    const fetchCategories = async () => {
        try {
            let response = await CategoryService.fetchCategories();
            if (response && response.data && response.statusCode === 200) {
                let newCategories = response.data.slice(0, categoryDisplayQuantity);
                setCategories(newCategories);
            } else {
                console.log("Error fetching categories: " + response.message);
            }
        } catch (error) {
            console.error("Error fetching categories: " + error.message);
        }
    }




    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <header className='app-header'>
            <Link to='/'>
                <img src='/logo.png' className='app-logo' alt='logo' />
            </Link>
            <div className='search-engine'>
                <div className='category-container'>
                    <div className='category-list'>
                        {categories && categories.map(category => {
                            return <button key={`category-tag-${category.id}`} className='btn btn-primary category-tag'>{category.name}</button>
                        })}
                    </div>

                    <Link >
                        <button className='btn btn-primary category-tag'>Xem thêm ...</button>
                    </Link>
                </div>

                <div className='search-bar'>
                    <button className='btn btn-primary'>
                        <Link to='/novel-list'>Danh sách truyện</Link>
                    </button>
                    <input type='text' className='form-control' placeholder='Tìm kiếm tiểu thuyết theo tên, thể loại, tác giả, ...' />
                    <button className='btn btn-primary'>Tìm kiếm</button>
                </div>
            </div>

            <button className='btn btn-primary dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                <i className='fa-solid fa-gear'></i>
                Cài đặt
            </button>
            <ul className="dropdown-menu">
                <li><Link className='dropdown-item' to='/admin'>Admin</Link></li>
                <li><a className="dropdown-item" href="#">Tài khoản</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Câu hỏi thường gặp</a></li>
                <li><a className="dropdown-item" href="#">Liên hệ</a></li>
            </ul>
        </header>
    );
}

export default Header;