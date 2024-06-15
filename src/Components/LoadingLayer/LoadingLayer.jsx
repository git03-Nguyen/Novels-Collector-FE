import React, { useContext, useEffect, useState } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { LoadingContext } from '../../context/LoadingContext';

import './LoadingLayer.scss';

function LoadingLayer(props) {
    const { isLoadingContext } = useContext(LoadingContext);

    const [curIsLoading, setCurIsLoading] = useState(isLoadingContext);

    useEffect(() => {
        setCurIsLoading(isLoadingContext);
    }, [isLoadingContext])

    return (
        <div className="loading-overlay">
            <div className="loading-message spinner-container">
                <ScaleLoader size={40} color={"#ffa500"} loading={curIsLoading} />
                <h6 className='py-3'>
                    Đang tải dữ liệu ...
                </h6>
            </div>
        </div>
    );
}

export default LoadingLayer;