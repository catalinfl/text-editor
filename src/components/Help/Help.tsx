import React, { useEffect } from 'react'
import "./Help.sass"
import { useRef } from 'react'

type HelpProps = {
    color?: string
    backgroundColor?: string
    isShow?: boolean
}



const Help = ({color, backgroundColor, isShow}: HelpProps) => {

    const helpBarHook = useRef<HTMLDivElement>(null);
    const drag = useRef<HTMLDivElement>(null);

    window.onload = () => {
    const dragElement = (element: HTMLDivElement) => {
        let pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;
    //MouseUp occurs when the user releases the mouse button
        const dragMouseUp = () => {
          document.onmouseup = null;
    //onmousemove attribute fires when the pointer is moving while it is over an element.
          document.onmousemove = null;
    
        };
    
        const dragMouseMove = (event: MouseEvent) => {
    
          event.preventDefault();
    //clientX property returns the horizontal coordinate of the mouse pointer
          pos1 = pos3 - event.clientX;
    //clientY property returns the vertical coordinate of the mouse pointer
          pos2 = pos4 - event.clientY;
          pos3 = event.clientX;
          pos4 = event.clientY;
    //offsetTop property returns the top position relative to the parent
          element.style.top = `${element.offsetTop - pos2}px`;
          element.style.left = `${element.offsetLeft - pos1}px`;
        };
    
        const dragMouseDown = (event: MouseEvent) => {
          event.preventDefault();
    
          pos3 = event.clientX;
          pos4 = event.clientY;
    
    
          document.onmouseup = dragMouseUp;
          document.onmousemove = dragMouseMove;
        };
    
        element.onmousedown = dragMouseDown;
      };

    dragElement(helpBarHook.current!)
    }
    console.log(isShow)

return (
<> 
    <div className="help" ref={helpBarHook} draggable style={{
        backgroundColor: "white",
    }}>
        <div className="helpHeader">
            Test 
        </div>
        <div className="helpBody">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, dolorem!
        </div>
    </div>
</>
    )
}

export default Help