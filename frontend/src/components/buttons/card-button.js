import React from 'react'
import { Button } from 'react-bootstrap'
import "../../assets/styles/admin-candidates.css";

const CardButton = (prop) => {
  const btnName = prop.name;
  const onClick = prop.onClick;

  return (
    <div> 
        <Button className="card-button btn btn-outline-dark" >{btnName}</Button>
    </div>
  )
}

export default CardButton;