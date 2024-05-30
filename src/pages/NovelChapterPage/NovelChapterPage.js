import React, { useEffect, useState } from 'react';
import ChapterService from '../../services/chapter.s';

import './NovelChapterPage.css'
import { toast } from 'react-toastify';
function NovelChapterPage(props) {
    const defaultNovel = {
        title: `Mushoku Tensei - Old Dragon's Tale`,
        imageURL: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/311151454_441803738051212_5345550456087243642_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGcq4yB9NvQ5r0ZeDkS8a4zKw6RxbcPf9MrDpHFtw9_0_6QJkJDdbsRmH2GnS0a0SWzzOOn1nKRiJ2UEr_cgHZ0&_nc_ohc=fmkLaF8s1-UQ7kNvgFfhqXR&_nc_ht=scontent.fsgn4-1.fna&oh=00_AYDv9FvVwJIMDxxAwNMsYxyMKqQgdZTnAb9c6y5uzCW7Ew&oe=6659FA4D',
        rating: 0.0,
        ratingNum: 0,
        categories: ['Phiêu lưu', 'Thế giới mở', 'Hành động', 'Giả tưởng', 'Xuyên không'],
    }

    const [novel, setNovel] = useState(defaultNovel);
    const [novelChapter, setChapterContent] = useState({});


    const fetchChapterContent = async () => {
        // TODO: replace this with calling API from server
        try {
            const response = await ChapterService.fetchChapterContent();
            if (response && response.data && parseInt(response.statusCode) === 200) {
                setChapterContent(response.data);
                toast.success(response.message);
            } else {
                console.log("Error fetching chapter content: " + response?.message);
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

    return (
        <div className='novel-chapter-page-container'>
            <h3>{novel.title}</h3>
            <h5>Chương {novelChapter.number}: {novelChapter.title}</h5>
            <h5>Lượt xem: {novelChapter.view} - Độ dài: {novelChapter.length} từ - Cập nhật: {novelChapter.updatedAt}</h5>

            <div className='novel-chapter-content-container'>
                {novelChapter.content && novelChapter.content.length > 0 && novelChapter.content.map((line, index) => {
                    return <div key={`content-line-${index}`} dangerouslySetInnerHTML={{ __html: line }}></div>
                })}

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
        </div >
    );
}

export default NovelChapterPage;