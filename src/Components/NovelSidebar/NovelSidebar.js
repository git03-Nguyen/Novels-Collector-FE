import React, { useContext, useEffect, useState } from 'react';

import './NovelSidebar.css';
import { NovelContext } from '../../context/NovelContext';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

import RecentNovelsGetter from '../../utils/RecentNovelsGetter';
import CategoryService from '../../services/category.s';

function NovelSidebar(props) {
    const navigate = useNavigate();
    const { pluginSources } = useContext(NovelContext);

    const [recentNovels, setRecentNovels] = useState([]);
    const [categories, setCategories] = useState([]);

    const defaultPage = 1;


    const fetchRecentNovels = async () => {
        try {
            const response = await RecentNovelsGetter.fetchRecentNovels(pluginSources[0].name, defaultPage);
            if (response && response.data && parseInt(response.statusCode) === 200) {
                setRecentNovels(response.data);
            } else {
                toast.error("Error fetching recent novel lists: " + response?.message);
            }
        } catch (error) {
            console.error("Error fetching recent novel lists: " + error.message);
        }
    }

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
        window.location.reload();
    }



    useEffect(() => {
        fetchRecentNovels();
        fetchCategories();
    }, [])


    return (
        <div className='novel-sidebar-container'>
            <div className='sidebar-section recent-novel-list'>
                <h4 className='section-title'>Truyện vừa đọc</h4>
                <div className='novel-list'>
                    {recentNovels && recentNovels?.length && recentNovels.map((novel, index) => {
                        return <div key={`recent-novel-card-${index}`} className='novel-card-mini'>
                            <Link to={`/novel/${novel.slug}`}>
                                <img src={novel?.cover} />
                            </Link>
                            <div className='novel-brief-info'>
                                <Link to={`/novel/${novel.slug}`}>
                                    <strong>{novel.title}</strong>
                                </Link>
                                <i>{novel.source}</i>
                                <Link to={`/novel/${novel.slug}/chapter/${novel.recentChapter.slug}`}>
                                    <span>{novel.recentChapter.title}</span>
                                </Link>

                            </div>
                        </div>
                    })}
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