import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './HomePage.css'
import ListNovelService from '../../services/listnovel.s';
import { NovelContext } from '../../context/NovelContext';
import { toast } from 'react-toastify';
import NovelSidebar from '../../Components/NovelSidebar/NovelSidebar';
import { LoadingContext } from '../../context/LoadingContext';
import UserPluginSourcesManager from '../../utils/localStorage/userPluginSourcesManager';

function HomePage(props) {
    const { pluginSources, setPluginSources } = useContext(NovelContext);
    const { isLoadingContext, setIsLoadingContext } = useContext(LoadingContext);
    const [isHomeContentFetched, setIsHomeContentFetched] = useState(false);

    const { sourceSlug } = useParams();
    const [hotNovels, setHotNovels] = useState([]);
    const [latestNovels, setLatestNovels] = useState([]);
    const [completedNovels, setCompletedNovels] = useState([]);

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

    const handleSetupPluginSourceByParams = () => {
        if (sourceSlug === "" || !sourceSlug) {
            return;
        } else if (sourceSlug === pluginSources[0].name) {
            return;
        }

        console.log("Old source: ");
        console.log(pluginSources);
        const newPluginSource = pluginSources.map((src, index) => {
            return {
                ...src,
                prior: src.name === sourceSlug ? 2 : 1,
            }
        })
        newPluginSource.sort((a, b) => b.prior - a.prior)

        console.log("New plugin source: ");
        console.log(newPluginSource);
        setPluginSources(newPluginSource);
        UserPluginSourcesManager.savePluginSources(newPluginSource);
    }


    const fetchHomePageContent = async () => {
        await fetchHotNovels();
        await fetchLatestNovels();
        await fetchCompletedNovels();

        setIsLoadingContext(false);
        console.log("Change loading context to false !!!");
    }

    useEffect(() => {
        console.log("Set upppppp !!!!!");
        handleSetupPluginSourceByParams();
        setIsHomeContentFetched(true);
    }, [sourceSlug])

    useEffect(() => {
        if (isHomeContentFetched === true) {
            setIsLoadingContext(true);
            console.log("Change loading context to true !!!");
            console.log("Plugin sources: ");
            console.log(pluginSources);
            fetchHomePageContent();
        }
    }, [pluginSources])


    return (
        <div className='homepage-container dark:bg-black dark:text-white'>
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
                                    <Link to={`/source/${pluginSources[0].name}/novel/${novel.slug}`}>
                                        <img src={novel.cover} alt={`Ảnh minh họa truyện ${novel.title}`} />
                                        <h6>{novel.title.length <= 30
                                            ? novel.title
                                            : `${novel.title.slice(0, 31) + ' ...'}`
                                        } </h6>
                                        <span>{novel.authors[0].name}</span>
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
                                    <Link to={`/source/${pluginSources[0].name}/novel/${novel.slug}`}>
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
                                    <Link to={`/source/${pluginSources[0].name}/novel/${novel.slug}`}>
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
        </div>
    );
}

export default HomePage;