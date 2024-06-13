import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import './ChapterPageSideBar.scss';

export default function ChapterPageSideBar({ novelName, novelPoster, novelAuthor, chapterList, sourceSlug, novelSlug, curChapterSlug, handleSiblingChapterClick }) {

    const setActiveChapter = () => {
        chapterList?.forEach((chapter, index) => {
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

    const handleClickChapter = async (destChapterID) => {
        const curChapterID = chapterList?.findIndex(chapter => chapter.slug === curChapterSlug);
        if (curChapterID === -1) {
            console.log("Error from ChapterPageSideBar: Cur chapter not found in chapter list !");
            return;
        }

        handleSiblingChapterClick(parseInt(destChapterID) - parseInt(curChapterID));
    }


    useEffect(() => {
        setActiveChapter();
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

                {chapterList && chapterList?.length > 0 && chapterList?.map((chapter, index) => {
                    return <button key={`recent-novel-offcanva-card-${index}`} id={`recent-novel-offcanvas-card-${index}`}
                        className="btn btn-secondary offcanvas-novel-card-mini"
                        onClick={() => handleClickChapter(index)}>
                        <span>
                            {sourceSlug !== 'DTruyenCom' && <span>Chương {chapter?.number} - </span>}

                            {chapter.title?.length <= 40
                                ? chapter.title
                                : chapter.title.slice(0, 41) + ' ...'
                            }

                        </span>


                    </button>
                })}

            </div>
        </div>
    );
}
