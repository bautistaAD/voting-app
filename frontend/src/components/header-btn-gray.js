import { Button } from 'react-bootstrap'
import "../assets/styles/header-buttons.css";

const HeaderBtnGray = (prop) => {
  const btnName = prop.name;
  const Icon = prop.icon;
  const onClick = prop.onClick;
  return (
    <div> 
      <Button className="header-gray-btn btn-primary" onClick={onClick}>
        <Icon/>
        {btnName}
      </Button>
    </div>
  )
}

export default HeaderBtnGray