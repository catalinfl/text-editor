import './App.sass'
import TerminalInputs from './components/TerminalInputs/TerminalInputs'
import Footer from './components/Footer/Footer'
import React, { KeyboardEventHandler, useEffect } from 'react'
import "./components/Terminal/Terminal.sass"
import { useRef, useState } from 'react'
import Principal from './components/Principal/Principal'
import Header from './components/Header/Header'



function App() {
  
    const terminalRef = useRef<HTMLInputElement | null>(null);
    const [terminalCommand, setTerminalCommand] = useState<string | null>(null);
    const [fontSize, setFontSize] = useState<number>(20);
    const [error, setError] = useState<boolean>(false);
    const [color, setColor] = useState<string | null>(null);
    const [messages, setMessages] = useState<string>("");
    const [backgroundColor, setBackgroundColor] = useState<string>("");
    const [terminalInputColor, setTerminalInputColor] = useState<string>("");
    const [terminalInputFontSize, setTerminalInputFontSize] = useState<string>("");
    const [terminalInputBackgroundColor, setTerminalInputBackgroundColor] = useState<string>("");
    const [codeBackgroundColor, setCodeBackgroundColor] = useState<string>("")
    const [codeFontSize, setCodeFontSize] = useState<string>("")
    const [codeColor, setCodeColor] = useState<string>("");

    const onKeyPressed = (event: any) => {
      if (event.key === "Enter") {
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
      if (event.keyCode === 38) {
        terminalRef.current!.value = terminalCommand as string
        terminalRef.current?.setSelectionRange(0, terminalRef.current.value.length)
      }
    }


    document.onkeydown = function (e: KeyboardEvent) {
      if (e.ctrlKey && e.key==="l") return false;
      if (e.ctrlKey && e.key==="a") return false;
      if (e.ctrlKey && e.key==="w") return false;
      if (e.ctrlKey && e.key==="d") return false;
    }
  
    function initializeTerminalCommand (command: string): void {
      let commandSplit = command.split(" ")
      let commandP: string = commandSplit[0].toLowerCase();
      if (command.split(" ").length !== 2) {
      console.log(command.split(" ").length)
      return setMessages(`${commandP} is not a command`)
      }
      if (commandP === "tfs" || commandP === "tfontsize") {
        setFontSize(parseInt(commandSplit[1]) > 11 ? parseInt(commandSplit[1]) : 12)
        createMessage(commandP as string)
      }
      else if (commandP === "tc" || commandP === "tcolor") {
        setColor(commandSplit[1])
        createMessage(commandP as string)
      }
      else if (commandP === "tbcolor" || commandP === "tbc") {
        setBackgroundColor(commandSplit[1])
        createMessage(commandP as string)
      }
      else if (commandP === "tifs" || commandP === "tifontsize") {
        setTerminalInputFontSize(commandSplit[1])
        createMessage(commandP as string)
      }
      else if (commandP === "tic" || commandP === "ticolor") {
        setTerminalInputColor(commandSplit[1])
        createMessage(commandP as string)
      }
      else if (commandP === "tibackground" || commandP === "tibc") {
        setTerminalInputBackgroundColor(commandSplit[1])
        createMessage(commandP as string)
      }
      else if (commandP === "codefontsize" || commandP === "codefs") {
        setCodeFontSize(commandSplit[1])
        createMessage(commandP as string)
      }
      else if (commandP === "codecolor" || commandP === "codec") {
        setCodeColor(commandSplit[1])
        createMessage(commandP as string)
      }
      else if (commandP === "codebackgroundcolor" || commandP === "codebc") {
        setCodeBackgroundColor(commandSplit[1])
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
    <Header />
    <Principal backgroundColor={codeBackgroundColor} color={codeColor} fontSize={codeFontSize}/>
    <div className="terminal">
      <input placeholder='Use help to see all commands' style={{
            fontSize: `${fontSize}` ? `${fontSize}px` : `30px`,
            color: `${color}` ? `${color}` : 'white',
            backgroundColor: `${backgroundColor}` ? `${backgroundColor}` : "yellow",
            }} ref={terminalRef} onKeyDown={onKeyPressed} type="text" className="terminalInput" />
      <TerminalInputs color={terminalInputColor} backgroundColor={terminalInputBackgroundColor} fontSize={terminalInputFontSize} messages={messages}/>
    </div>
      <Footer />
  </div>
  )
}


export default App
