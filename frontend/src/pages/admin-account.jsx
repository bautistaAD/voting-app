import { useState } from "react";
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"
import AdminSidebarData from "../components/admin-sidebar-data";
import "../assets/styles/admin-account.css"
import AccountInput from "../components/account-input";
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { right } from "@popperjs/core";

function AdminAccount() {
  const [sidebar, setSidebar] = useState("inactive");
  const [main, setMain] = useState("main-inactive")
  const email = localStorage.getItem("email");

  return (
    <div>
      <Navbar setSidebar={setSidebar} sidebar={sidebar} main={setMain}/>
      <div className="content-account">
        <Sidebar sidebar={sidebar} sideData={AdminSidebarData}></Sidebar>
        <div className={main} id="admin-account-main"style={{marginTop:"60px"}}>
          <div className="account-page-base shadow mb-5 bg-body rounded">
            <div className="account-page-title">
              Manage Account
            </div>
            <form className="account-page-body">
              <AccountInput title={"Current Password"} placeholder={"Enter Current Password"}/>
              <AccountInput title={"New Password"} placeholder={"Enter New Password"}/>
              <AccountInput title={"Re-Type Password"} placeholder={"Re-Type New Password"}/>
            </form>
            <Button className="account-btn btn-dark btn-m float-right" style={{width:"80px",  float: "right", marginRight:"100px", marginTop: "15px" }}> Save  </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAccount