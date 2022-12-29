import React, { useEffect, useRef, useState } from 'react'
import './TerminalInputs.sass'

type terminalInputs = {
  messages: string
  color?: string 
  backgroundColor?: string
  fontSize?: string
  fontFamily?: string
}


const TerminalInputs = ({messages, color, backgroundColor, fontSize, fontFamily}: terminalInputs) => {
  const [message, setMessage] = useState<string>("");
  const [timeSpent, setTimeSpent] = useState<boolean>(true)
  if (messages !== message) setMessage(messages)

  let test: any

  const welcomeMessage = () => {
    test = setInterval(() => {setTimeSpent(false) }, 5000)
  }
  
  const welcomeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    welcomeMessage()
    return () => clearInterval(test)
  }, [])


  return (
    <div className="terminalInputs" style={{
          fontSize: `${fontSize}` ? `${fontSize}px` : `15px`,
          color: `${color}` ? `${color}` : "white",
          backgroundColor: `${backgroundColor}` ? `${backgroundColor}` : "black",
          fontFamily: `${fontFamily}` ? `${fontFamily}` : "Hack" 
    }}>
      <div className="terminalParagraphs" style={{fontFamily: 'Hack'}}> 
        {timeSpent && <p ref={welcomeRef} className="helloMessage"> Welcome to text editor!  </p>}
        <p> {message} </p>
      </div>
    </div>
  )
}

export default TerminalInputs