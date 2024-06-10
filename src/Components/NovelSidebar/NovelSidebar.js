import React, { useContext, useEffect, useState } from 'react';

import './NovelSidebar.css';
import { NovelContext } from '../../context/NovelContext';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

import CategoryService from '../../services/category.s';
import UserLatestNovelGetter from '../../utils/userLatestNovelGetter';
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


    const getUserLatestNovelsFromCookie = () => {
        const novels = UserLatestNovelGetter.getUserLatestNovels();
        console.log('user latest novels from cookie: ');
        console.log(novels);
        setUserLatestNovels(novels);
    }

    useEffect(() => {
        getUserLatestNovelsFromCookie();
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
                        ? <> {userLatestNovels.map((novel, index) => {
                            return <div key={`recent-novel-card-${index}`} className='novel-card-mini'>
                                <Link to={`/source/${novel?.source}/novel/${novel?.novelSlug}`}>
                                    <img src={novel?.cover} />
                                </Link>
                                <div className='novel-brief-info'>
                                    <Link to={`/source/${novel?.source}/novel/${novel?.novelSlug}`}>
                                        <strong>{novel?.title}</strong>
                                    </Link>
                                    <i>{novel?.source}</i>
                                    {novel?.chapter &&
                                        <Link to={`/source/${novel?.source}/novel/${novel?.novelSlug}/chapter/${novel?.chapter?.slug}`}>
                                            <span>Chương {novel?.chapter?.id}</span>
                                        </Link>
                                    }
                                </div>
                            </div>
                        })}
                            <Link className='watch-full-user-list-btn' to={`/user-list`}>Xem toàn bộ</Link>
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