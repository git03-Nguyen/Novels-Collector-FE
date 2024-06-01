import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BreadCrumbGenerator from '../../utils/breadCrumbGenerator';

import './BreadCrumb.css';

function BreadCrumb(props) {
    const urlPath = useLocation().pathname;
    const separator = '>';

    const subsetOfPath = BreadCrumbGenerator.convertPathToBreadCrumb(urlPath);
    return (
        <div className='app-breadcrumb'>
            <Link to="/">
                Trang chủ
            </Link>
            {subsetOfPath && subsetOfPath.length > 0 &&
                <Fragment>
                    <span className='breadcrumb-separator px-2'>{separator}</span>

                    {subsetOfPath.map((ele, index) => {
                        return <Fragment key={`breadcrumb-num-${index}`} >
                            <Link to={ele.path}>
                                {ele.title + ": " + ele.name}
                            </Link>
                            {index < subsetOfPath.length - 1 &&
                                <span className='breadcrumb-separator px-2'>{separator}</span>
                            }
                        </Fragment>
                    })
                    }
                </Fragment>
            }

            {/* {subsetOfPath && subsetOfPath.length > 0 && subsetOfPath.map((ele, index) => {
                return <Fragment key={`breadcrumb-num-${index}`} >
                    <Link to={ele.path}>
                        {ele.title + ": " + ele.name}
                    </Link>
                    {index < subsetOfPath.length - 1 &&
                        <span className='px-2'>{separator}</span>
                    }
                </Fragment>
            })} */}
        </div>
    );
}

export default BreadCrumb;