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
      borderColor: `${backgroundBorderColor}` ? `${backgroundBorderColor}` : "yellow",
      borderStyle: 'solid',
      borderWidth: '5px'
    }}>
        <div className="helpHeader" style={{
          backgroundColor: `${backgroundBorderColor}` ? `${backgroundBorderColor}` : "yellow"
        }}>
          <div className="helpTitle">
          Help window
          </div>
        </div>
        <div className="helpBody">
            <ul>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> close </b> - close the help window </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> theme </b> - change secondary colors in text editor </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> btheme </b> - change background colors in text editor </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> tfs or tfontsize </b> - change terminal fontsize </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> tc or tcolor </b> - change terminal color </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}>tbc or tbcolor </b> - change terminal background color </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> tofs or tofontsize </b> - change  terminal output fontsize </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> toc or tocolor </b> - change terminal output font color </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> tobc or tobackground </b> - change terminal output </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> codefs or codefontsize </b> - change text editor font size</li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> codec or codecolor </b> - change text editor color </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> codebc or codebackgroundcolor </b> - change text editor color </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> fc or footerc </b> - change footer text color </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> fbc or footerbc </b> - change footer background color </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> hc or headerc </b> - change header text color </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> hbc or headerbc </b> - change header background color </li>
            </ul>
        </div>
    </div>
}
</div>
    )
}

export default Help