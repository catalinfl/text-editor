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
        <div className="helpBody" style={{
          '--color': `${backgroundBorderColor}` ? `${backgroundBorderColor}` : "yellow"
        } as React.CSSProperties }
                  >
            <ul>
              <li style={{
              }}> <b style={{
                color: `${backgroundBorderColor}` || "yellow",
              }}> help </b> - open help window, what you did now &#128513; </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> close </b> - close the help window </li>
                <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> reset </b> - reset to default settings </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> theme </b> &lt;color&gt; - change secondary colors in text editor </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> btheme </b> &lt;color&gt; - change background colors in text editor </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> tfs or tfontsize </b> &lt;number&gt; - change terminal fontsize </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> tc or tcolor </b> &lt;color&gt; - change terminal color </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}>tbc or tbcolor </b> &lt;color&gt; - change terminal background color </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> tofs or tofontsize </b> &lt;number&gt; - change  terminal output fontsize </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> toc or tocolor </b> &lt;color&gt; - change terminal output font color </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> tobc or tobackground </b> &lt;color&gt; - change terminal output </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> codefs or codefontsize </b> &lt;number&gt; - change text editor font size</li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> codec or codecolor </b> &lt;color&gt; - change text editor color </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> codebc or codebackgroundcolor </b> &lt;color&gt; - change text editor color </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> fc or footerc </b> &lt;color&gt; - change footer text color </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> fbc or footerbc </b> &lt;color&gt; - change footer background color </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> hc or headerc </b> &lt;color&gt; - change header text color </li>
              <li> <b style={{
                color: `${backgroundBorderColor}` || "yellow"
              }}> hbc or headerbc </b> &lt;color&gt; - change header background color </li>
            </ul>
        </div>
    </div>
}
</div>
    )
}

export default Help