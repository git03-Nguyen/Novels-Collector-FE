import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'
import ListNovelService from '../../services/listnovel.s';
import { NovelContext } from '../../context/NovelContext';
import { toast } from 'react-toastify';
import NovelSidebar from '../../Components/NovelSidebar/NovelSidebar';

function HomePage(props) {
    const { pluginSources } = useContext(NovelContext);

    const [hotNovels, setHotNovels] = useState([]);
    const [latestNovels, setLatestNovels] = useState([]);
    const [completedNovels, setCompletedNovels] = useState([]);

    const [isLoadingHomePage, setIsLoadingHomePage] = useState(false);

    // WARNING: ALWAYS TAKE THE DEFAULT PAGE = 1
    const defaultPage = 1;

    const fetchHotNovels = async () => {
        try {
            const response = await ListNovelService.fetchHotNovels(pluginSources[0].name, defaultPage);
            if (response && response.data && parseInt(response.statusCode) === 200) {
                setHotNovels(response.data);
            } else {
                toast.error("Error fetching hot novel lists: " + response?.message);
            }
        } catch (error) {
            console.error("Error fetching hot novel lists: " + error.message);
        }
    }

    const fetchLatestNovels = async () => {
        try {
            const response = await ListNovelService.fetchLatestNovels(pluginSources[0].name, defaultPage);
            if (response && response.data && parseInt(response.statusCode) === 200) {
                setLatestNovels(response.data);
            } else {
                toast.error("Error fetching latest novel lists: " + response?.message);
            }
        } catch (error) {
            console.error("Error fetching latest novel lists: " + error.message);
        }
    }

    const fetchCompletedNovels = async () => {
        try {
            const response = await ListNovelService.fetchCompletedNovels(pluginSources[0].name, defaultPage);
            if (response && response.data && parseInt(response.statusCode) === 200) {
                setCompletedNovels(response.data);
            } else {
                toast.error("Error fetching completed novel lists: " + response?.message);
            }
        } catch (error) {
            console.error("Error fetching completed novel lists: " + error.message);
        }
    }


    const fetchHomePageContent = () => {
        fetchHotNovels();
        fetchLatestNovels();
        fetchCompletedNovels();

        setIsLoadingHomePage(false);
    }

    useEffect(() => {
        setIsLoadingHomePage(true);
        fetchHomePageContent();
    }, [pluginSources])

    return (
        <>
            {isLoadingHomePage === true
                ? <h1 className='loading-message'>... Loading data ...</h1>
                : <div className='homepage-container'>
                    <div className='homepage-content'>
                        <div className='novel-sublists'>
                            <div className='outstanding-sublist'>
                                <div className='category-info-row'>
                                    <strong className='sublist-label'>Truyện hot</strong>
                                    <Link to='/novel-list'>
                                        <strong className='sublist-label'>Xem thêm</strong>
                                    </Link>
                                </div>
                                <div className='novel-sublist-row'>
                                    {hotNovels && hotNovels?.length > 0 && hotNovels.map((novel, index) => {
                                        return <div key={`hot-novel-card-${index}`} className='novel-card'>
                                            <Link to={`/novel/${novel.slug}`}>
                                                <img src={novel.cover} alt={`Ảnh minh họa truyện ${novel.title}`} />
                                                <h6>{novel.title.length <= 50
                                                    ? novel.title
                                                    : `${novel.title.slice(0, 51) + ' ...'}`
                                                } </h6>
                                            </Link>
                                        </div>
                                    })}
                                </div>
                            </div>

                            <div className='latest-sublist'>
                                <div className='category-info-row'>
                                    <strong className='sublist-label'>Truyện mới nhất</strong>
                                    <Link to='/novel-list'>
                                        <strong className='sublist-label'>Xem thêm</strong>
                                    </Link>
                                </div>
                                <div className='novel-sublist-row'>
                                    {latestNovels && latestNovels?.length > 0 && latestNovels.map((novel, index) => {
                                        return <div key={`hot-novel-card-${index}`} className='novel-card'>
                                            <Link to={`/novel/${novel.slug}`}>
                                                <img src={novel.cover} alt={`Ảnh minh họa truyện ${novel.title}`} />
                                                <h6>{novel.title.length <= 50
                                                    ? novel.title
                                                    : `${novel.title.slice(0, 51) + ' ...'}`
                                                } </h6>
                                            </Link>
                                        </div>
                                    })}

                                </div>
                            </div>

                            <div className='completed-sublist'>
                                <div className='category-info-row'>
                                    <strong className='sublist-label'>Truyện đã hoàn thành</strong>
                                    <Link to='/novel-list'>
                                        <strong className='sublist-label'>Xem thêm</strong>
                                    </Link>
                                </div>
                                <div className='novel-sublist-row'>
                                    {completedNovels && completedNovels?.length > 0 && completedNovels.map((novel, index) => {
                                        return <div key={`hot-novel-card-${index}`} className='novel-card'>
                                            <Link to={`/novel/${novel.slug}`}>
                                                <img src={novel.cover} alt={`Ảnh minh họa truyện ${novel.title}`} />
                                                <h6>{novel.title.length <= 50
                                                    ? novel.title
                                                    : `${novel.title.slice(0, 51) + ' ...'}`
                                                } </h6>
                                            </Link>
                                        </div>
                                    })}

                                </div>
                            </div>

                        </div>
                    </div>

                    <NovelSidebar />
                </div>}

        </>

    );
}

export default HomePage;