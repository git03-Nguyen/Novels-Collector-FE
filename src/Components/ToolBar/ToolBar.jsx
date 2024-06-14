import React, { useState } from 'react';

import './ToolBar.scss';

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

    const [fontSize, setFontSize] = useState(defaultSettings.fontSize);
    const [fontColor, setFontColor] = useState(defaultSettings.fontColor);
    const [backgroundColor, setBackgroundColor] = useState(defaultSettings.backgroundColor)
    const [fontFamily, setFontFamily] = useState(defaultSettings.fontFamily);
    const [lineHeight, setLineHeight] = useState(defaultSettings.lineHeight);
    const [fontStyle, setFontStyle] = useState(defaultSettings.fontStyle);

    const resetSettings = () => {
        setFontSize(defaultSettings.fontSize);
        setFontColor(defaultSettings.fontColor);
        setBackgroundColor(defaultSettings.backgroundColor);
        setFontFamily(defaultSettings.fontFamily);
        setLineHeight(defaultSettings.lineHeight);
        setFontStyle(defaultSettings.fontStyle);
    }

    const handleFontSizeChange = (e) => {
        setFontSize(`${e.target.value}px`);
        onChange({ fontSize: e.target.value });
    };

    const handleFontColorChange = (e) => {
        setFontColor(e.target.value);
        onChange({ fontColor: e.target.value });
    };

    const handleBackgroundColorChange = (e) => {
        setBackgroundColor(e.target.value);
        onChange({ backgroundColor: e.target.value });
    }

    const handleFontFamilyChange = (e) => {
        setFontFamily(e.target.value);
        onChange({ fontFamily: e.target.value });
    };

    const handleLineHeightChange = (e) => {
        setLineHeight(e.target.value);
        onChange({ lineHeight: e.target.value });
    };

    const handleFontStyleChange = (e) => {
        setFontStyle(e.target.value);
        onChange({ fontStyle: e.target.value });
    };


    return (
        <div className="toolbar-container">
            <div className='toolbar-introduction'>
                <i>Hãy tùy chỉnh những cài đặt sau theo sở thích của mình nhé !</i>
            </div>
            <div className='toolbar-settings'>
                <label> Cỡ chữ:
                    <input type="number" className='form-select'
                        value={fontSize.replace('px', '')} onChange={handleFontSizeChange} />
                </label>

                <label> Font chữ:
                    <select className='form-select'
                        value={fontFamily} onChange={handleFontFamilyChange}>
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                    </select>
                </label>
                <label> Màu chữ:
                    <input type="color" className='form-control'
                        value={fontColor} onChange={handleFontColorChange} />
                </label>
                <label> Màu nền:
                    <input type="color" className='form-control'
                        value={backgroundColor} onChange={handleBackgroundColorChange} />
                </label>
                <label> Khoảng cách dòng:
                    <input type="number" step="0.1" className='form-control'
                        value={lineHeight} onChange={handleLineHeightChange} />
                </label>
                <label> Kiểu chữ:
                    <select className='form-select'
                        value={fontStyle} onChange={handleFontStyleChange}>
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
                    fontSize: fontSize,
                    color: fontColor,
                    fontFamily: fontFamily,
                    lineHeight: lineHeight,
                    fontStyle: fontStyle,
                    backgroundColor: backgroundColor,
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