import '../assets/styles/sidebar.css';
import '../assets/styles/admin-election.css';
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import AdminSidebarData from "../components/admin-sidebar-data"
import { useState } from 'react';

function AdminElection() {
  const [sidebar, setSidebar] = useState("inactive");
  const [main, setMain] = useState("main-inactive");
  const [startDT, setStartDT] = useState();

  const handleStartDT = (e) => {
    setStartDT(e.target.value);
  }

  const handleSumbit = () => {
    console.log(startDT);
  }

  return (
    <div id="main">
      <Navbar setSidebar={setSidebar} sidebar={sidebar} main={setMain}/>
      <div className="content-election">
        <Sidebar sidebar={sidebar} sideData={AdminSidebarData}></Sidebar>
        <div className={main}  id="admin-election-main" style={{marginTop:"60px"}}>
          ADMIN ELECTION
          <input type="datetime-local" onChange={handleStartDT}></input>
          <button onClick={()=> {handleSumbit()}}>Sumbit</button>
        </div>
      </div>
    </div>
  )
}

export default AdminElection