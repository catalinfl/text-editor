import "./Footer.sass"
import React, { useEffect } from 'react'

type FooterProps = {
  color?: string;
  backgroundColor?: string;
}

const Footer = ({color, backgroundColor}: FooterProps) => {
  
  return (
    <div className="footer"
    style={{
      color: `${color}` ? `${color}` : "black",
      backgroundColor: `${backgroundColor}` ? `${backgroundColor}` : "yellow" 
    }}
    >
      <p> Salut </p>
    </div>
  )
}

export default Footer