import React, { useEffect } from 'react'
import './Principal.sass'
import { useRef, useState } from 'react'


type PrincipalProps = {
    fontSize?: string | number;
    backgroundColor?: string;
    color?: string;
}

const Principal = ({fontSize, color, backgroundColor}: PrincipalProps) => {

  const codeRef = useRef<HTMLTextAreaElement | null>(null);
  const [fromTemp, setFromTemp] = useState<number | null>(null)
  const [toTemp, setToTemp] = useState< number | null>(null)
  const [code, setCode] = useState<string>('')
  const [tempCode, setTempCode] = useState<string>('')

  document.onkeydown = function (e: KeyboardEvent) {
    if (e.ctrlKey && e.key==="l") return false;
    if (e.ctrlKey && e.key==="a") return false;
    if (e.ctrlKey && e.key==="d") return false;
}


  const onKeyPressedCode = (event: any) => {
    setToTemp(codeRef.current!.value.length+2)
    if (event.key === "Enter") {
      setFromTemp(toTemp)
      setCode(code)
      console.log(codeRef.current?.value.split("\n").length)
      setTempCode("")
    }
    if (event.key === "a" && event.ctrlKey) {
      codeRef.current!.setSelectionRange(0, codeRef.current!.value.length)
    }
    if (event.key === "l" && event.ctrlKey) {
      codeRef.current!.setSelectionRange(fromTemp, toTemp)
      setFromTemp(0)
      setToTemp(0)
    }
    if (event.key === 'Tab') {
        event.preventDefault();
        const { selectionStart, selectionEnd} = event.target;
        const newText = code.substring(0, selectionStart) + "\x09" + code.substring(selectionEnd, code.length);
        codeRef.current!.focus()
        codeRef.current!.value = newText;
        codeRef.current!.setSelectionRange(selectionStart+1, selectionEnd+1)
        setCode(newText)
    }


    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = ' ';
    
      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    });
  }



  return (
    <div className="principalForm">
    <textarea value={code} spellCheck={false} ref={codeRef} style={{
        fontSize: `${fontSize}` ? `${fontSize}px` : `30px`,
        color: `${color}` ? `${color}` : 'white',
        backgroundColor: `${backgroundColor}` ? `${backgroundColor}` : "black"
        }} onChange={() => setCode(codeRef.current!.value)} onKeyDown={onKeyPressedCode} className="principalInput"/>
    </div>
    )
}

export default Principal