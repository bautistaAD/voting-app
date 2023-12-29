import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import AdminSidebarData from "../components/admin-sidebar-data";
import '../assets/styles/admin-member.css'
import Searchbar from "../components/search";
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
  const [members, setMembers] = useState([]);
  const [filterMem , setFilterMem] = useState([])
  const [refreshKey, setKey] = useState(0)
  const [search, setSearch] = useState("");

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseImport = () => setShowImport(false);
  const handleShowImport = () => setShowImport(true);

    //renders updated members in database
    useEffect(() => {
      fetch('http://localhost:3001/get-members')
      .then(response => response.json())
      .then(body => {
          setMembers(body);
          setFilterMem(body);
      });
  }, [refreshKey])

  const handleSearch = (e) => {
    const searchVal = e.target.value.toLowerCase();
    setSearch(searchVal)

    if(searchVal.length > 0)
    {
      const searchData = members.filter((row) => row.last_name.toLowerCase().includes(searchVal) || row.first_name.toLowerCase().includes(searchVal) 
      || row.middle_name.toLowerCase().includes(searchVal) || row.email.toLowerCase().includes(searchVal) || row.student_number.includes(searchVal)) ;
      setFilterMem(searchData);
    }
    else{
      setFilterMem(members);
    }
  }

  return (
    <div>
      <Navbar setSidebar={setSidebar} sidebar={sidebar} main={setMain} />
      <div className="content-member">
        <Sidebar sidebar={sidebar} sideData={AdminSidebarData}></Sidebar>
        <div className={main} id="admin-main" style={{ marginTop: "60px" }}>
          <div className="admin-page-base shadow mb-5 bg-body rounded">
            <div className="admin-page-title">Manage Members</div>
            <div className="admin-page-body">
              <div className="admin-page-header">
                {/* search inpput side */}
                  <Searchbar onChange={handleSearch}/>
                  {/* add button side */}
                  <div className="add-btn">
                    <HeaderBtnBlue name={"ADD MEMBER"} icon={AddIcon} onClick={handleShowAdd}/>
                    <HeaderBtnGray name={"IMPORT"} icon={GetAppIcon} onClick={handleShowImport}/>
                  </div>
              </div>
              <MembersTable data={filterMem} setKey={setKey} keyValue={refreshKey}/>
              {/* modal */}
              <AddMemberModal show={showAdd} close={handleCloseAdd} setKey={setKey} keyValue={refreshKey}/>
              <ImportCSVModal show={showImport} close={handleCloseImport} setKey={setKey} keyValue={refreshKey}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminMember