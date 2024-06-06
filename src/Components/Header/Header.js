import { React, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'
import CategoryService from '../../services/category.s';
import { NovelContext } from '../../context/NovelContext';
import PluginSourceService from '../../services/pluginSource.s';
function Header(props) {
    const { searchKeyword, setSearchKeyword } = useContext(NovelContext);

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
            if (response && response.data && parseInt(response.statusCode) === 200) {
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
        <header className='app-header'>
            <div className='search-engine'>

                <div className='category-container'>
                    <Link to='/'>
                        <img src='/logo.png' className='app-logo' alt='logo' />
                    </Link>
                    <div className='category-list'>
                        {categories && categories.map(category => {
                            return <button key={`category-tag-${category.id}`} className='btn btn-primary category-tag'>{category.name}</button>
                        })}

                        <Link >
                            <button className='btn btn-primary category-tag'>Xem thêm ...</button>
                        </Link>
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
                </div>

                <div className='search-bar'>
                    <div className="form-floating">
                        <select className="form-select " id="source">
                            <option value="hot-novel">Truyện Hot</option>
                            <option value="full-novel">Truyện Full</option>
                            <option value="new-novel">Truyện Mới Cập nhật</option>
                            <option value="more-novel">Wating for calling API</option>
                        </select>
                        <label for="floatingSelectGrid">Danh sách Truyện</label>
                    </div>
                    <input type='text' className='form-control' placeholder='Tìm kiếm tiểu thuyết theo tên, thể loại, tác giả, ...'
                        value={searchKeyword} onChange={(e) => handleChangeSearchKeyword(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)} />
                    <button className='btn btn-primary' onClick={() => handleSearch()}>Tìm kiếm</button>
                    <div className="form-floating">
                        <select className="form-select " id="source">
                            {listSources && listSources.length > 0 && listSources.map((source, index) => (
                                <option key={index} value={source.name}>{source.name}</option>
                            ))}

                        </select>
                        <label for="floatingSelectGrid">Nguồn Truyện</label>
                    </div>
                </div>

            </div>


        </header>
    );
}

export default Header;