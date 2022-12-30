import React, { useEffect, useState } from 'react'
import "./Help.sass"
import { useRef } from 'react'

type HelpProps = {
    color?: string
    backgroundColor?: string
    isShow: boolean
    border: string
    backgroundBorderColor: string
}



const Help = ({color, backgroundColor, border, backgroundBorderColor, isShow}: HelpProps) => {

    const helpBarHook = useRef<HTMLDivElement>(null);
    const drag = useRef<HTMLDivElement>(null);
    const [helpOn, setHelpOn] = useState<boolean>(false)

    useEffect(() => {
      setHelpOn(isShow) 
    }, [isShow])


    
    const dragElement = (element: HTMLDivElement) => {
        let pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;
        const dragMouseUp = () => {
          document.onmouseup = null;
          document.onmousemove = null;
        };
    
        const dragMouseMove = (event: MouseEvent) => {
    
          event.preventDefault();
          pos1 = pos3 - event.clientX;
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

    useEffect(() => {
      if (helpOn) {
      dragElement(helpBarHook.current!)
      }
      setHelpOn(isShow)
    }, [helpOn])

  

return (
<div className="helpContainer">

{helpOn && 
    <div className="help" ref={helpBarHook} draggable style={{
        backgroundColor: "black",
        border: `${backgroundBorderColor}` ? `solid 1px ${backgroundBorderColor}` : "solid 1px yellow"
    }}>
        <div className="helpHeader" style={{
          backgroundColor: `${backgroundBorderColor}` ? `${backgroundBorderColor}` : "yellow"
        }}>
          <div className="helpTitle">
          Help window
          </div>
        </div>
        <div className="helpBody">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, dolorem!
        </div>
    </div>
}
</div>
    )
}

export default Help