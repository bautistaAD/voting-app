import { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import AdminSidebarData from "../components/admin-sidebar-data";
import { Button } from "react-bootstrap";
import '../assets/styles/admin-member.css'
import Search from "../components/search";
import HeaderBtnBlue from "../components/header-btn-blue";
import HeaderBtnGray from "../components/header-btn-gray";
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
// import Modal from "../components/modal";
import AddMemberModal from "../components/add-member-modal";


function AdminMember() {
  const [sidebar, setSidebar] = useState("inactive");
  const [main, setMain] = useState("main-inactive");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
      <Navbar setSidebar={setSidebar} sidebar={sidebar} main={setMain} />
      <div className="content-member">
        <Sidebar sidebar={sidebar} sideData={AdminSidebarData}></Sidebar>
        <div className={main} id="admin-member-main" style={{ marginTop: "60px" }}>
          <div className="admin-member-page-base shadow mb-5 bg-body rounded">
            <div className="admin-member-page-title">Manage Members</div>
            <div className="admin-member-page-body">
              <div className="admin-member-page-header">
                {/* search inpput side */}
                  <Search/>
                  {/* add button side */}
                  <div className="add-btn">
                    <HeaderBtnBlue name={"ADD MEMBER"} icon={AddIcon} onClick={handleShow}/>
                    <HeaderBtnGray name={"IMPORT"} icon={GetAppIcon}/>
                  </div>
              </div>
              {/* modal */}
              <AddMemberModal show={show} close={handleClose}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminMember