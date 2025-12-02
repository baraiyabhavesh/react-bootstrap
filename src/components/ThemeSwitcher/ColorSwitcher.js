import React, { useEffect, useState } from "react";


const ColorSwitcher = ({ title, color, setColor, isRGBA, colorType }) => {
    const [newColor, setNewColor] = useState(`${color.color}`);
    useEffect(() => {
        setNewColor(`${color.color.toUpperCase()}`);
    }, [color])
    return (
        <>
            <h5>{title}</h5>
            <div className={`input-group input-group-2 color-${colorType} colorpicker-element`}>
                <span className="input-group-append">
                    <span className="input-group-text input-group-addon">
                        <input type="color" value={newColor} className={`form-control ${colorType}-color-select`} onChange={e => setColor({ color: e.target.value, visible: false })}
                            name={`tx_style[color-${colorType}]`} />
                    </span>
                </span>
                <input type="text" value={newColor} className={`form-control ${colorType}-color-input`} onChange={e => setColor({ color: e.target.value, visible: false })}
                    name={`tx_style[color-${colorType}]`} />
            </div>
        </>
    )
}
export default ColorSwitcher;
