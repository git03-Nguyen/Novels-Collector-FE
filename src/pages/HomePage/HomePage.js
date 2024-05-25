import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'

function HomePage(props) {
    return (
        <>
            <div className='app-breadcrumb'>
                <Link to="/">
                    Trang chủ
                </Link>
            </div>

            <div className='homepage-container'>
                <div className='novel-sublists'>
                    <div className='outstanding-sublist'>
                        <strong className='sublist-label'>Truyện nổi bật</strong>
                        <div className='novel-sublist-row'>
                            <div className='novel-card'>
                                <img src='./images/slider/adventure.jpg' alt='Adventure' />
                            </div>
                            <div className='novel-card'>
                                <img src='./images/slider/adventure.jpg' alt='Adventure' />
                            </div>
                            <div className='novel-card'>
                                <img src='./images/slider/adventure.jpg' alt='Adventure' />
                            </div>
                            <div className='novel-card'>
                                <img src='./images/slider/adventure.jpg' alt='Adventure' />
                            </div>
                            <div className='novel-card'>
                                <img src='./images/slider/adventure.jpg' alt='Adventure' />
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>

    );
}

export default HomePage;