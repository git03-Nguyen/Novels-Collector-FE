import React from "react";
import { Link } from "react-router-dom";


export default function ChapterPageSideBar({ novelName, novelPoster, novelAuthor, chapterList, sourceSlug, novelSlug }) {
    return (
        <div class="fixed flex flex-col left-0 top-0 w-48 max-h-[1000px]">
            <div class="flex flex-row bg-blue-900 text-white whitespace-normal">
                <img class='object-scale-down w-24 h-24 p-1' src={novelPoster} alt={`${novelPoster} thumbnail`} />
                <div class="flex flex-col text-left">
                    <div class="text-base py-1 line-clamp-2 overflow-hidden h-14 mb-1">{novelName}</div>
                    <div class="text-xs">{novelAuthor}</div>
                </div>    
            </div>
            <div className="text-left overflow-y-auto whitespace-normal text-black  bg-white border-black">
                {chapterList && chapterList.length > 0 && chapterList.map((chapter, index) => {
                    return (
                        <div key={`chapter-side-bar-${index}`} className="px-2 py-1 hover:bg-gray-500">
                            <Link
                                to={`/source/${sourceSlug}/novel/${novelSlug}/chapter/${chapter.slug}`}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                key={`novel-chapter-${index}`}>
                                <div>{chapter.title}</div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
