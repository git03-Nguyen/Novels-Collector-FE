import React, { Fragment, useContext, useEffect, useState } from 'react';
import ChapterService from '../../services/chapter.s';

import './NovelChapterPage.css'
import { toast } from 'react-toastify';
import { NovelContext } from '../../context/NovelContext';
import { useNavigate, useParams } from 'react-router-dom';
import ChapterStatusConverter from '../../utils/chapterStatusConverter';
import DetailNovelService from '../../services/detailnovel.s';
import PluginSourcePerpageGetter from '../../utils/pluginSourcePerpageGetter';
import { UserContext } from '../../context/UserContext';
import UserLatestNovelGetter from '../../utils/userLatestNovelGetter';


function NovelChapterPage(props) {
    const navigate = useNavigate();

    const { novelSlug, chapterSlug, sourceSlug } = useParams();

    const { novelContext, setNovelContext, chapterContext, setChapterContext } = useContext(NovelContext);
    const { setUserLatestNovels } = useContext(UserContext);

    const defaultPerpage = PluginSourcePerpageGetter.getChaptersPerpageByPluginSource(sourceSlug);
    const [perpage, setPerpage] = useState(defaultPerpage);
    const [totalPage, setTotalPage] = useState(1);
    const [chapterID, setChapterID] = useState(chapterContext?.number ?? 1);

    const [curChapterSlug, setCurChapterSlug] = useState(chapterSlug);
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
            const response = await DetailNovelService.fetchDetailNovel(source, slug, currentPage);
            if (response && response.data && parseInt(response.statusCode) === 200) {
                const newNovelInfo = handleConvertNovelStatusCode(response.data);
                updateRelatedData(newNovelInfo)
            } else {
                toast.error("Error fetching novel Info: " + response?.message);
            }
        } catch (error) {
            console.error("Error fetching novel Info: " + error.message);
        }
    }

    const fetchChapterList = async (source = sourceSlug, slug = novelSlug, page = currentPage) => {
        try {
            const response = await DetailNovelService.fetchChapterList(source, slug, page);
            if (response && response.data && parseInt(response.statusCode) === 200) {
                const newNovelInfo = {
                    ...novelContext,
                    chapters: response.data,
                    page: response.meta.page,
                    totalPage: response.meta.totalPage,
                }

                updateRelatedData(newNovelInfo);
                return newNovelInfo;
            } else {
                toast.error("Error fetching novel Info: " + response?.message);
            }
        } catch (error) {
            console.error("Error fetching novel Info: " + error.message);
        }
    }

    const saveNovelToUserLatestNovels = (newNovel) => {
        if (!newNovel || !newNovel?.slug) {
            return;
        }

        const newUserLatestNovels = UserLatestNovelGetter.saveNovelToUserCookie({
            ...newNovel,
            source: sourceSlug,
            chapterID: chapterID,
            chapterSlug: curChapterSlug,
        });
        if (!newUserLatestNovels) {
            toast.error('Số lượng truyện được lưu đã vượt quá cho phép !')
            return;
        }
        setUserLatestNovels(newUserLatestNovels);
    }

    const updateRelatedData = (newNovelInfo) => {
        if (!totalPage || parseInt(totalPage) !== parseInt(newNovelInfo?.chapters?.length)) {
            setTotalPage(parseInt(newNovelInfo.totalPage));
        }

        setIsLoadingNovelChapterPage(false);

        if (!perpage || parseInt(perpage) !== parseInt(newNovelInfo?.chapters?.length)) {
            setPerpage(parseInt(newNovelInfo?.chapters?.length))
        }
        setDisabledStatusForSiblingChapters(newNovelInfo);
        saveNovelToUserLatestNovels(newNovelInfo);

        // KEY UPDATE
        setNovelContext(newNovelInfo);
    }

    const handleConvertNovelStatusCode = (newNovel) => {
        return {
            ...newNovel,
            status: ChapterStatusConverter.convertCodeToStatus(newNovel.status)
        }
    }

    const fetchChapterContent = async () => {
        try {
            const response = await ChapterService.fetchChapterContent(sourceSlug, novelSlug, curChapterSlug);
            if (response && response.data && parseInt(response.statusCode) === 200) {
                setChapterContent(response.data);
                toast.success(response.message);
                let newChapterData = {
                    ...response.data,
                    content: '',
                };

                let newChapterID = response.data.number;
                if (chapterID !== newChapterID) {
                    setChapterID(newChapterID);
                    saveNovelToUserLatestNovels(novelContext);
                }
                const newPage = Math.floor(newChapterID / perpage + 1);
                if (parseInt(newPage) !== parseInt(currentPage)) {
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
        const newDisabledStatusForSiblingChapters = {
            previous: (currentPage === 1 && checkIfChapterIDInList(chapterID - 1) === false) ? true : false,
            next: (currentPage === totalPage && checkIfChapterIDInList(chapterID + 1) === false) ? true : false,
        }

        console.log("Disable status: ");
        console.log(newDisabledStatusForSiblingChapters);
        console.log("novel context: ");
        console.log(newNovelInfo);
        setDisabledSiblingChapter(newDisabledStatusForSiblingChapters);

        // let currentPosition = chapterID % perpage;
        // switch (currentPosition) {
        //     case 0: {
        //         if (chapterID === totalPage) {
        //             return setDisabledSiblingChapter({ previous: false, next: true })
        //         }
        //         return setDisabledSiblingChapter({ previous: false, next: false })
        //     }

        //     case 1: {
        //         if (chapterID === 1) {
        //             return setDisabledSiblingChapter({ previous: true, next: false })
        //         }
        //         return setDisabledSiblingChapter({ previous: false, next: false })
        //     }

        //     case newNovelInfo.chapters.length: {
        //         return setDisabledSiblingChapter({ previous: false, next: true })
        //     }

        //     default: setDisabledSiblingChapter({ previous: false, next: false })
        // }
    }

    const checkIfChapterIDInList = (chapterID, novelInfo = novelContext) => {
        console.log("check for chapter ID: " + chapterID);
        return novelInfo?.chapters?.find(novel => parseInt(novel.id) === parseInt(chapterID)) ? true : false;
    }

    const handleSiblingChapterClick = async (increment) => {

        const siblingChapterID = parseInt(parseInt(chapterID) + increment);
        console.log("sibling chapter id: " + siblingChapterID);
        try {
            let newNovelContext = novelContext.chapters.map((novel => novel));
            if (checkIfChapterIDInList(siblingChapterID) === false) {
                console.log("Chapter not found in current page");
                newNovelContext = await fetchChapterList(sourceSlug, novelSlug, parseInt(currentPage + increment));
            }

            console.log("New novel context: ");
            console.log(newNovelContext);
            const siblingChapter = newNovelContext?.find(novel => {
                // console.log(`novel id ${novel.id} VS sibling chapter id: ${siblingChapterID}`);
                return parseInt(novel.id) === parseInt(siblingChapterID);
            });
            console.log("Sibling chapter: ");
            console.log(siblingChapter);
            const newChapterSlug = siblingChapter?.slug;


            console.log("Chapter slug: " + newChapterSlug);

            setCurChapterSlug(newChapterSlug);
            setChapterID(siblingChapterID);

            navigate(`/source/${sourceSlug}/novel/${novelSlug}/chapter/${newChapterSlug}`)
        } catch (error) {
            console.error("Error fetching new chapter list: " + error.message);
        }
    }

    const scrollToFrontList = () => {
        const frontList = document.querySelector('#novel-chapter-container');
        if (frontList) {
            frontList.scrollIntoView({ behavior: 'smooth' })
        }
    }

    useEffect(() => {
        console.log(`Calling fetching chapter content for id ${chapterID} and slug: ${curChapterSlug}`);
        fetchChapterContent();

        scrollToFrontList();
    }, [chapterID, curChapterSlug])

    useEffect(() => {
        fetchNovelInfo(sourceSlug, novelSlug);
    }, [currentPage])

    return (
        <div className='novel-chapter-page-container'>
            {isLoadingNovelChapterPage === true
                ? <h1 className='loading-message'>... Loading Data ...</h1>
                : <Fragment >
                    <h3 id='novel-chapter-container'>{novelContext.title}</h3>
                    <h5 >Chương {novelChapter.number} {novelChapter.title}</h5>
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