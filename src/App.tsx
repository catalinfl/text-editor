import './App.sass'
import TerminalInputs from './components/TerminalInputs/TerminalInputs'
import Footer from './components/Footer/Footer'
import React, { KeyboardEventHandler, useEffect } from 'react'
import "./components/Terminal/Terminal.sass"
import { useRef, useState } from 'react'
import Principal from './components/Principal/Principal'
import Header from './components/Header/Header'
import Help from './components/Help/Help'



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
    const [footerBackgroundColor, setFooterBackgroundColor] = useState<string>("")
    const [footerColor, setFooterColor] = useState<string>("");
    const [headerBackgroundColor, setHeaderBackgroundColor] = useState<string>("")
    const [headerColor, setHeaderColor] = useState<string>("");
    const [isHelpShow, setIsHelpShow] = useState<boolean>(false)

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
      if (commandP === "help") {
        setIsHelpShow(true)
        createMessage(commandP as string)
        return
      }
      if (commandP === "close") {
        setIsHelpShow(false)
        createMessage(commandP as string)
        return
      }
      if (commandP === "reset") {
        createMessage(commandP as string)
        setBackgroundColor("")
        setHeaderBackgroundColor("")
        setHeaderColor("")
        setFooterBackgroundColor("")
        setFooterColor("")
        setCodeColor("")
        setCodeFontSize("")
        setCodeBackgroundColor("")
        setTerminalInputBackgroundColor("")
        setTerminalInputColor("")
        setTerminalInputFontSize("")
        return
      }
      if (command.split(" ").length !== 2) {
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
      else if (commandP === "tofs" || commandP === "tofontsize") {
        setTerminalInputFontSize(commandSplit[1])
        createMessage(commandP as string)
      }
      else if (commandP === "toc" || commandP === "tocolor") {
        setTerminalInputColor(commandSplit[1])
        createMessage(commandP as string)
      }
      else if (commandP === "tobackground" || commandP === "tobc") {
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
      else if (commandP === "fc" || commandP === "footerc") {
        setFooterColor(commandSplit[1])
        createMessage(commandP as string)
      }
      else if (commandP === "fbc" || commandP === "footerbc") {
        setFooterBackgroundColor(commandSplit[1])
        createMessage(commandP as string)
      }
      else if (commandP === "hc" || commandP === "headerc") {
        setHeaderColor(commandSplit[1])
        createMessage(commandP as string)
      }
      else if (commandP === "hbc" || commandP === "headerbc") {
        setHeaderBackgroundColor(commandSplit[1])
        createMessage(commandP as string)
      }
      else if (commandP === "theme") {
        setBackgroundColor(commandSplit[1])
        setHeaderBackgroundColor(commandSplit[1])
        setFooterBackgroundColor(commandSplit[1])
        createMessage(commandP as string)
      }
      else if (commandP === "btheme") {
        setTerminalInputBackgroundColor(commandSplit[1])
        setCodeBackgroundColor(commandSplit[1])
        createMessage(commandP as string)
      }
      else
      setMessages(`${commandP} is not a command`)
    }
    
    function createMessage(word: string) {
      if (word === null) return;
      if (word === "help") {
        setMessages("help window is active, you can move it in page")
        return;
      }
      if (word === "close") {
        setMessages("window has been closed")
        return;
      }
      if (word === "reset") {
        setMessages("theme is now default")
        return;
      }
      setMessages(`${word} has been changed`)
    }

    
    useEffect(() => {
      if (terminalCommand !== null) {
        initializeTerminalCommand(terminalCommand as string)
    }
  }, [terminalCommand])




  return (
  <div className="editor">
    <Header color={headerColor} backgroundColor={headerBackgroundColor}/>
    <Principal backgroundColor={codeBackgroundColor} color={codeColor} fontSize={codeFontSize}/>
    <Help isShow={isHelpShow} border={headerColor} backgroundBorderColor={backgroundColor}/>
    <div className="terminal">
      <input spellCheck="false" placeholder={isHelpShow ? 'Type close to delete the help window': 'Use help to see all commands'} style={{
            fontSize: `${fontSize}` ? `${fontSize}px` : `30px`,
            color: `${color}` ? `${color}` : 'white',
            backgroundColor: `${backgroundColor}` ? `${backgroundColor}` : "yellow",
            }} ref={terminalRef} onKeyDown={onKeyPressed} type="text" className="terminalInput" />
      <TerminalInputs color={terminalInputColor} backgroundColor={terminalInputBackgroundColor} fontSize={terminalInputFontSize} messages={messages}/>
    </div>
      <Footer color={footerColor as string} backgroundColor={footerBackgroundColor}/>
  </div>
  )
}


export default App
