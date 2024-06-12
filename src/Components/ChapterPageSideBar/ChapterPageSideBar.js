import React from "react";
import { Link } from "react-router-dom";


export default function ChapterPageSideBar({novelName, novelPoster, novelAuthor, chapterList}) {

    return (
        <div class="fixed flex flex-col left-0 bg-gray-200 justify-center">
            <div class="flex flex-row">
                <div>{novelPoster}</div>
                <div class="flex flex-col">
                    <div>{novelName}</div>
                    <div>{novelAuthor}</div>
                </div>    
            </div>
            <div>
                {chapterList.map((chapter, index) => {
                    return (
                        <Link to={`/chapter/${chapter.id}`} key={`chapter-${index}`} class="py-3 px-3 bg-gray-800 hover:bg-gray-300 cursor-pointer border border-gray-200" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div>{chapter.name}</div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}