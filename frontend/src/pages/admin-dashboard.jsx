import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import '../assets/styles/sidebar.css';
import '../assets/styles/admin-dashboard.css';
import Sidebar from "../components/sidebar";

function AdminDashboard() {
  const username = localStorage.getItem("username");
  const [sidebar, setSidebar] = useState("inactive");
  const [main, setMain] = useState("main-inactive")

  return (
    <div id="main">
      <Navbar displayName={username} setSidebar={setSidebar} sidebar={sidebar} main={setMain}/>
      <div className="content">
        <Sidebar sidebar={sidebar}></Sidebar>
        <div className={main} style={{marginTop:"60px"}}>
          JUMBO HATDOG KAYA MO BA TO
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
