import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NovelPage(props) {

    const defaultNovel = {
        title: `Mushoku Tensei - Old Dragon's Tale`,
        imageURL: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/311151454_441803738051212_5345550456087243642_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGcq4yB9NvQ5r0ZeDkS8a4zKw6RxbcPf9MrDpHFtw9_0_6QJkJDdbsRmH2GnS0a0SWzzOOn1nKRiJ2UEr_cgHZ0&_nc_ohc=fmkLaF8s1-UQ7kNvgFfhqXR&_nc_ht=scontent.fsgn4-1.fna&oh=00_AYDv9FvVwJIMDxxAwNMsYxyMKqQgdZTnAb9c6y5uzCW7Ew&oe=6659FA4D',
        rating: 0.0,
        ratingNum: 0,
        view: 100,
        updatedAt: Date.now(),
        categories: ['Phiêu lưu', 'Thế giới mở', 'Hành động', 'Giả tưởng', 'Xuyên không'],
    }

    const [novel, setNovel] = useState(defaultNovel);

    return (
        <div className='novel-page-container'>
            {/* TODO: Minh Huy làm trang này */}
            {novel &&
                <>
                    <img width={300} src={novel.imageURL} alt={`${novel.title} thumbnail`} />
                    <h4>{novel.title}</h4>

                    <button className='btn btn-primary'>
                        <Link to='/novel/1/chapter/10'>Đọc ngay</Link>
                    </button>
                </>

            }

        </div>
    );
}

export default NovelPage;