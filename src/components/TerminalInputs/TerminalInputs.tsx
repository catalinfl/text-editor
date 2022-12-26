import React from 'react'
import './TerminalInputs.sass'

type terminalInputs = {
  messages: string | null
  color?: string | null,
  backgroundColor?: string | null
  fontSize?: string | null
  fontFamily?: string | null
}


const TerminalInputs = ({messages, color, backgroundColor, fontSize, fontFamily}: terminalInputs) => {
  return (
    <div className="terminalInputs" style={{
          fontSize: `${fontSize}` ? `${fontSize}px` : `12px`,
          color: `${color}` ? `${color}` : "black",
          backgroundColor: `${backgroundColor}` ? `${backgroundColor}` : "red",
          fontFamily: `${fontFamily}` ? `${fontFamily}` : "Arial"
    }}>
        <p className="helloMessage"> Welcome to text editor! </p>
        <p> {messages} </p>
    </div>
  )
}

export default TerminalInputs