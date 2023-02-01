import React, { useContext, useEffect } from 'react'
import './Principal.sass'
import { useRef, useState } from 'react'
import { TextareaContext } from '../../redux/TextareaReducer'


type PrincipalProps = {
    fontSize?: string | number;
    backgroundColor?: string;
    color?: string,
    scrollColor?: string
}



const Principal = ({fontSize, color, backgroundColor, scrollColor}: PrincipalProps) => {
  
  const codeRef = useRef<HTMLTextAreaElement | null>(null);
  const [fromTemp, setFromTemp] = useState<number | null>(null)
  const [toTemp, setToTemp] = useState< number | null>(null)
  const [code, setCode] = useState<string>('')
  const [tempCode, setTempCode] = useState<string>('')
  
  const { state, dispatch } = useContext(TextareaContext);

  useEffect(() => {
    dispatch({ type: "SET_TEXTAREA", payload: code})
  }, [code])


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

  const verifyWidth = () => {
    if (window.innerWidth < 1500 && code.length === 0) {
      codeRef.current!.placeholder = ""
    }
  }

  useEffect(() => {
    setInterval(() => verifyWidth(), 1000)
  }, [])

  return (
    <div className="principalForm">
    <textarea placeholder="
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⣤⣤⣤⣀⣀⣀⣀⣀⣀⣀⣤⡤⠶⠶⠶⢶⣤⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣴⠶⠾⠛⠛⠋⠉⠉⠉⠉⠉⢉⡉⠉⢙⣿⡿⠛⠉⠀⣀⡀⠀⠀⠀⠀⠉⠛⠷⣦⡀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⠶⠛⠋⠉⠀⠀⢀⣠⣤⣄⣀⣀⣀⣤⣄⠈⠛⢀⡾⠋⠀⠀⠀⣾⡿⠃⠀⠀⠀⠀⠀⠀⠀⠘⢿⡄⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⠟⠋⠀⠀⠀⠀⠀⠀⢴⠟⣩⡿⢛⣉⠛⣿⣿⣿⣷⣶⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⡄⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡾⠋⠁⠀⠀⠀⠀⠀⠀⢀⣠⣤⣄⣿⡇⠺⣿⡇⣸⡟⠋⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣷⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⠏⠀⠀⠀⠀⠀⠀⣠⣾⣿⢿⣟⠛⠻⣿⣛⣳⣶⣾⣿⣦⣾⣃⠄⠀⠀⣀⣠⣤⣴⣶⡶⠶⠶⠞⠛⠛⠻⣿⣶⣄⠀⢸⣿⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡞⠁⠀⠀⠀⠀⠀⠀⠐⠛⠋⠀⠀⢿⣷⣦⣤⣭⣭⣷⣦⣴⣟⣉⣥⣶⠾⠟⠛⠋⠉⠁⠀⠀⠀⠀⢀⣴⣶⣿⡿⠟⠻⣷⣾⡟⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⣴⠏⠀⠀⠀⠀⠀⣠⡶⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⢉⣿⣿⠿⠟⢛⣩⣵⣶⠖⠀⢰⣞⣋⣥⣴⣶⣶⣾⣿⣿⡿⠋⠀⠀⠀⢹⡟⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⢀⣾⠃⠀⠀⠀⠀⠀⣾⣿⣥⣤⡄⠀⠠⠖⢶⣶⡶⠆⠀⠀⠉⠉⠓⠛⠉⠉⢙⣿⣿⣿⡿⠛⢩⣿⣿⣿⣿⣿⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⣰⣿⠃⠀⠀⠀⠀⠀⠀⠘⣿⣿⣏⣀⣀⣠⣤⣦⣤⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⣻⣿⠃⠀⣠⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⣰⣿⣿⣄⠀⠀⠀⠀⠀⠀⠐⠟⠛⢻⣿⠿⣿⣿⣿⠁⠀⠀⢠⣶⣧⣴⣿⣷⣴⣾⣿⡿⠃⠀⣰⣿⣿⣿⡿⢿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⢰⣿⠿⠛⠉⠀⠀⠀⠰⡆⢀⣶⠀⠀⠀⠀⠸⠟⠋⠁⠀⠀⢠⣾⡿⠟⠉⠉⠉⡿⠟⠋⠀⠀⣰⣿⣿⣿⡏⠀⠀⢸⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⢀⡿⠁⠀⠀⠀⠀⠀⠀⠀⢠⠟⠁⠀⠀⠀⠀⠀⠀⣾⣿⠟⠁⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⡿⡿⠀⠀⠀⢺⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⣸⣇⣴⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠐⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠚⠉⠙⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⢀⣿⣿⠃⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⢸⣿⡏⠀⣴⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡀⠀⠀⠀⡀⠀⠀⠀⣼⡇⠀⠀⠀⠀⠀⣸⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠈⣿⣧⣾⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢴⣿⡇⠀⠀⢸⣷⠀⠀⣼⣿⠇⠀⠀⠀⠀⠀⢸⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⢰⡟⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠁⠀⠀⠘⠛⠀⢰⣿⠏⠀⠀⠀⠀⠀⠀⠀⢿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⡿⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠘⣧⠀⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠘⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⢸⡇⣰⡿⠀⠀⠀⠀⠀⠀⠀⢀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣰⣿⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⢸⣷⣿⡇⠀⠀⠀⠀⠀⠀⠀⣸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⢸⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⣿⡧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢷⡄⠀⠀⠀⠀⠀⠀⠀⠀
    " value={code} spellCheck={false} ref={codeRef} style={{
        fontSize: `${fontSize}` ? `${fontSize}px` : `30px`,
        color: `${color}` ? `${color}` : 'white',
        backgroundColor: `${backgroundColor}` ? `${backgroundColor}` : "black",
        '--color': `${scrollColor}` ? `${scrollColor}` : "yellow"
        } as React.CSSProperties } onChange={() => setCode(codeRef.current!.value)} onKeyDown={onKeyPressedCode} className="principalInput"/>
    </div>
    )
}

export default Principal