import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';

function MemberDashboard() {
  const username = localStorage.getItem("username");
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

  return (
    <div>
      MEMBER DASHBOARD
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}

export default MemberDashboard;
