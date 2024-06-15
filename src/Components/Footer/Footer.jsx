import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import './Footer.scss'
import { NovelContext } from '../../context/NovelContext';

function Footer(props) {

    const { pluginSources } = useContext(NovelContext);
    const [curPluginSources, setCurPluginSources] = useState(pluginSources);

    useEffect(() => {
        console.log("Footer plugin source: ");
        console.log(pluginSources);
        setCurPluginSources(pluginSources);
    }, [pluginSources])

    return (
        <footer className='app-footer dark:bg-black dark:text-white border-t-2'>
            <Link to='/'>
                <img src='/logo.png' className='app-logo' alt='logo' />
            </Link>

            <div className='footer-description'>
                <strong>Giới thiệu</strong>
                <p>Website này được phát triển nhằm mục đích phục vụ cho đồ án môn học <strong>Thiết kế phần mềm</strong> của trường Đại học Khoa học Tự nhiên, ĐHQG-HCM.</p>
                <p>Mọi thắc mắc xin vui lòng liên hệ nhóm phát triển.</p>
            </div>

            <div className='footer-navbar'>
                <strong>Điều hướng</strong>
                <Link to='/' className='footer-navbar-link'>Trang chủ</Link>
                {/* TODO: add navigation to this */}
                <Link to='/novel-list' className='footer-navbar-link'>Danh mục truyện</Link>
                <Link to='#' className='footer-navbar-link'>Bảng xếp hạng</Link>
                <Link to='#' className='footer-navbar-link'>Truyện nổi bật</Link>
            </div>

            <div className='footer-credit'>
                <strong>Nguồn truyện</strong>
                {curPluginSources && curPluginSources?.length > 0 && curPluginSources?.map((src, index) => {
                    return <a key={`footer-plugin-source-${index}`} href={src?.url}>
                        {src?.name}
                    </a>
                })}
            </div>

            <div className='footer-contact'>
                <strong>Liên hệ</strong>
                <a href='mailto:21120036@student.hcmus.edu.vn'>21120036@student.hcmus.edu.vn</a>
                <a href='mailto:21120105@student.hcmus.edu.vn'>21120105@student.hcmus.edu.vn</a>
                <a href='mailto:21120171@student.hcmus.edu.vn'>21120171@student.hcmus.edu.vn</a>
                <a href='mailto:21120172@student.hcmus.edu.vn'>21120172@student.hcmus.edu.vn</a>
                <a href='mailto:21120177@student.hcmus.edu.vn'>21120177@student.hcmus.edu.vn</a>
            </div>
        </footer>
    );
}

export default Footer;