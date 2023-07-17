import { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import AdminSidebarData from "../components/admin-sidebar-data";
import '../assets/styles/admin-member.css'
import Search from "../components/search";
import HeaderBtnBlue from "../components/buttons/header-btn-blue";
import HeaderBtnGray from "../components/buttons/header-btn-gray";
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
// import Modal from "../components/modal";
import AddMemberModal from "../components/modals/add-member-modal";
import ImportCSVModal from "../components/modals/import-csv-modal";
import MembersTable from "../components/tables/members-table";



function AdminMember() {
  const [sidebar, setSidebar] = useState("inactive");
  const [main, setMain] = useState("main-inactive");
  const [showAdd, setShowAdd] = useState(false);
  const [showImport, setShowImport] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseImport = () => setShowImport(false);
  const handleShowImport = () => setShowImport(true);


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
                    <HeaderBtnBlue name={"ADD MEMBER"} icon={AddIcon} onClick={handleShowAdd}/>
                    <HeaderBtnGray name={"IMPORT"} icon={GetAppIcon} onClick={handleShowImport}/>
                  </div>
              </div>
              <MembersTable/>
              {/* modal */}
              <AddMemberModal show={showAdd} close={handleCloseAdd}/>
              <ImportCSVModal show={showImport} close={handleCloseImport}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminMember