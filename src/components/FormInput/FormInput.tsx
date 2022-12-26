import React from 'react'
import "./FormInput.sass"
import { useState, useRef } from 'react';

const FormInput = () => {

  const [count, setCount] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number | null>(null);
  const textareaRef = useRef<null | HTMLTextAreaElement>(null)


   function getValue(count: string) {
    setCount(count.length);
  }

  return (
    <div className="principalForm">
        <p> {count} </p>
        <textarea style={{fontSize: {fontSize} ? `${fontSize}px` : `12px`}} ref={textareaRef} className="principalInput" onChange={() => getValue(textareaRef.current!.value)}/>
    </div>
    )
}

export default FormInput