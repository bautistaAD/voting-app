import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import '../assets/styles/sidebar.css';
import '../assets/styles/admin-dashboard.css';
import Sidebar from "../components/sidebar";
import AdminSidebarData from "../components/admin-sidebar-data"

function AdminDashboard() {
  const [sidebar, setSidebar] = useState("inactive");
  const [main, setMain] = useState("main-inactive")

  return (
    <div id="main">
      <Navbar setSidebar={setSidebar} sidebar={sidebar} main={setMain}/>
      <div className="content-dashboard">
        <Sidebar sidebar={sidebar} sideData={AdminSidebarData}></Sidebar>
        <div className={main} style={{marginTop:"60px"}}>
          JUMBO HATDOG KAYA MO BA TO
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
