import React, { useContext, useEffect, useState } from 'react';

import './NovelSidebar.scss';
import { NovelContext } from '../../context/NovelContext';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

import CategoryService from '../../services/category.s';
import UserLatestNovelsManager from '../../utils/localStorage/userLatestNovelsManager';
import { UserContext } from '../../context/UserContext';

function NovelSidebar(props) {
    const navigate = useNavigate();
    const { pluginSources } = useContext(NovelContext);
    const { userLatestNovels, setUserLatestNovels } = useContext(UserContext);

    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await CategoryService.fetchCategories(pluginSources[0]?.name);
            if (response && response.data && parseInt(response.statusCode) === 200) {
                setCategories(response.data);
            } else {
                toast.error("Error fetching category list: " + response?.message);
            }
        } catch (error) {
            console.error("Error fetching category list: " + error.message);
        }
    }

    const handleClickCategoryBtn = (categorySlug) => {
        navigate(`/novel-list?category=${categorySlug}`);
    }


    const getUserLatestNovelsFromStorage = () => {
        const novels = UserLatestNovelsManager.getUserLatestNovels();
        console.log('user latest novels from storage: ');
        console.log(novels);
        setUserLatestNovels(novels);
    }

    const handleDeleteUserNovel = (index) => {
        if (index < -1 || index > userLatestNovels?.length) {
            toast.error("Xóa truyện không hợp lệ !");
            return;
        }
        if (index === -1) {
            if (window.confirm("Bạn có chắc chắn muốn xóa hết danh sách truyện đã đọc hay không ?")) {
                UserLatestNovelsManager.resetUserNovelStorage();
                setUserLatestNovels([]);
                return;
            }
        }

        if (window.confirm(`Bạn có chắc chắn muốn xóa truyện ${userLatestNovels[index]?.title} không ?`)) {
            const newUserLatestNovels = userLatestNovels?.map(novel => novel);
            newUserLatestNovels?.splice(index, 1);
            setUserLatestNovels(newUserLatestNovels);
            UserLatestNovelsManager.resetUserNovelStorage(newUserLatestNovels);
        }

    }

    useEffect(() => {
        getUserLatestNovelsFromStorage();
    }, [])

    useEffect(() => {
        console.log("pluginSources: ");
        console.log(pluginSources);
        if (pluginSources && pluginSources?.length > 0 && pluginSources[0]?.name?.length > 0) {
            fetchCategories();
        }
    }, [pluginSources])


    return (
        <div className='novel-sidebar-container'>
            <div className='sidebar-section recent-novel-list'>
                <h4 className='section-title'>Truyện vừa đọc</h4>
                <div className='novel-list'>
                    {userLatestNovels && userLatestNovels?.length > 0
                        ? <> {userLatestNovels?.slice(0, 5).map((novel, index) => {
                            return <div key={`recent-novel-card-${index}`} className='novel-card-mini'>
                                <Link to={`/source/${novel?.source}/novel/${novel?.novelSlug}`}>
                                    <img src={novel?.cover ?? '/novel_cover_placeholder.png'} />
                                </Link>
                                <div className='novel-brief-info'>
                                    <Link to={`/source/${novel?.source}/novel/${novel?.novelSlug}`}>
                                        {novel?.title?.length <= 30
                                            ? <strong>{novel?.title}</strong>
                                            : <strong>{novel?.title?.slice(0, 30) + ' ...'}</strong>
                                        }
                                    </Link>
                                    <i>{novel?.source}</i>
                                    {novel?.chapter?.slug &&
                                        <Link to={`/source/${novel?.source}/novel/${novel?.novelSlug}/chapter/${novel?.chapter?.slug}`}>
                                            <span>Chương {novel?.chapter?.number ?? novel?.chapter?.id}</span>
                                        </Link>
                                    }
                                </div>
                            </div>
                        })}
                            <button className="btn btn-primary" type="button"
                                data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                Xem toàn bộ
                            </button>

                            <div className="offcanvas-user-latest-novels offcanvas offcanvas-end"
                                data-bs-scroll="true"
                                tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                <div className="offcanvas-header">
                                    <h5 className="offcanvas-title text-white" id="offcanvasRightLabel">Danh mục truyện vừa đọc</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body">
                                    <div className='offcanvas-description-container'>
                                        <i className='text-white'>Hệ thống chỉ tự động lưu trữ tối đa 10 truyện, truyện cũ nhất sẽ được thay thế khi vượt quá giới hạn này.</i>
                                        <br />
                                        <button className='btn btn-warning delete-user-novel-btn mt-3'
                                            onClick={() => handleDeleteUserNovel(-1)}>
                                            <strong>Xóa hết</strong>
                                        </button>
                                    </div>

                                    {userLatestNovels.map((novel, index) => {
                                        return <div key={`recent-novel-offcanva-card-${index}`} className='offcanvas-novel-card-mini'>
                                            <Link to={`/source/${novel?.source}/novel/${novel?.novelSlug}`}>
                                                <img src={novel?.cover ?? '/novel_cover_placeholder.png'} />
                                            </Link>
                                            <div className='offcanvas-novel-brief-info'>
                                                <Link to={`/source/${novel?.source}/novel/${novel?.novelSlug}`}>
                                                    {novel?.title?.length <= 30
                                                        ? <strong>{novel?.title}</strong>
                                                        : <strong>{novel?.title?.slice(0, 30) + ' ...'}</strong>
                                                    }
                                                </Link>
                                                <i>{novel?.source}</i>
                                                {novel?.chapter?.slug &&
                                                    <Link to={`/source/${novel?.source}/novel/${novel?.novelSlug}/chapter/${novel?.chapter?.slug}`}>
                                                        <span>Chương {novel?.chapter?.number ?? novel?.chapter?.id}</span>
                                                    </Link>
                                                }
                                            </div>
                                            <button className='btn btn-warning delete-user-novel-btn'
                                                onClick={() => handleDeleteUserNovel(index)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </>
                        : <>
                            <span>Bạn chưa đọc truyện nào cả, hãy cùng bắt đầu với một bộ truyện nhé !</span>
                            <Link className='text-white mt-2' to={`/novel-list`}>
                                <button className='btn btn-secondary'>Xem ở đây</button>
                            </Link>
                        </>}
                </div>
            </div>

            <div className='sidebar-section category-list-container'>
                <h4 className='section-title'>Thể loại</h4>
                <div className='category-list'>
                    {categories && categories?.length > 0 && categories.map((category, index) => {
                        return <button key={`category-tag-${index}`} className='btn btn-primary category-tag'
                            onClick={() => handleClickCategoryBtn(category.slug)}>
                            {category.title}
                        </button>
                    })}
                </div>
            </div>

        </div>
    );
}

export default NovelSidebar;