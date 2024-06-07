import { React, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'
import { NovelContext } from '../../context/NovelContext';
import { toast } from 'react-toastify';

function Header(props) {
    const { searchKeyword, setSearchKeyword, pluginSources, setPluginSources } = useContext(NovelContext);
    const [searchTarget, setSearchTarget] = useState('keyword');
    const [selectedSource, setSelectedSource] = useState(pluginSources[0].name);

    const handleChangeSearchKeyword = (value) => {
        setSearchKeyword(value);
    }

    const handleKeyDown = (e) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            handleSearch();
        }
    }

    const handleChangeSearchTarget = (e) => {
        setSearchTarget(e.target.value);

        const selectedOption = e.target.options[e.target.selectedIndex];
        const selectedOptionName = selectedOption.getAttribute('name');
        toast.success(`Đã chuyển tìm kiếm theo ${selectedOptionName}`)
    }

    const handleSearch = async () => {
        // TODO: replace this with calling API from server
        alert(`You are searching for ${searchKeyword}`)
    }

    const handleChangeSource = (e) => {
        if (window.confirm(`Bạn có chắc chắn muốn chuyển sang nguồn truyện ${e.target.value} không ?`) === false) {
            return;
        }
        console.log(e.target.value);
        setSelectedSource(e.target.value);
        let newPluginSources = pluginSources.map(src => {
            let newSrc = src;
            if (src.name === e.target.value) {
                newSrc.prior = 2;
            } else {
                newSrc.prior = 1;
            }

            return newSrc;
        })

        newPluginSources.sort((a, b) => b.prior - a.prior);
        setPluginSources(newPluginSources);
        toast.success(`Chuyển sang nguồn truyện ${e.target.value} thành công !`)
    }

    return (
        <header className='app-header'>
            <Link to='/'>
                <img src='/logo.png' className='app-logo' alt='logo' />
            </Link>

            <div className='search-bar'>
                <div className="form-floating">
                    <select className="form-select " id="source"
                        value={searchTarget} onChange={(e) => handleChangeSearchTarget(e)}>
                        <option name="Tên truyện" value="keyword">Tên truyện</option>
                        <option name="Tác giả" value="author">Tác giả</option>
                        <option name="Năm" value="year">Năm</option>
                    </select>
                    <label htmlFor="floatingSelectGrid">Tìm kiếm theo</label>
                </div>

                <input type='text' className='form-control'
                    placeholder='Tìm kiếm truyện, tác giả, ...'
                    value={searchKeyword} onChange={(e) => handleChangeSearchKeyword(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)} />
                <button className='btn btn-primary' onClick={() => handleSearch()}>Tìm kiếm</button>


                <div className="form-floating">
                    <select className="form-select " id="result"
                        value={selectedSource}
                        onChange={(e) => handleChangeSource(e)}>
                        {pluginSources && pluginSources.length > 0 && pluginSources.map((source, index) => (
                            <option key={index} value={source.name}>
                                {source.name}
                            </option>
                        ))}

                    </select>
                    <label htmlFor="floatingSelectGrid">Nguồn Truyện</label>
                </div>



            </div>

            <div className='settings-bar'>
                <button className='btn btn-primary dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                    <i className='fa-solid fa-gear'></i>
                    <span className='ps-2'>Cài đặt</span>
                </button>
                <ul className="dropdown-menu">
                    <li><Link className='dropdown-item' to='/admin'>Admin</Link></li>
                    <li><Link className='dropdown-item' to='/login'>Tài khoản</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className='dropdown-item' to='#'>FAQs</Link></li>
                    <li><Link className='dropdown-item' to='#'>Liên hệ</Link></li>
                </ul>


            </div>


        </header>
    );
}

export default Header;