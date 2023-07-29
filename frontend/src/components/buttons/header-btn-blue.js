import React from 'react'
import { Button } from 'react-bootstrap'
import "../../assets/styles/header-buttons.css";

const HeaderBtnBlue = (prop) => {
  const btnName = prop.name;
  const Icon = prop.icon;
  const onClick = prop.onClick;
  const checker = prop.checker;
  return (
    <div> 
      {checker ? (<Button className="header-blue-btn btn-primary" onClick={onClick} disabled><Icon/>{btnName}</Button>) 
      :(<Button className="header-blue-btn btn-primary" onClick={onClick}><Icon/>{btnName}</Button>) }
    </div>
  )
}

export default HeaderBtnBlue