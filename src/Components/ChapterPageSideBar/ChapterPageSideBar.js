import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './ChapterPageSideBar.scss';
import { toast } from "react-toastify";

export default function ChapterPageSideBar({ novelName, novelPoster, novelAuthor, chapterList, sourceSlug, novelSlug, curChapterSlug, handleSiblingChapterClick }) {

    const [curChapterID, setCurChapterID] = useState(4);
    const [isDisplayFullList, setIsDisplayFullList] = useState(false);
    const [displayChapterList, setDisplayChapterList] = useState(chapterList);

    const getCurChapterIDFromList = () => {
        const newCurChapterID = chapterList?.findIndex(chapter => chapter.slug === curChapterSlug);
        if (newCurChapterID === -1) {
            console.log("Error from ChapterPageSideBar: Cur chapter not found in chapter list !");
            return 0;
        } else if (newCurChapterID !== curChapterID) {
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
        setActiveChapter();
    }, [displayChapterList])


    useEffect(() => {
        const newChapterID = getCurChapterIDFromList();
        console.log(`New chapter id: ${newChapterID}`);
        console.log("Sliced chapter list: ");
        console.log(chapterList.slice(newChapterID, newChapterID + 10));
        // console.log(chapterList.slice(newChapterID - 4, newChapterID + 5));

        const topListIndex = parseInt(newChapterID / 10) * 10;
        const bottomListIndex = topListIndex + 10;
        const newDisplayChapterList = isDisplayFullList === true ? chapterList : chapterList.slice(topListIndex, bottomListIndex);

        console.log("New display chapter list: ");
        console.log(newDisplayChapterList);
        setDisplayChapterList(newDisplayChapterList)
    }, [isDisplayFullList, curChapterID, chapterList])

    useEffect(() => {
        getCurChapterIDFromList();
    }, [curChapterSlug])

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
                        <img src={novelPoster} alt={`Ảnh bìa truyện ${novelName}`} />
                    </Link>
                    <div className='novel-brief-info'>
                        <Link to={`/source/${sourceSlug}/novel/${novelSlug}`}>
                            {novelName?.length <= 30
                                ? <strong>{novelName}</strong>
                                : <strong>{novelName?.slice(0, 30) + ' ...'}</strong>
                            }
                        </Link>
                        <br />
                        <h6 className="text-white">{novelAuthor}</h6>
                        <i>{sourceSlug}</i>
                    </div>
                </div>

                {displayChapterList && displayChapterList?.length > 0 &&
                    displayChapterList?.map((chapter, index) => {
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
                    })}

                <button className="btn btn-secondary my-3"
                    onClick={() => setIsDisplayFullList(!isDisplayFullList)}
                >
                    {isDisplayFullList === true ? "Thu gọn" : "Xem thêm"}
                </button>


            </div>
        </div>
    );
}
