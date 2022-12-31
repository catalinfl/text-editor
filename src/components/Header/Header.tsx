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
        padding: '3px 0px',
        color: `${color}` ? `${color}` : 'black',
        backgroundColor: `${backgroundColor}` ? `${backgroundColor}` : 'yellow'
      }}
    >
       <p> &#127919; Text editor </p>
    </div>
  )
}

export default Header