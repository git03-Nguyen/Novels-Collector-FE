import React, { Fragment, useContext, useEffect, useState } from 'react';
import ChapterService from '../../services/chapter.s';

import './NovelChapterPage.scss'
import { toast } from 'react-toastify';
import { NovelContext } from '../../context/NovelContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ChapterStatusConverter from '../../utils/chapterStatusConverter';
import DetailNovelService from '../../services/detailnovel.s';
import PluginSourcePerpageGetter from '../../utils/pluginSourcePerpageGetter';
import { UserContext } from '../../context/UserContext';
import UserLatestNovelsManager from '../../utils/localStorage/userLatestNovelsManager';
import UserStyleSettingsManager from '../../utils/localStorage/userStyleSettingsManager';
import ActionBar from '../../Components/ActionBar/ActionBar';
import { LoadingContext } from '../../context/LoadingContext';

function NovelChapterPage({ darkMode }) {
    const navigate = useNavigate();

    const defaultStyleSettings = UserStyleSettingsManager.getUserStyleSettings() ?? {
        fontSize: '16px',
        fontColor: '#ffffff',
        backgroundColor: '#066886',
        fontFamily: 'Arial',
        lineHeight: '1.5',
        fontStyle: 'normal',
    };

    const [curStyleSettings, setCurStyleSettings] = useState(UserStyleSettingsManager.getUserStyleSettings()?.fontSize
        ? UserStyleSettingsManager.getUserStyleSettings()
        : defaultStyleSettings
    );

    const { novelSlug, chapterSlug, sourceSlug } = useParams();

    const { novelContext, setNovelContext, chapterContext, setChapterContext } = useContext(NovelContext);
    const { setUserLatestNovels } = useContext(UserContext);
    const { isLoadingContext, setIsLoadingContext } = useContext(LoadingContext);

    const [chapterID, setChapterID] = useState(chapterContext?.number ?? 0);
    const [isChapterIDFetched, setIsChapterIDFetched] = useState(false);
    const [curChapterSlug, setCurChapterSlug] = useState(chapterSlug);


    const defaultIsDisabledSiblingChapter = {
        previous: false,
        next: false
    }
    const [isDisabledSiblingChapter, setDisabledSiblingChapter] = useState(defaultIsDisabledSiblingChapter);

    const [novelChapter, setChapterContent] = useState({});

    const handleConfirmToolbarModal = (newStyleSettings) => {
        setCurStyleSettings(newStyleSettings);
        toast.success('Thay đổi tùy chỉnh hiển thị nội dung truyện thành công !');
    }

    const fetchNovelInfo = async (source, slug) => {
        try {
            const response = await DetailNovelService.fetchDetailNovel(source, slug);
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

    const saveNovelToUserLatestNovels = (newNovel = novelContext, chapterData = chapterContext) => {
        if (!newNovel || !newNovel?.slug || newNovel?.slug !== novelSlug) {
            return;
        }

        let chapterNumber = newNovel?.chapters?.find(chapter => chapter.slug === curChapterSlug)?.number ?? chapterData?.number;
        const newUserLatestNovels = UserLatestNovelsManager.saveNovelToUserStorage({
            ...newNovel,
            source: sourceSlug,
            chapterID: chapterID,
            chapterSlug: curChapterSlug,
            chapterNumber: chapterNumber,
        });
        if (!newUserLatestNovels) {
            toast.error('Số lượng truyện được lưu đã vượt quá cho phép !')
            return;
        }
        setUserLatestNovels(newUserLatestNovels);
    }

    const updateRelatedData = (newNovelInfo) => {
        // KEY UPDATE
        console.log("NEW NOVEL CONTEXT: ");
        console.log(newNovelInfo);
        setNovelContext(newNovelInfo);

        // NON-KEY UPDATE
        setIsLoadingContext(false);
        console.log("NOVELCHAPTERPAGE: Change loading context to FALSE");
        saveNovelToUserLatestNovels(newNovelInfo);

        let newChapterID = newNovelInfo?.chapters?.findIndex((chapter, index) => chapter.slug === chapterSlug);
        if (newChapterID === -1) {
            return;
        }
        if (chapterID !== newChapterID) {
            setChapterID(newChapterID);
        }

        setDisabledStatusForSiblingChapters(newChapterID, newNovelInfo);
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
                console.log("@@@ NEW CHAPTER CONTENT: ");
                console.log(response.data);
                setChapterContent(response.data);
                toast.success(response.message);
                let newChapterData = {
                    ...response.data,
                    ...response.meta,
                    content: '',
                };
                setChapterContext(newChapterData);

                setIsLoadingContext(false);
                console.log("NOVELCHAPTERPAGE: Change loading context to FALSE");

                saveNovelToUserLatestNovels(novelContext, newChapterData);
            } else {
                toast.error("Error fetching chapter content: " + response?.message);
            }
        } catch (error) {
            console.error("Error fetching chapter content: " + error.message);
            toast.error(error.message);
        }

    }

    const getChapterTitleBySourceSlug = () => {
        if (sourceSlug === "TruyenTangThuVienVn" || sourceSlug === "SSTruyenVn") {
            const chapterInList = novelContext?.chapters?.find((chapter) => chapter?.slug === curChapterSlug);
            if (chapterInList) {
                return chapterInList?.title;
            }
        }
        return novelChapter?.title;
    }

    const setDisabledStatusForSiblingChapters = (chapterIndex = chapterID, newNovelInfo = setNovelContext) => {

        const previousStatus = checkIfChapterIDInList(chapterIndex - 1, newNovelInfo);
        const nextStatus = checkIfChapterIDInList(chapterIndex + 1, newNovelInfo);
        const newDisabledStatusForSiblingChapters = {
            previous: (previousStatus === false) ? true : false,
            next: (nextStatus === false) ? true : false,
        }

        setDisabledSiblingChapter(newDisabledStatusForSiblingChapters);
    }

    const checkIfChapterIDInList = (chapterID, novelInfo = novelContext) => {
        if (!novelInfo?.chapters) {
            return true;
        }

        return (chapterID >= 0 && chapterID < novelInfo?.chapters?.length);
    }

    const handleSiblingChapterClick = async (increment) => {
        console.log("Increment: " + increment);

        const siblingChapterID = parseInt(parseInt(chapterID) + increment);
        console.log("CHAPTER ID: " + chapterID);
        console.log("SIBLING CHAPTER ID: " + siblingChapterID);
        try {
            let newNovelContext = {
                chapters: novelContext.chapters.map((novel => novel)),
                page: novelContext.page,
            }

            if (siblingChapterID < 0 || siblingChapterID >= novelContext?.chapters?.length) {
                console.log("Chapter not found in current page");
                return;
            }

            const siblingChapter = newNovelContext?.chapters[siblingChapterID];
            console.log("Sibling chapter: ");
            console.log(siblingChapter);
            if (!siblingChapter || !siblingChapter?.slug) {
                toast.error("Có lỗi xảy ra khi chuyển chương, vui lòng thử lại sau !");
                return;
            }
            const newChapterSlug = siblingChapter?.slug;


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


    const handleUpdateChapterContent = async (newChapterSlug = curChapterSlug) => {
        console.log(`Calling fetching chapter content for id ${chapterID} and slug: ${newChapterSlug}`);
        scrollToFrontList();
        await fetchChapterContent();

        setIsChapterIDFetched(false);
    }

    const handleChangeNovelPageList = async () => {
        scrollToFrontList();
        await fetchNovelInfo(sourceSlug, novelSlug);
        // setIsLoadingContext(false);
        // console.log("NOVELCHAPTERPAGE: Change loading context to FALSE");

    }

    useEffect(() => {
        setCurChapterSlug(chapterSlug)
        setIsChapterIDFetched(true);
    }, [sourceSlug, chapterSlug])

    useEffect(() => {
        if (isChapterIDFetched === true) {
            setIsLoadingContext(true);
            handleChangeNovelPageList();
            console.log("Have set loading context to TRUE !");
            handleUpdateChapterContent(curChapterSlug);
        }
    }, [chapterID, curChapterSlug, isChapterIDFetched])

    return (
        <div className={`novel-chapter-page-container ${darkMode ? 'dark-mode' : ''}`}>
            <Fragment >
                <h3 id='novel-chapter-container' className=''>{novelContext?.title}</h3>
                <h5 >
                    {`Chương ${novelChapter?.number ?? ''}: ${getChapterTitleBySourceSlug()}`}
                </h5>
                <h5>Đánh giá: {novelContext?.rating} / {novelContext?.maxRating}
                    <span> - </span>
                    Tác giả: {(novelContext?.authors && novelContext?.authors?.length > 0) ? novelContext?.authors[0]?.name : ''}
                    <span> - </span>
                    Trạng thái: {novelContext?.status}</h5>
                <div className='novel-chapter-content-container'>

                    {novelChapter?.content && novelChapter?.content.length > 0 &&
                        <div key={`content-chapter-${chapterSlug}`} className='chapter-content-text'
                            style={{
                                fontSize: curStyleSettings.fontSize,
                                color: curStyleSettings.fontColor,
                                fontFamily: curStyleSettings.fontFamily,
                                lineHeight: curStyleSettings.lineHeight,
                                fontStyle: curStyleSettings.fontStyle,
                                backgroundColor: curStyleSettings.backgroundColor,
                            }}
                            dangerouslySetInnerHTML={{ __html: novelChapter?.content }}></div>
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
            </Fragment>

            {isLoadingContext === false &&
                <ActionBar
                    isDisabledSiblingChapter={isDisabledSiblingChapter}
                    handleSiblingChapterClick={handleSiblingChapterClick}
                    novelName={novelContext?.title ? novelContext.title : ''}
                    novelPoster={novelContext?.cover ?? ''}
                    novelAuthor={(novelContext?.authors && novelContext?.authors?.length > 0) ? novelContext?.authors[0]?.name : ''}
                    chapterList={novelContext?.chapters || []}
                    sourceSlug={sourceSlug}
                    novelSlug={novelSlug}
                    curChapterSlug={curChapterSlug}
                    onConfirmToolbarModal={handleConfirmToolbarModal}
                />
            }

        </div >
    );
}

export default NovelChapterPage;