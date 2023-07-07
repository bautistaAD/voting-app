import { useState } from "react";
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"
import AdminSidebarData from "../components/admin-sidebar-data";

function AdminAccount() {
  const [sidebar, setSidebar] = useState("inactive");
  const [main, setMain] = useState("main-inactive")
  return (
    <div>
      <Navbar setSidebar={setSidebar} sidebar={sidebar} main={setMain}/>
      <div className="content-dashboard">
        <Sidebar sidebar={sidebar} sideData={AdminSidebarData}></Sidebar>
        <div className={main} style={{marginTop:"60px"}}>
          Account Emz
        </div>
      </div>
    </div>
  )
}

export default AdminAccount