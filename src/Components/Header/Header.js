import { React, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import './Header.css'
import { NovelContext } from '../../context/NovelContext';
import { toast } from 'react-toastify';
import DnDSourceModal from '../DnDSourceModal/DnDSourceModal';
import UserPluginSourcesManager from '../../utils/localStorage/userPluginSourcesManager';

function Header({ setdarkMode, darkMode }) {
    const { searchValue, setSearchValue, pluginSources, setPluginSources, searchTarget, setSearchTarget } = useContext(NovelContext);
    const [selectedSource, setSelectedSource] = useState(pluginSources[0]?.name);

    const [isShowModal, setIsShowModal] = useState(false);

    const navigate = useNavigate();
    const handleChangeSearchKeyword = (value) => {
        setSearchValue(value);
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

    const handleSearch = () => {
        navigate(`/novel-list?${searchTarget}=${searchValue}`);
    }

    const handleChangeSource = (e) => {
        if (parseInt(e.target.value) === 1) {
            setIsShowModal(true);
            return;
        }

        if (window.confirm(`Bạn có chắc chắn muốn chuyển sang nguồn truyện ${e.target.value} không ?`) === false) {
            return;
        }
        console.log(e.target.value);
        setSelectedSource(e.target.value);
        let newPluginSources = pluginSources.map(src => {
            let newSrc = src;
            if (src?.name === e.target.value) {
                newSrc.prior = 2;
            } else {
                newSrc.prior = 1;
            }

            return newSrc;
        })

        newPluginSources.sort((a, b) => b.prior - a.prior);
        setPluginSources(newPluginSources);
        navigate(`/source/${e.target.value}`)
        toast.success(`Chuyển sang nguồn truyện ${e.target.value} thành công !`)
    }

    const handleCancelDnDSourceModal = () => {
        setIsShowModal(false);
    }

    const handleConfirmDnDSourceModal = (userPluginSources) => {
        UserPluginSourcesManager.savePluginSources(userPluginSources);
        setPluginSources(userPluginSources);
        handleCancelDnDSourceModal();
    }

    useEffect(() => {
        setSelectedSource(pluginSources[0]?.name);
    }, [pluginSources])

    return (
        <header className='app-header dark:bg-black dark:text-white'>
            <Link to='/'>
                <img src='/logo.png' className='app-logo' alt='logo' />
            </Link>

            <div className='search-bar'>
                <div className="form-floating">
                    <select className="form-select " id="source"
                        value={searchTarget} onChange={(e) => handleChangeSearchTarget(e)}>
                        <option name="Tất cả" value="keyword">Tất cả</option>
                        <option name="Tên truyện" value="title">Tên truyện</option>
                        <option name="Tác giả" value="author">Tác giả</option>
                    </select>
                    <label htmlFor="floatingSelectGrid">Tìm kiếm theo</label>
                </div>

                <input type='text' className='form-control'
                    placeholder='Tìm kiếm truyện, tác giả, ...'
                    value={searchValue} onChange={(e) => handleChangeSearchKeyword(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)} />
                <button className='btn btn-primary' onClick={() => handleSearch()}>Tìm kiếm</button>



                <div>
                    <DnDSourceModal
                        show={isShowModal}
                        onCancel={handleCancelDnDSourceModal} onConfirm={handleConfirmDnDSourceModal}
                    />

                    <div className="form-floating">
                        <select className="form-select " id="result"
                            value={selectedSource}
                            onChange={(e) => handleChangeSource(e)}>
                            {pluginSources && pluginSources?.length > 0 && pluginSources?.map((source, index) => (
                                <option key={index} value={source?.name}>
                                    {source?.name}
                                </option>
                            ))}
                            <option disabled>──────────</option>
                            <option value={1}>Quản lý nguồn truyện</option>

                        </select>
                        <label htmlFor="floatingSelectGrid">Nguồn Truyện</label>
                    </div>
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

            <button onClick={() => {
                setdarkMode(!darkMode)

            }} className="absolute dark:bg-white dark:text-black right-5 top-5 bg-black text-white px-2 py-2 rounded hover:bg-stone-700">
                {!darkMode ? "Light" : "Dark"} Mode
            </button>

        </header>
    );
}

export default Header;