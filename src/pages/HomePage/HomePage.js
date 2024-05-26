import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'

function HomePage(props) {
    return (
        <>
            <div className='homepage-container'>
                <div className='novel-sublists'>
                    <div className='outstanding-sublist'>
                        <div className='category-info-row'>
                            <strong className='sublist-label'>Truyện top lượt xem</strong>
                            <Link to='/novel-list'>
                                <strong className='sublist-label'>Xem thêm</strong>
                            </Link>
                        </div>
                        <div className='novel-sublist-row'>
                            <div className='novel-card'>
                                <img src='https://i.docln.net/lightnovel/covers/s139-3ce3273e-0659-44b9-a0f9-5c4a3f6604c5-m.jpg' alt='novel' />
                                <h6>Mushoku Tensei - Isekai Ittara Honki Dasu</h6>
                            </div>
                            <div className='novel-card'>
                                <img src='https://i2.docln.net/ln/series/covers/s12957-595fd6ec-610c-4481-b187-172cc7cb4896.jpg' alt='novel' />
                                <h6>Rebuild World</h6>
                            </div>
                            <div className='novel-card'>
                                <img src='https://i.docln.net/lightnovel/covers/s3601-9a25c91a-ffda-4826-9b55-361cb909f9bc-m.jpg' alt='novel' />
                                <h6>Maou Gakuin no Futekigousha</h6>
                            </div>
                            <div className='novel-card'>
                                <img src='https://4.bp.blogspot.com/-SfvDenZRZrk/W3Uf4bf783I/AAAAAAABiIM/0Xj67F0v-A8lBBzYUHfwhBQuKq8uptSawCHMYCw/w215/default.jpg' alt='novel' />
                                <h6>Sevens</h6>
                            </div>
                            <div className='novel-card'>
                                <img src='https://3.bp.blogspot.com/-coc62nTZN9M/WO2v-JFMCuI/AAAAAAAAKBE/Kb8JLmHVElw/w215/series_259.jpg' alt='novel' />
                                <h6>Kumo Desu Ga Nani Ka</h6>
                            </div>
                        </div>
                    </div>

                    <div className='latest-sublist'>
                        <div className='category-info-row'>
                            <strong className='sublist-label'>Truyện mới nhất</strong>
                            <Link to='/novel-list'>
                                <strong className='sublist-label'>Xem thêm</strong>
                            </Link>
                        </div>
                        <div className='novel-sublist-row'>
                            <div className='novel-card'>
                                <img src='https://i.docln.net/lightnovel/covers/s139-3ce3273e-0659-44b9-a0f9-5c4a3f6604c5-m.jpg' alt='novel' />
                                <h6>Mushoku Tensei - Isekai Ittara Honki Dasu</h6>
                            </div>
                            <div className='novel-card'>
                                <img src='https://i2.docln.net/ln/series/covers/s12957-595fd6ec-610c-4481-b187-172cc7cb4896.jpg' alt='novel' />
                                <h6>Rebuild World</h6>
                            </div>
                            <div className='novel-card'>
                                <img src='https://i.docln.net/lightnovel/covers/s3601-9a25c91a-ffda-4826-9b55-361cb909f9bc-m.jpg' alt='novel' />
                                <h6>Maou Gakuin no Futekigousha</h6>
                            </div>
                            <div className='novel-card'>
                                <img src='https://4.bp.blogspot.com/-SfvDenZRZrk/W3Uf4bf783I/AAAAAAABiIM/0Xj67F0v-A8lBBzYUHfwhBQuKq8uptSawCHMYCw/w215/default.jpg' alt='novel' />
                                <h6>Sevens</h6>
                            </div>
                            <div className='novel-card'>
                                <img src='https://3.bp.blogspot.com/-coc62nTZN9M/WO2v-JFMCuI/AAAAAAAAKBE/Kb8JLmHVElw/w215/series_259.jpg' alt='novel' />
                                <h6>Kumo Desu Ga Nani Ka</h6>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>

    );
}

export default HomePage;