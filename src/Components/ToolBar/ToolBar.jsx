import React, { useState } from 'react';

import './ToolBar.scss';
import UserStyleSettingsManager from '../../utils/localStorage/userStyleSettingsManager';

function ToolBar(props) {
    const { onChange } = props;
    const defaultSettings = {
        fontSize: '16px',
        fontColor: '#ffffff',
        backgroundColor: '#066886',
        fontFamily: 'Arial',
        lineHeight: '1.5',
        fontStyle: 'normal',
    }

    const [styleSettings, setStyleSettings] = useState(UserStyleSettingsManager.getUserStyleSettings()?.fontSize
        ? UserStyleSettingsManager.getUserStyleSettings()
        : defaultSettings
    );

    const resetSettings = () => {
        setStyleSettings(defaultSettings);
        onChange(defaultSettings);
    }

    const handleFontSizeChange = (e) => {
        const newStyleSettings = {
            ...styleSettings,
            fontSize: `${e.target.value}px`,
        };
        setStyleSettings(newStyleSettings)
        onChange(newStyleSettings);
    };

    const handleFontColorChange = (e) => {
        const newStyleSettings = {
            ...styleSettings,
            fontColor: e.target.value,
        }
        setStyleSettings(newStyleSettings)
        onChange(newStyleSettings);
    };

    const handleBackgroundColorChange = (e) => {
        const newStyleSettings = {
            ...styleSettings,
            backgroundColor: e.target.value,
        }
        setStyleSettings(newStyleSettings)
        onChange(newStyleSettings);
    }

    const handleFontFamilyChange = (e) => {
        const newStyleSettings = {
            ...styleSettings,
            fontFamily: e.target.value,
        }
        setStyleSettings(newStyleSettings)
        onChange(newStyleSettings);
    };

    const handleLineHeightChange = (e) => {
        const newStyleSettings = {
            ...styleSettings,
            lineHeight: e.target.value,
        }
        setStyleSettings(newStyleSettings)
        onChange(newStyleSettings);
    };

    const handleFontStyleChange = (e) => {
        const newStyleSettings = {
            ...styleSettings,
            fontStyle: e.target.value,
        }
        setStyleSettings(newStyleSettings)
        onChange(newStyleSettings);
    };


    return (
        <div className="toolbar-container">
            <div className='toolbar-introduction'>
                <i>Hãy tùy chỉnh những cài đặt sau theo sở thích của mình nhé !</i>
            </div>
            <div className='toolbar-settings'>
                <label> Cỡ chữ:
                    <input type="number" className='form-select'
                        value={styleSettings?.fontSize.replace('px', '')} onChange={handleFontSizeChange} />
                </label>

                <label> Font chữ:
                    <select className='form-select'
                        value={styleSettings?.fontFamily} onChange={handleFontFamilyChange}>
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                    </select>
                </label>
                <label> Màu chữ:
                    <input type="color" className='form-control'
                        value={styleSettings?.fontColor} onChange={handleFontColorChange} />
                </label>
                <label> Màu nền:
                    <input type="color" className='form-control'
                        value={styleSettings?.backgroundColor} onChange={handleBackgroundColorChange} />
                </label>
                <label> Khoảng cách dòng:
                    <input type="number" step="0.1" className='form-control'
                        value={styleSettings?.lineHeight} onChange={handleLineHeightChange} />
                </label>
                <label> Kiểu chữ:
                    <select className='form-select'
                        value={styleSettings?.fontStyle} onChange={handleFontStyleChange}>
                        <option value="normal">Mặc định</option>
                        <option value="italic">In nghiêng</option>
                        <option value="oblique">In xiên</option>
                    </select>
                </label>
            </div>

            <div className='demo-text-container'>
                <i>Dưới đây là bản thử của những cài đặt trên</i>
                <div className='mt-3'></div>
                <span className='text-center' style={{
                    fontSize: styleSettings?.fontSize,
                    color: styleSettings?.fontColor,
                    fontFamily: styleSettings?.fontFamily,
                    lineHeight: styleSettings?.lineHeight,
                    fontStyle: styleSettings?.fontStyle,
                    backgroundColor: styleSettings?.backgroundColor,
                }}>
                    Novel Collector - Nhóm 12
                </span>

            </div>

            <div className='reset-settings-container'>

                <button className='btn btn-primary' onClick={() => resetSettings()}>Khôi phục cài đặt gốc</button>
            </div>
        </div>
    );
}

export default ToolBar;