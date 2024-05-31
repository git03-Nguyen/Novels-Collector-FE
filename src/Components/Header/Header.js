import { React, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'
import { SearchContext } from '../../context/SearchContext';
import CategoryService from '../../services/category.s';

function Header(props) {
    const { searchKeyword, setSearchKeyword } = useContext(SearchContext);


    const defaultCategoryDisplayQuantity = parseInt(window.innerWidth * 0.6 / 110 - 1);

    const [categories, setCategories] = useState([]);
    const [categoryDisplayQuantity, setCategoryDisplayQuantity] = useState(defaultCategoryDisplayQuantity);

    const handleChangeSearchKeyword = (value) => {
        setSearchKeyword(value);
    }

    const handleKeyDown = (e) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            handleSearch();
        }
    }

    const handleSearch = async () => {
        // TODO: replace this with calling API from server
        alert(`You are searching for ${searchKeyword}`)
    }

    const fetchCategories = async () => {
        try {
            let response = await CategoryService.fetchCategories();
            if (response && response.data && response.statusCode === 200) {
                let newCategories = response.data.slice(0, categoryDisplayQuantity);
                setCategories(newCategories);
            } else {
                console.log("Error fetching categories: " + response?.message);
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
                    <input type='text' className='form-control' placeholder='Tìm kiếm tiểu thuyết theo tên, thể loại, tác giả, ...'
                        value={searchKeyword} onChange={(e) => handleChangeSearchKeyword(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)} />
                    <button className='btn btn-primary' onClick={() => handleSearch()}>Tìm kiếm</button>
                </div>
            </div>

            <button className='btn btn-primary dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                <i className='fa-solid fa-gear'></i>
                <span className='ps-2'>Cài đặt</span>
            </button>
            <ul className="dropdown-menu">
                <li><Link className='dropdown-item' to='/admin'>Admin</Link></li>
                <li><Link className='dropdown-item' to='#'>Tài khoản</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className='dropdown-item' to='#'>FAQs</Link></li>
                <li><Link className='dropdown-item' to='#'>Liên hệ</Link></li>

            </ul>
        </header>
    );
}

export default Header;