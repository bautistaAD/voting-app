import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/navbar.css';
// import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/js/dist/dropdown';
import '../assets/styles/sidebar.css'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';


function Navbar(prop) {
  const displayName = localStorage.getItem("username");
  const setSidebar = prop.setSidebar;
  const sidebar = prop.sidebar;
  const setMain = prop.main;
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set the initial state to `true`
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");

    if (!authToken) {
      setIsLoggedIn(false);
      navigate("/login");
    }
  }, [navigate]);

  const logout = () => {
    const cookies = new Cookies();
    cookies.remove("authToken");

    localStorage.removeItem("username");

    setIsLoggedIn(false);
    navigate("/login");
  };

  const activateSidebar = () => {
    if(sidebar === "active")
    {
      setSidebar("inactive")
      setMain("main-inactive")
    }
    else
    {
      setSidebar("active");
      setMain("main-active")
    }
  }

  return (
    <>
      <nav className="navbar fixed-top">
        <div className='menu-btn' onClick={activateSidebar}>
          <MenuOutlinedIcon className="menu-icon"/>
        </div>
        <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle rounded-0" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <AccountCircleRoundedIcon fontSize='large'/>
              {displayName}
            </a>
            <div className="dropdown-menu" >
                <div className='dropdown-container'style={{display: 'flex', alignItems: 'center',flexWrap: 'wrap', }}>
                  <AccountCircleRoundedIcon fontSize='large'/>
                  {displayName}
                </div>
                <Button id="logout-btn" onClick={logout}><LogoutRoundedIcon/>Logout</Button>
            </div>
          </div>
      </nav>
    </>
  )
}

export default Navbar