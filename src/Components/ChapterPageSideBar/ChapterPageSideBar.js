import React from "react";
import { Link } from "react-router-dom";


export default function ChapterPageSideBar({novelName, novelPoster, novelAuthor, chapterList,sourceSlug, novelSlug }) {
    return (
        <div class="fixed flex flex-col left-0 top-0 w-48 justify-center max-h-[1000px]">
            <div class="flex flex-row bg-slate-900 text-white ">
                <div>{novelPoster}</div>
                <div class="flex flex-col">
                    <div>{novelName}</div>
                    <div>{novelAuthor}</div>
                </div>    
            </div>
            <div class="text-left overflow-y-auto whitespace-normal text-black  bg-white border-black">
                {chapterList && chapterList.length > 0 && chapterList.map((chapter, index) => {
                    return (
                        <div class="px-2 py-1 hover:bg-gray-500">
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
