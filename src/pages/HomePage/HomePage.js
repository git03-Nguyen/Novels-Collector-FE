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
                                <Link to='/novel/phong-luu-diem-hiep-truyen-ky'>
                                    <img src='https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/311151454_441803738051212_5345550456087243642_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGcq4yB9NvQ5r0ZeDkS8a4zKw6RxbcPf9MrDpHFtw9_0_6QJkJDdbsRmH2GnS0a0SWzzOOn1nKRiJ2UEr_cgHZ0&_nc_ohc=fmkLaF8s1-UQ7kNvgFfhqXR&_nc_ht=scontent.fsgn4-1.fna&oh=00_AYDv9FvVwJIMDxxAwNMsYxyMKqQgdZTnAb9c6y5uzCW7Ew&oe=6659FA4D' alt='novel' />
                                    <h6>Mushoku Tensei - Old Dragon's Tale</h6>
                                </Link>
                            </div>
                            <div className='novel-card'>
                                <Link to='/novel/phong-luu-diem-hiep-truyen-ky'>
                                    <img src='https://i2.docln.net/ln/series/covers/s12957-595fd6ec-610c-4481-b187-172cc7cb4896.jpg' alt='novel' />
                                    <h6>Rebuild World</h6>
                                </Link>
                            </div>
                            <div className='novel-card'>
                                <Link to='/novel/phong-luu-diem-hiep-truyen-ky'>
                                    <img src='https://i.docln.net/lightnovel/covers/s3601-9a25c91a-ffda-4826-9b55-361cb909f9bc-m.jpg' alt='novel' />
                                    <h6>Maou Gakuin no Futekigousha</h6>
                                </Link>
                            </div>
                            <div className='novel-card'>
                                <Link to='/novel/phong-luu-diem-hiep-truyen-ky'>
                                    <img src='https://4.bp.blogspot.com/-SfvDenZRZrk/W3Uf4bf783I/AAAAAAABiIM/0Xj67F0v-A8lBBzYUHfwhBQuKq8uptSawCHMYCw/w215/default.jpg' alt='novel' />
                                    <h6>Sevens</h6>
                                </Link>

                            </div>
                            <div className='novel-card'>
                                <Link to='/novel/phong-luu-diem-hiep-truyen-ky'>
                                    <img src='https://3.bp.blogspot.com/-coc62nTZN9M/WO2v-JFMCuI/AAAAAAAAKBE/Kb8JLmHVElw/w215/series_259.jpg' alt='novel' />
                                    <h6>Kumo Desu Ga Nani Ka</h6>
                                </Link>
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
                                <Link to='/novel/phong-luu-diem-hiep-truyen-ky'>
                                    <img src='https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/311151454_441803738051212_5345550456087243642_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGcq4yB9NvQ5r0ZeDkS8a4zKw6RxbcPf9MrDpHFtw9_0_6QJkJDdbsRmH2GnS0a0SWzzOOn1nKRiJ2UEr_cgHZ0&_nc_ohc=fmkLaF8s1-UQ7kNvgFfhqXR&_nc_ht=scontent.fsgn4-1.fna&oh=00_AYDv9FvVwJIMDxxAwNMsYxyMKqQgdZTnAb9c6y5uzCW7Ew&oe=6659FA4D' alt='novel' />
                                    <h6>Mushoku Tensei - Old Dragon's Tale</h6>
                                </Link>
                            </div>
                            <div className='novel-card'>
                                <Link to='/novel/phong-luu-diem-hiep-truyen-ky'>
                                    <img src='https://i2.docln.net/ln/series/covers/s12957-595fd6ec-610c-4481-b187-172cc7cb4896.jpg' alt='novel' />
                                    <h6>Rebuild World</h6>
                                </Link>
                            </div>
                            <div className='novel-card'>
                                <Link to='/novel/phong-luu-diem-hiep-truyen-ky'>
                                    <img src='https://i.docln.net/lightnovel/covers/s3601-9a25c91a-ffda-4826-9b55-361cb909f9bc-m.jpg' alt='novel' />
                                    <h6>Maou Gakuin no Futekigousha</h6>
                                </Link>
                            </div>
                            <div className='novel-card'>
                                <Link to='/novel/phong-luu-diem-hiep-truyen-ky'>
                                    <img src='https://4.bp.blogspot.com/-SfvDenZRZrk/W3Uf4bf783I/AAAAAAABiIM/0Xj67F0v-A8lBBzYUHfwhBQuKq8uptSawCHMYCw/w215/default.jpg' alt='novel' />
                                    <h6>Sevens</h6>
                                </Link>

                            </div>
                            <div className='novel-card'>
                                <Link to='/novel/phong-luu-diem-hiep-truyen-ky'>
                                    <img src='https://3.bp.blogspot.com/-coc62nTZN9M/WO2v-JFMCuI/AAAAAAAAKBE/Kb8JLmHVElw/w215/series_259.jpg' alt='novel' />
                                    <h6>Kumo Desu Ga Nani Ka</h6>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>

    );
}

export default HomePage;