import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import './ChapterPageSideBar.scss';
import { toast } from "react-toastify";
import { NovelContext } from "../../context/NovelContext";
import DetailNovelService from "../../services/detailnovel.s";
import ChapterService from "../../services/chapter.s";

export default function ChapterPageSideBar({ novelName, novelPoster, novelAuthor, chapterList, sourceSlug, novelSlug, curChapterSlug, handleSiblingChapterClick }) {

    const { novelContext } = useContext(NovelContext);
    const navigate = useNavigate();

    const [curChapterID, setCurChapterID] = useState(4);
    const [isDisplayFullList, setIsDisplayFullList] = useState(false);
    const [displayChapterList, setDisplayChapterList] = useState(chapterList);

    const [otherSources, setOtherSources] = useState([]);
    const [selectedSource, setSelectedSource] = useState(sourceSlug);
    const [rawOtherSources, setRawOtherSources] = useState([]);
    const [otherChapterSources, setOtherChapterSources] = useState([]);

    const [isAllSourcesFetched, setIsAllSourcesFetched] = useState(false);

    const buildPersistDataForOtherSources = () => {
        const bodyRequest = {
            title: novelContext?.title,
            authors: novelContext?.authors?.map(author => author),
        };
        return bodyRequest;
    }

    const handleFetchChapterInOtherSource = async (newRawOtherSources = rawOtherSources) => {
        console.log("Chapter List: ");
        console.log(chapterList);
        console.log("cur chapter slug: " + curChapterSlug);
        const chapterNumber = chapterList?.find(chap => chap?.slug === curChapterSlug)?.number;
        console.log("Fetch for chapter number: " + chapterNumber);
        if (!chapterNumber || !newRawOtherSources || newRawOtherSources?.length <= 0) {

            return;
        }

        try {
            const response = await ChapterService.fetchChapterInOtherSource(sourceSlug, novelSlug, chapterNumber, newRawOtherSources);
            if (response && response?.data && parseInt(response?.statusCode) === 200) {
                const otherChapterSourceData = Object.keys(response?.data)?.map(src => response?.data[src]);

                console.log("Other chapter source: ");
                console.log(otherChapterSourceData);
                setOtherChapterSources(otherChapterSourceData);
                setIsAllSourcesFetched(true);
            } else {
                toast.error("Error fetching other chapter sources: " + response?.message);
            }
        } catch (error) {
            console.log("Error fetching other chapter sources: " + error.message);
        }
    }

    const handleChangeSelectedSource = async (e) => {
        const newSelectedSource = e.target.value;
        setSelectedSource(newSelectedSource);
        if (newSelectedSource === sourceSlug) {
            return;
        }

        const newNovelSlug = otherSources?.find(src => src?.name === newSelectedSource)?.slug;


        const newChapterSlug = otherChapterSources?.find(chap => chap?.source === newSelectedSource && chap?.novelSlug === newNovelSlug)?.slug;
        if (newChapterSlug && newChapterSlug?.length > 0) {
            console.log(`Change to: /source/${newSelectedSource}/novel/${newNovelSlug}/chapter/${newChapterSlug}`);
            // navigate(`/source/${newSelectedSource}/novel/${newNovelSlug}/chapter/${newChapterSlug}`)
            window.location.replace(`/source/${newSelectedSource}/novel/${newNovelSlug}/chapter/${newChapterSlug}`);
        } else {
            toast.error('Nguồn đã chọn không có chương hiện tại, xin thông cảm !');
            setSelectedSource(sourceSlug);
        }
    }

    const fetchOtherSources = async () => {
        const requestingData = buildPersistDataForOtherSources();
        console.log("Requesting data: ");
        console.log(requestingData);
        try {
            const response = await DetailNovelService.fetchOtherSources(sourceSlug, novelSlug, requestingData);
            if (response && response?.data && parseInt(response?.statusCode) === 200) {
                setRawOtherSources(response?.data);
                const otherSourceData = Object.keys(response?.data)?.map(src => {
                    const srcName = response?.data[src];
                    return {
                        ...srcName,
                        name: src,
                    }
                });

                console.log("Other source: ");
                console.log(otherSourceData);
                setOtherSources(otherSourceData);

                await handleFetchChapterInOtherSource(response?.data);
            } else {
                toast.error("Error fetching other sources: " + response?.message);
            }
        } catch (error) {
            console.log("Error fetching other sources: " + error.message);
        }
    }




    const getCurChapterIDFromList = () => {
        console.log("Cur chapter slug: " + curChapterSlug);
        const newCurChapterID = chapterList?.findIndex(chapter => chapter.slug === curChapterSlug);
        if (newCurChapterID === -1) {
            console.log("Error from ChapterPageSideBar: Cur chapter not found in chapter list !");
            return 0;
        } else if (newCurChapterID !== curChapterID) {
            console.log("Change chapter ID to: " + newCurChapterID);
            setCurChapterID(newCurChapterID);
        }

        return newCurChapterID;
    }

    const setActiveChapter = () => {
        displayChapterList?.forEach((chapter, index) => {
            const curChapterButton = document.querySelector(`#recent-novel-offcanvas-card-${index}`)
            if (curChapterButton) {
                if (chapter?.slug === curChapterSlug) {
                    curChapterButton.classList.add('active');
                } else {
                    curChapterButton.classList.remove('active');
                }
            }
        });
    }

    const handleClickChapter = async (destChapterSlug) => {
        const newCurChapterID = getCurChapterIDFromList();
        const destChapterID = chapterList.findIndex(chapter => chapter.slug === destChapterSlug);
        if (destChapterID === -1) {
            toast.error("Error changing chapter: Cannot find destined chapter");
            return;
        }
        handleSiblingChapterClick(parseInt(destChapterID) - parseInt(newCurChapterID));
    }

    useEffect(() => {
        console.log("SOURCE SLUG: " + sourceSlug);
        setIsAllSourcesFetched(false);
        fetchOtherSources();
    }, [sourceSlug])

    useEffect(() => {
        if (isAllSourcesFetched === true) {
            setActiveChapter();
        }
    }, [displayChapterList])


    useEffect(() => {
        if (isAllSourcesFetched === false) {
            return;
        }
        console.log("Call by cur chapter slug chapterList");
        const newChapterID = getCurChapterIDFromList();

        const topListIndex = parseInt(newChapterID / 10) * 10;
        const bottomListIndex = topListIndex + 10;
        const newDisplayChapterList = isDisplayFullList === true ? chapterList : chapterList.slice(topListIndex, bottomListIndex);

        setDisplayChapterList(newDisplayChapterList)
    }, [isDisplayFullList, curChapterID, chapterList, isAllSourcesFetched])

    useEffect(() => {
        if (isAllSourcesFetched === false) {
            return;
        }
        console.log("Call by cur chapter slug ...");
        getCurChapterIDFromList();
    }, [curChapterSlug, isAllSourcesFetched])

    return (
        <div className="offcanvas offcanvas-chapter-pages offcanvas-start"
            data-bs-scroll="true" tabIndex="-1" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title text-white" id="offcanvasLeftLabel">Thông tin truyện - chương</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">

                <div key={`novel-card-${novelSlug}`} className='novel-card-mini'>
                    <Link to={`/source/${sourceSlug}/novel/${novelSlug}`}>
                        <img src={novelPoster || '/novel_cover_placeholder.png'} alt={`Ảnh bìa truyện ${novelName}`} />
                    </Link>
                    <div className='novel-brief-info'>
                        <Link to={`/source/${sourceSlug}/novel/${novelSlug}`}>
                            {novelName?.length <= 30
                                ? <strong>{novelName}</strong>
                                : <strong>{novelName?.slice(0, 30) + ' ...'}</strong>
                            }
                        </Link>
                        <h6 className="text-white">{novelAuthor}</h6>
                        <i>{sourceSlug}</i>
                    </div>
                </div>

                <div className="selected-source-container">
                    <p className="text-white fw-bold mb-1">Nguồn dùng cho chương truyện</p>
                    <select className="form-select " id="source-selection"
                        value={selectedSource} onChange={(e) => handleChangeSelectedSource(e)}
                    >
                        <option value={sourceSlug} name={sourceSlug}>{sourceSlug}</option>
                        <option disabled>──────────</option>

                        {otherSources && otherSources?.length > 0 && otherSources.map((src, index) => {

                            return <option key={`other-source-${src?.name}`} value={src?.name} name={src?.name}>
                                {src?.name}
                            </option>
                        })}
                    </select>
                </div>

                {displayChapterList && displayChapterList?.length > 0
                    ? displayChapterList?.map((chapter, index) => {
                        return <button key={`recent-novel-offcanva-card-${index}`} id={`recent-novel-offcanvas-card-${index}`}
                            className="btn btn-secondary offcanvas-novel-card-mini"
                            onClick={() => handleClickChapter(chapter.slug)}>
                            <span>
                                {sourceSlug !== 'DTruyenCom' && <span>Chương {chapter?.number} - </span>}

                                {chapter.title?.length <= 40
                                    ? chapter.title
                                    : chapter.title.slice(0, 41) + ' ...'
                                }

                            </span>


                        </button>
                    })
                    : <h4 className="text-white">Có lỗi xảy ra khi tải danh sách chương, hãy thử lại sau</h4>}


                <button className="btn btn-secondary my-3"
                    onClick={() => setIsDisplayFullList(!isDisplayFullList)}
                >
                    {isDisplayFullList === true ? "Thu gọn" : "Xem thêm"}
                </button>


            </div>
        </div>
    );
}
