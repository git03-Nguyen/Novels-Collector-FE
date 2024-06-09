import React, { Fragment, useContext, useEffect, useState } from 'react';
import ChapterService from '../../services/chapter.s';

import './NovelChapterPage.css'
import { toast } from 'react-toastify';
import { NovelContext } from '../../context/NovelContext';
import { useParams } from 'react-router-dom';
import ChapterStatusConverter from '../../utils/chapterStatusConverter';
import DetailNovelService from '../../services/detailnovel.s';
import PluginSourcePerpageGetter from '../../utils/pluginSourcePerpageGetter';
function NovelChapterPage(props) {
    const { novelSlug, chapterSlug, sourceSlug } = useParams();

    const { novelContext, setNovelContext, chapterContext, setChapterContext } = useContext(NovelContext);

    const defaultPerpage = PluginSourcePerpageGetter.getChaptersPerpageByPluginSource(sourceSlug);
    const [perpage, setPerpage] = useState(defaultPerpage);
    const [totalPage, setTotalPage] = useState(1);
    const [chapterID, setChapterID] = useState(chapterContext?.chapterId ?? 1);

    const [currentPage, setCurrentPage] = useState(parseInt(novelContext?.page ?? 1));


    const defaultIsDisabledSiblingChapter = {
        previous: false,
        next: false
    }
    const [isDisabledSiblingChapter, setDisabledSiblingChapter] = useState(defaultIsDisabledSiblingChapter);

    const [novelChapter, setChapterContent] = useState({});
    const [isLoadingNovelChapterPage, setIsLoadingNovelChapterPage] = useState(true);

    const fetchNovelInfo = async (source, slug) => {
        try {
            console.log('Current page: ' + currentPage);
            const response = await DetailNovelService.fetchDetailNovel(source, slug, currentPage);
            if (response && response.data && parseInt(response.statusCode) === 200) {
                const newNovelInfo = handleConvertNovelStatusCode(response.data);
                console.log("Update related data: ");
                console.log(newNovelInfo);
                updateRelatedData(newNovelInfo)
            } else {
                toast.error("Error fetching novel Info: " + response?.message);
            }
        } catch (error) {
            console.error("Error fetching novel Info: " + error.message);
        }
    }

    const fetchChapterList = async (source, slug) => {
        try {
            const response = await DetailNovelService.fetchChapterList(source, slug, currentPage);
            if (response && response.data && parseInt(response.statusCode) === 200) {
                let newNovelContext = {
                    ...novelContext,
                    chapters: response.data,
                    page: response.meta?.page
                }

                setCurrentPage(newNovelContext.page)
                setNovelContext(newNovelContext);
            } else {
                toast.error("Error fetching novel Info: " + response?.message);
            }
        } catch (error) {
            console.error("Error fetching novel Info: " + error.message);
        }
    }

    const updateRelatedData = (newNovelInfo) => {
        setTotalPage(parseInt(newNovelInfo.totalPage));

        setIsLoadingNovelChapterPage(false);

        setPerpage(parseInt(newNovelInfo?.chapters?.length))
        setNovelContext(newNovelInfo);
        // setCurrentPage(newNovelInfo?.page);
        setDisabledStatusForSiblingChapters(newNovelInfo);


        // const curChapterInList = newNovelInfo.chapters.find((novel) => {
        //     return novel.slug === chapterSlug;
        // })
        // console.log("CurChapterInList: ");
        // console.log(newNovelInfo.chapters);
        // console.log(curChapterInList);
        // if (!curChapterInList) {
        //     setCurrentPage(currentPage + 1);
        // }
    }

    const handleConvertNovelStatusCode = (newNovel) => {
        return {
            ...newNovel,
            status: ChapterStatusConverter.convertCodeToStatus(newNovel.status)
        }
    }

    const fetchChapterContent = async () => {
        // TODO: replace this with calling API from server
        try {
            const response = await ChapterService.fetchChapterContent(sourceSlug, novelSlug, chapterSlug);
            if (response && response.data && parseInt(response.statusCode) === 200) {
                setChapterContent(response.data);
                toast.success(response.message);
                let newChapterData = {
                    ...response.data,
                    content: '',
                };

                let newChapterID = parseInt(response.data?.number);
                setChapterID(newChapterID);
                const newPage = Math.floor(newChapterID / perpage + 1);
                if (parseInt(newPage) !== parseInt(currentPage)) {
                    console.log(`newChapterid: ${newChapterID}`);
                    console.log(`perpage: ${perpage}`);
                    console.log(`newpage ${newPage} VS curpage ${currentPage}`);
                    setCurrentPage(newPage);
                }
                setChapterContext(newChapterData);
            } else {
                toast.error("Error fetching chapter content: " + response?.message);
            }
        } catch (error) {
            console.error("Error fetching chapter content: " + error.message);
            toast.error(error.message);
        }

    }

    const setDisabledStatusForSiblingChapters = (newNovelInfo) => {
        let currentPosition = chapterID % perpage;
        switch (currentPosition) {
            case 0: {
                if (chapterID === totalPage) {
                    return setDisabledSiblingChapter({ previous: false, next: true })
                }
                return setDisabledSiblingChapter({ previous: false, next: false })
            }

            case 1: {
                if (chapterID === 1) {
                    return setDisabledSiblingChapter({ previous: true, next: false })
                }
                return setDisabledSiblingChapter({ previous: false, next: false })
            }

            case newNovelInfo.chapters.length: {
                return setDisabledSiblingChapter({ previous: false, next: true })
            }

            default: setDisabledSiblingChapter({ previous: false, next: false })
        }
    }

    const handleSiblingChapterClick = (increment) => {
        console.log("chapter id: ");
        console.log(chapterID);
        console.log(novelContext);
        console.log(novelContext?.chapters);
        console.log("current novel slug: ");
        const curChapter = novelContext?.chapters.map(novel => {
            return parseInt(novel.id) === chapterID ? novel : undefined;
        })
        console.log(curChapter);
        // navigate(`/source/${sourceSlug}/novel/${novelSlug}/chapter/chuong-${parseInt(chapterID) + increment}`)
        // window.location.replace(`/source/${sourceSlug}/novel/${novelSlug}/chapter/chuong-${parseInt(chapterID) + increment}`);
        // TODO: replace this with more suitable solution
    }



    useEffect(() => {
        fetchChapterContent();
    }, [])

    useEffect(() => {
        // window.setTimeout(() => {
        //     fetchNovelInfo(sourceSlug, novelSlug);
        // }, 2750);

        fetchNovelInfo(sourceSlug, novelSlug);

    }, [currentPage])

    return (
        <div className='novel-chapter-page-container'>
            {isLoadingNovelChapterPage === true
                ? <h1 className='loading-message'>... Loading Data ...</h1>
                : <Fragment>
                    <h3>{novelContext.title}</h3>
                    <h5>Chương {novelChapter.number} {novelChapter.title}</h5>
                    <h5>Đánh giá: {novelContext.rating} / {novelContext.maxRating}
                        <span> - </span>
                        Tác giả: {novelContext.authors[0]?.name}
                        <span> - </span>
                        Trạng thái: {novelContext.status}</h5>
                    <span className='d-none'>Trang: {currentPage} / {totalPage}</span>
                    <div className='novel-chapter-content-container'>

                        {novelChapter.content && novelChapter.content.length > 0 &&
                            <div key={`content-chapter-${chapterSlug}`} dangerouslySetInnerHTML={{ __html: novelChapter.content }}></div>
                        }

                    </div>

                    <div className='novel-chapter-footer-navigator'>
                        <button className='btn btn-secondary previous-chapter-btn'
                            disabled={isDisabledSiblingChapter.previous} onClick={() => handleSiblingChapterClick(-1)}>
                            <i className="fa-solid fa-arrow-left-long"></i>
                            <span className='ps-3'>Trước</span>
                        </button>
                        <button className='btn btn-secondary home-btn'>
                            <i className="fa-solid fa-house-user"></i>
                            <span className='ps-3'>Trang chủ</span>
                        </button>
                        <button className='btn btn-secondary next-chapter-btn'
                            disabled={isDisabledSiblingChapter.next} onClick={() => handleSiblingChapterClick(1)}>
                            <span className='pe-3'>Sau</span>
                            <i className="fa-solid fa-arrow-right-long"></i>
                        </button>
                    </div>
                </Fragment>}


        </div >
    );
}

export default NovelChapterPage;