import '../assets/styles/sidebar.css';
import '../assets/styles/admin-election.css';
import Searchbar from "../components/search";
import HeaderBtnBlue from "../components/buttons/header-btn-blue";
import AddIcon from '@mui/icons-material/Add';
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import AdminSidebarData from "../components/admin-sidebar-data"
import AddElectionModal from '../components/modals/add-election-modal';
import { useState, useEffect } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import ElectionTable from '../components/tables/election-table';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

function AdminElection() {
  const [sidebar, setSidebar] = useState("inactive");
  const [main, setMain] = useState("main-inactive");
  const [showAddElection, setshowAddElection] = useState(false);
  const [elections, setElections] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredElection, setFilter] = useState([]); 
  const [refreshKey, setKey] = useState(0);


  //renders updated members in database
  useEffect(() => {
    fetch('http://localhost:3001/get-elections')
      .then(response => response.json())
      .then(body => {
        setElections(body);
        setFilter(body);;
      });
  }, [refreshKey]); // <-- para mag auto refresh pag may inadd :'>

  const showElectionModal = () => {
    setshowAddElection(true);
  }

  const closeElectionModal = () => {
    setshowAddElection(false);
  }
  
  const showToast = (success, message) => {
    if(success)
    {
      toast.success(message, {
        className: 'toast-nessage',
        theme: "colored"
      })
    }
    else
    {
      toast.error(message, {
        className: 'toast-nessage',
        theme: "colored"
      })

    }
  }


  const handleSearch = (e) => {
    const searchVal = e.target.value;
    setSearch(searchVal)

    if(searchVal.length > 0)
    {
      const searchData = elections.filter((row) => row.election_name.toLowerCase().includes(searchVal))
      setFilter(searchData);
    }
    else{
      setFilter(elections);
    }
  }

  return (
    <div id="main">
      <Navbar setSidebar={setSidebar} sidebar={sidebar} main={setMain}/>
      <div className="content-election">
        <Sidebar sidebar={sidebar} sideData={AdminSidebarData}></Sidebar>
        <div className={main}  id="admin-election-main" style={{marginTop:"60px"}}>
        <div className="admin-page-base shadow mb-5 bg-body rounded">
            <div className="admin-page-title">Manage Elections</div>
            <div className="admin-page-body">
              <div className="admin-page-header">
                {/* search inpput side */}
                  <Searchbar onChange={handleSearch}/>
                  {/* add button side */}
                  <div className="add-btn">
                    <HeaderBtnBlue name={"ADD ELECTION"} icon={AddIcon} onClick={showElectionModal}/>
                  </div>
              </div>
              <ElectionTable data={filteredElection}/>
              {/* modal */}
              <AddElectionModal show={showAddElection} close={closeElectionModal} toast={showToast} setKey={setKey} keyValue={refreshKey}/>     
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminElection