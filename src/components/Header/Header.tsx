import React from 'react'
import './Header.sass'
type HeaderProps = {
  color?: string;
  backgroundColor: string;
}
const Header = ({color, backgroundColor}: HeaderProps) => {
  return (
    <div className="header"
      style={{
        color: `${color}` ? `${color}` : 'black',
        backgroundColor: `${backgroundColor}` ? `${backgroundColor}` : 'yellow'
      }}
    >
       <p> Text editor </p>
    </div>
  )
}

export default Header