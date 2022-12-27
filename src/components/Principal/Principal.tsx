import React from 'react'
import './Principal.sass'
import { useRef, useState } from 'react'


type PrincipalProps = {
    fontSize?: string | number;
    backgroundColor?: string;
    color?: string;
}

const Principal = ({fontSize, color, backgroundColor}: PrincipalProps) => {

  console.log(backgroundColor)
  const codeRef = useRef<HTMLTextAreaElement | null>(null);
  const [fromTemp, setFromTemp] = useState<number | null>(null)
  const [toTemp, setToTemp] = useState< number | null>(null)

  document.onkeydown = function (e: KeyboardEvent) {
    if (e.ctrlKey && e.key==="l") return false;
    if (e.ctrlKey && e.key==="a") return false;
    if (e.ctrlKey && e.key==="w") {
        alert("test")
    }
    if (e.ctrlKey && e.key==="d") return false;
    if (e.ctrlKey && e.key==="t") return false;
    if (e.ctrlKey && e.key==="w") {
        e.preventDefault();
    }
}


  const onKeyPressedCode = (event: any) => {
    setToTemp(codeRef.current!.value.length+2)
    if (event.key === "Enter") {
      setFromTemp(toTemp)
    }
    if (event.key === "a" && event.ctrlKey) {
      codeRef.current!.setSelectionRange(0, codeRef.current!.value.length)
    }
    if (event.key === "l" && event.ctrlKey) {
      codeRef.current!.setSelectionRange(fromTemp, toTemp)
      setFromTemp(0)
      setToTemp(0)
    }
  }

  return (
    <div className="principalForm">
    <textarea spellCheck={false} ref={codeRef} style={{
        fontSize: {fontSize} ? `${fontSize}px` : `30px`,
        color: `${color}` ? `${color}` : 'white',
        backgroundColor: `${backgroundColor}` ? `${backgroundColor}` : "black"
        }} onKeyDown={onKeyPressedCode} className="principalInput"/>
    </div>
    )
}

export default Principal