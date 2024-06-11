import React, { useContext, useEffect, useState } from 'react';

import './NovelSidebar.css';
import { NovelContext } from '../../context/NovelContext';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

import CategoryService from '../../services/category.s';
import UserLatestNovelGetter from '../../utils/localStorage/userLatestNovelGetter';
import { UserContext } from '../../context/UserContext';

function NovelSidebar(props) {
    const navigate = useNavigate();
    const { pluginSources } = useContext(NovelContext);
    const { userLatestNovels, setUserLatestNovels } = useContext(UserContext);

    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await CategoryService.fetchCategories(pluginSources[0].name);
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
        const novels = UserLatestNovelGetter.getUserLatestNovels();
        console.log('user latest novels from storage: ');
        console.log(novels);
        setUserLatestNovels(novels);
    }

    useEffect(() => {
        getUserLatestNovelsFromStorage();
    }, [])

    useEffect(() => {
        fetchCategories();
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
                                    <img src={novel?.cover} />
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
                                            <span>Chương {novel?.chapter?.number}</span>
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
                                    {userLatestNovels.map((novel, index) => {
                                        return <div key={`recent-novel-offcanva-card-${index}`} className='offcanvas-novel-card-mini'>
                                            <Link to={`/source/${novel?.source}/novel/${novel?.novelSlug}`}>
                                                <img src={novel?.cover} />
                                            </Link>
                                            <div className='novel-brief-info'>
                                                <Link to={`/source/${novel?.source}/novel/${novel?.novelSlug}`}>
                                                    {novel?.title?.length <= 30
                                                        ? <strong>{novel?.title}</strong>
                                                        : <strong>{novel?.title?.slice(0, 30) + ' ...'}</strong>
                                                    }
                                                </Link>
                                                <i>{novel?.source}</i>
                                                {novel?.chapter &&
                                                    <Link to={`/source/${novel?.source}/novel/${novel?.novelSlug}/chapter/${novel?.chapter?.slug}`}>
                                                        <span>Chương {novel?.chapter?.number}</span>
                                                    </Link>
                                                }
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </>
                        : <>
                            <span>Bạn chưa đọc truyện nào cả, hãy cùng bắt đầu với một bộ truyện nhé !</span>
                            <Link className='text-white' to={`/novel-list`}>Xem ở đây</Link>
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