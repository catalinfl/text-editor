import "./Footer.sass"
import React, { useEffect, useState } from 'react'

type FooterProps = {
  color?: string;
  backgroundColor?: string;
}

const Footer = ({color, backgroundColor}: FooterProps) => {

  const now: any = new Date();
  
  const [time, setTime] = useState<number>(0);
  
  let interval: any;

  function intervalCounter () {
    interval = setInterval(() => {setTime(time+1)}, 1000)
  }
  
  useEffect(() => {
    intervalCounter()
    return () => clearInterval(interval)
  }, [time])

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);


  
  return (
    <div className="footer"
    style={{
      color: `${color}` ? `${color}` : "black",
      backgroundColor: `${backgroundColor}` ? `${backgroundColor}` : "yellow" 
    }}
    >
      <div className="footerPrincipal">
        <p> Time elapsed: {minutes}:{seconds} </p>
        <p> Characters: bla bla bla</p>
      </div>
    </div>
  )
}

export default Footer