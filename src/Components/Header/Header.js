import { React, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import './Header.css'
import { NovelContext } from '../../context/NovelContext';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import DnDSourceModal from '../DnDSourceModal/DnDSourceModal';

import UserPluginSourcesManager from '../../utils/localStorage/userPluginSourcesManager';
import UserServices from '../../services/user.s';


function Header({ setdarkMode, darkMode }) {
    const { searchValue, setSearchValue, pluginSources, handleSetPluginSources, searchTarget, handleSetSearchTarget } = useContext(NovelContext);
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

        handleSetSearchTarget(e.target.value);

        const selectedOption = e.target.options[e.target.selectedIndex];
        const selectedOptionName = selectedOption.getAttribute('name');
        toast.success(`Đã chuyển tìm kiếm theo ${selectedOptionName}`)
    }

    const handleSearch = () => {
        navigate(`/novel-list?keyword=${searchValue}`);
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
        handleSetPluginSources(newPluginSources);
        toast.success(`Chuyển sang nguồn truyện ${e.target.value} thành công !`)
    }

    const handleCancelDnDSourceModal = () => {
        setIsShowModal(false);
    }

    const handleConfirmDnDSourceModal = (userPluginSources) => {
        handleSetPluginSources(userPluginSources);
        handleCancelDnDSourceModal();
    }

    useEffect(() => {
        setSelectedSource(pluginSources[0]?.name);
    }, [pluginSources])


    const handleGoToAdminPage = async () => {
        try {
            const response = await UserServices.fetchListUsers();
            if (response.statusCode === 200) {
                console.log('List users:', response.data);
                navigate('/admin/dashboard');
            }
            else if (response.statusCode === 401) {
                toast.error(response.message);
                navigate('/login');
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            console.log('Error:', error);
            toast.error(error);
            navigate('/login');
        }
    }
    return (
        <header className='app-header dark:bg-black dark:text-white border-b-2'>
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
                            {pluginSources && pluginSources.length > 0 && pluginSources.map((source, index) => (
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
                    <li><Link className='dropdown-item' onClick={() => handleGoToAdminPage()}>Trang Quản trị</Link></li>

                </ul>
                <button onClick={() => { setdarkMode(!darkMode) }} className='btn btn-secondary'>
                    {!darkMode ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>
                    }
                </button>

            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

        </header>

    );
}

export default Header;