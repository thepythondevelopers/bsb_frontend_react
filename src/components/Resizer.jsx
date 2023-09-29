import react, { useState } from "react";

const Resizer = ({onResize}) => {
    const [direction, setDirection] = useState('');
    const handleMouseDown = (direction) => {
        console.log(direction);
        setDirection(direction)
    }
    return(
        <>
            <div className="panel-container">
                <div className="top-left" onMouseDown={handleMouseDown(direction.TopLeft)}></div>
                <div className="top" onMouseDown={handleMouseDown(direction.Top)}></div>
                <div className="top-right" onMouseDown={handleMouseDown(direction.TopRight)}></div>
                <div className="right" onMouseDown={handleMouseDown(direction.Right)}></div>
                <div className="right-bottom" onMouseDown={handleMouseDown(direction.RightBottom)}></div>
                <div className="bottom" onMouseDown={handleMouseDown(direction.Bottom)}></div>
                <div className="bottom-left" onMouseDown={handleMouseDown(direction.BottomLeft)}></div>
                <div className="left" onMouseDown={handleMouseDown(direction.Left)}></div>
            </div>
        </>
    )
}

export default Resizer;