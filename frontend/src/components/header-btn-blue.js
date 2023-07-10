import React from 'react'
import { Button } from 'react-bootstrap'
import "../assets/styles/header-buttons.css";

const HeaderBtnBlue = (prop) => {
  const btnName = prop.name;
  const Icon = prop.icon;
  return (
    <div> 
      <Button className="header-blue-btn btn-primary">
        <Icon/>
        {btnName}
      </Button>
    </div>
  )
}

export default HeaderBtnBlue