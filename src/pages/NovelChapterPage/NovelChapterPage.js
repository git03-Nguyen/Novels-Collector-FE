import React, { Fragment, useContext, useEffect, useState } from 'react';
import ChapterService from '../../services/chapter.s';

import './NovelChapterPage.css'
import { toast } from 'react-toastify';
import { NovelContext } from '../../context/NovelContext';
import NovelService from '../../services/detailNovel.s';
import { useParams } from 'react-router-dom';
import ChapterStatusConverter from '../../utils/chapterStatusConverter';
function NovelChapterPage(props) {
    const { novelSlug, chapterSlug } = useParams();

    const defaultNovel = {
        title: `Mushoku Tensei - Old Dragon's Tale`,
        imageURL: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/311151454_441803738051212_5345550456087243642_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGcq4yB9NvQ5r0ZeDkS8a4zKw6RxbcPf9MrDpHFtw9_0_6QJkJDdbsRmH2GnS0a0SWzzOOn1nKRiJ2UEr_cgHZ0&_nc_ohc=fmkLaF8s1-UQ7kNvgFfhqXR&_nc_ht=scontent.fsgn4-1.fna&oh=00_AYDv9FvVwJIMDxxAwNMsYxyMKqQgdZTnAb9c6y5uzCW7Ew&oe=6659FA4D',
        rating: 0.0,
        ratingNum: 0,
        categories: ['Phiêu lưu', 'Thế giới mở', 'Hành động', 'Giả tưởng', 'Xuyên không'],
    }

    const { novelContext, setNovelContext, pluginSources, chapterContext, setChapterContext } = useContext(NovelContext);

    const [novel, setNovel] = useState(defaultNovel);
    const [novelChapter, setChapterContent] = useState({});
    const [isLoadingNovelChapterPage, setIsLoadingNovelChapterPage] = useState(true);

    const fetchNovelInfo = async (source, slug) => {
        try {
            const response = await NovelService.fetchDetailNovel(source, slug);
            if (response && response.data && parseInt(response.statusCode) === 200) {
                const newNovelInfo = handleConvertNovelStatusCode(response.data);
                setNovel(newNovelInfo);
                setIsLoadingNovelChapterPage(false);

                setNovelContext(newNovelInfo);
            } else {
                toast.error("Error fetching novel Info: " + response?.message);
            }
        } catch (error) {
            console.error("Error fetching novel Info: " + error.message);
        }
    }

    const handleConvertNovelStatusCode = (newNovel) => {
        return {
            ...newNovel,
            status: ChapterStatusConverter.convertCodeToStatus(newNovel.status)
        }
    }
    // const fetchNovelInfo = async (source, slug) => {
    //     try {
    //         const response = await NovelService.fetchDetailNovel(source, slug);
    //         if (response && response.data && parseInt(response.statusCode) === 200) {
    //             setNovelContext(response.data);
    //             setIsLoadingNovelChapterPage(false);
    //         } else {
    //             toast.error("Error fetching novel Info: " + response?.message);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching novel Info: " + error.message);
    //     }
    // }

    const fetchChapterContent = async () => {
        // TODO: replace this with calling API from server
        try {
            const response = await ChapterService.fetchChapterContent(pluginSources[0].name, novelSlug, chapterSlug);
            if (response && response.data && parseInt(response.statusCode) === 200) {
                setChapterContent(response.data);
                toast.success(response.message);
                let newChapterData = {
                    ...response.data,
                    content: '',
                };
                setChapterContext(newChapterData);
            } else {
                toast.error(response?.message);
            }
        } catch (error) {
            console.error("Error fetching chapter content: " + error.message);
            toast.error(error.message);
        }

    }

    useEffect(() => {
        fetchChapterContent();
    }, [])

    useEffect(() => {
        fetchNovelInfo(pluginSources[0].name, novelSlug);
    }, [])

    return (
        <div className='novel-chapter-page-container'>
            {isLoadingNovelChapterPage === true
                ? <h1 className='loading-message'>... Loading Data ...</h1>
                : <Fragment>
                    <h3>{novelContext.title}</h3>
                    <h5>{novelChapter.title}</h5>
                    <h5>Đánh giá: {novelContext.rating} / {novelContext.maxRating}
                        <span> - </span>
                        Tác giả: {novelContext.authors[0]?.name}
                        <span> - </span>
                        Trạng thái: {novelContext.status}</h5>

                    <div className='novel-chapter-content-container'>
                        {/* {novelChapter.content && novelChapter.content.length > 0 && novelChapter.content.map((line, index) => {
                            return <div key={`content-line-${index}`} dangerouslySetInnerHTML={{ __html: line }}></div>
                        })} */}

                        {novelChapter.content && novelChapter.content.length > 0 &&
                            <div key={`content-chapter-${chapterSlug}`} dangerouslySetInnerHTML={{ __html: novelChapter.content }}></div>
                        }

                    </div>

                    <div className='novel-chapter-footer-navigator'>
                        <button className='btn btn-secondary previous-chapter-btn'>
                            <i className="fa-solid fa-arrow-left-long"></i>
                            <span className='ps-3'>Trước</span>
                        </button>
                        <button className='btn btn-secondary home-btn'>
                            <i className="fa-solid fa-house-user"></i>
                            <span className='ps-3'>Trang chủ</span>
                        </button>
                        <button className='btn btn-secondary next-chapter-btn'>
                            <span className='pe-3'>Sau</span>
                            <i className="fa-solid fa-arrow-right-long"></i>
                        </button>
                    </div>
                </Fragment>}


        </div >
    );
}

export default NovelChapterPage;