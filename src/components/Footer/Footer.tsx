import "./Footer.sass"
import React, { useContext, useEffect, useState } from 'react'
import { useMemo } from "react"
import { TextareaContext } from "../../redux/TextareaReducer";
type FooterProps = {
  color?: string;
  backgroundColor?: string;
}

const Footer = ({color, backgroundColor}: FooterProps) => {

  const now: any = new Date();
  const { state, dispatch } = useContext(TextareaContext)
  const [time, setTime] = useState<number>(0);
  
  let interval: any;

  function intervalCounter () {
    interval = setInterval(() => {setTime(time+1)}, 1000)
  }

  useEffect(() => {
    intervalCounter()
    return () => clearInterval(interval)
  }, [time])

  const [minutes, setMinutes] = useState<number | string>(0);
  const [seconds, setSeconds] = useState<number | string>(0);

  useEffect(() => {
    let tempTime: number = time;
    let tempMinutes = tempTime / 60
    let tempSeconds = tempTime % 60;
    if (tempMinutes < 10) {
      setMinutes("0"+tempMinutes.toString().slice(0, 1))
    }
    else setMinutes(tempMinutes.toString().slice(0, 1));
    if (tempSeconds < 10) {
      setSeconds("0"+tempSeconds.toString().slice(0, 1))
    }
    else setSeconds(tempSeconds.toString().slice(0, 2));
  }, [time])
  

  
  return (
    <div className="footer"
    style={{
      color: `${color}` ? `${color}` : "black",
      backgroundColor: `${backgroundColor}` ? `${backgroundColor}` : "yellow" 
    }}
    >
      <div className="footerPrincipal">
        <div className="footerTime"> 
        <p> Time elapsed: {minutes} minutes and {seconds} seconds </p>
        </div>
        <div className="footerWords"> 
        <p> Characters: {state.count} </p>
        <p> Words: {state.words} </p>
        </div>
      </div>
    </div>
  )
}

export default Footer