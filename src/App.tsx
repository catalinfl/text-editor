import FormInput from './components/FormInput/FormInput'
import './App.sass'
import TerminalInputs from './components/TerminalInputs/TerminalInputs'
import Footer from './components/Footer/Footer'
import React, { useEffect } from 'react'
import "./components/Terminal/Terminal.sass"
import { useRef, useState } from 'react'

function App() {

  
      
    const terminalRef = useRef<HTMLInputElement | null>(null);
    const [terminalCommand, setTerminalCommand] = useState<string | null>(null);
    const [fontSize, setFontSize] = useState<number | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [color, setColor] = useState<string | null>(null);
    const [fontFamily, setFontFamily] = useState<string | null>(null)
    const [messages, setMessages] = useState<string | null>(null);
    const [backgroundColor, setBackgroundColor] = useState<string | null>(null);
    const [terminalInputColor, setTerminalInputColor] = useState<string | null>(null);
    const [terminalInputFontSize, setTerminalInputFontSize] = useState<string | null>(null);
    const [terminalInputBackgroundColor, setTerminalInputBackgroundColor] = useState<string | null>(null);
    const [terminalInputFontFamily, setTerminalInputFontFamily] = useState<string | null>(null);
  
  
    const onKeyPressed = (event: any) => {
      if (event.key === "Enter" && terminalRef.current!.value.split(" ").length === 2) {
        setTerminalCommand(terminalRef.current!.value)
        terminalRef.current!.value = ""
        if (error) setError(false);
      }
      else if (event.key === "Enter"){
        terminalRef.current!.value = ""
        setError(true)
      }
      else if (event.ctrlKey && event.key === 'l' || event.ctrlKey && event.key === 'a') {
        terminalRef.current?.setSelectionRange(0, terminalRef.current.value.length)
      }
    }
  
    document.onkeydown = function (e) {
      if (e.ctrlKey && e.key==="l") return false;
      if (e.ctrlKey && e.key==="a") return false;
      if (e.ctrlKey && e.key==="w") return false;
      if (e.ctrlKey && e.key==="d") return false;
    }
  
    function initializeTerminalCommand (command: string): void {
      let commandSplit = command.split(" ")
      if (commandSplit.length !== 2) return setMessages(`${commandSplit} is not a function`);
      let commandP: string = commandSplit[0].toLowerCase();
      if (commandP === "terminalfontsize" || commandP === "tfontsize") {
        setFontSize(parseInt(commandSplit[1]) > 11 ? parseInt(commandSplit[1]) : null)
        createMessage(commandP as string)
      }
      else if (commandP === "terminalcolor" || commandP === "tcolor") {
        setColor(commandSplit[1])
        createMessage(commandP as string)
      }
      else if (commandP === "terminalbcolor" || commandP === "tbcolor" || commandP === "terminalbackgroundcolor") {
        setBackgroundColor(commandSplit[1])
        createMessage(commandP as string)
      }
      else if (commandP === "terminalfontfamily" || commandP === "tfontfamily" || commandP === "terminalbackgroundcolor") {
        setFontFamily(commandSplit[1])
        createMessage(commandP as string)
      }
      else if (commandP === "terminalinputfontsize" || commandP === "tifontsize" || commandP === "terminalinputfs") {
        setTerminalInputFontSize(commandSplit[1])
        createMessage(commandP as string)
      }
      else if (commandP === "terminalinputcolor" || commandP === "ticolor") {
        setTerminalInputColor(commandSplit[1])
        createMessage(commandP as string)
      }
      else if (commandP === "terminalinputfontfamily" || commandP === "tifontfamily") {
        setTerminalInputFontFamily(commandSplit[1])
        createMessage(commandP as string)
      }
      else if (commandP === "terminalinputbackgroundcolor" || commandP === "tibackground") {
        setTerminalInputBackgroundColor(commandSplit[1])
        createMessage(commandP as string)
      }
      else
      setMessages(`${commandP} is not a command`)
    }
    
    function createMessage(word: string) {
      if (word === null) return;
      setMessages(`${word} has been changed`)
    }
  
  
    useEffect(() => {
      if (terminalCommand !== null) {
      initializeTerminalCommand(terminalCommand as string)
    }
    }, [terminalCommand])
    

  

  return (
    <div className="editor">
      <FormInput />
      <div className="terminal">
          <input style={{
            fontSize: `${fontSize}` ? `${fontSize}px` : `12px`,
            color: `${color}` ? `${color}` : "black",
            backgroundColor: `${backgroundColor}` ? `${backgroundColor}` : "red",
            fontFamily: `${fontFamily}` ? `${fontFamily}` : "Arial"
            }} ref={terminalRef} onKeyDown={onKeyPressed} type="text" className="terminalInput" />
          <TerminalInputs fontFamily={terminalInputFontFamily} color={terminalInputColor} backgroundColor={terminalInputBackgroundColor} fontSize={terminalInputFontSize} messages={messages}/>
      </div>
      <Footer />
    </div>
  )
}


export default App
