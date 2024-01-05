import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import '../assets/styles/sidebar.css';
import '../assets/styles/admin-dashboard.css';
import Sidebar from "../components/sidebar";
import AdminSidebarData from "../components/admin-sidebar-data"
import DashboardCard from "../components/dashboard-card";
import membersPng from "../assets/images/group.png";
import electionPng from "../assets/images/election.png";

function AdminDashboard() {
  const [sidebar, setSidebar] = useState("inactive");
  const [main, setMain] = useState("main-inactive");
  const [electionCount, setElectionCount] = useState()
  const [memberCount, setMemberCount] = useState()

  useEffect(()=>{
    fetch('http://localhost:3001/get-election-count')
    .then((response) => response.json())
    .then((body) =>{
      setElectionCount(body)
    })

    fetch('http://localhost:3001/get-members-count')
    .then((response) => response.json())
    .then((body) =>{
      setMemberCount(body)
    })
  }, [electionCount, memberCount])

  return (
    <div id="main">
      <Navbar setSidebar={setSidebar} sidebar={sidebar} main={setMain}/>
      <div className="content-dashboard">
        <Sidebar sidebar={sidebar} sideData={AdminSidebarData}></Sidebar>
        <div className={main} style={{marginTop:"60px"}}>
          <div className="dashboard-base">
            <div className="dashboard dashboard-left">
                <div className="dashboard-left-top">
                  <DashboardCard png={membersPng} name={"Current Members"} count={memberCount} iconClass={"dashboard-card-icon icon-blue rounded-circle"}/>
                  <DashboardCard png={electionPng} name={"Elections"} count={electionCount} iconClass={"dashboard-card-icon icon-orange rounded-circle"}/>
                </div>
            </div>
            <div className="dashboard dashboard-right">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
