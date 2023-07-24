import '../assets/styles/sidebar.css';
import '../assets/styles/admin-election.css';
import Search from "../components/search";
import HeaderBtnBlue from "../components/buttons/header-btn-blue";
import AddIcon from '@mui/icons-material/Add';
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import AdminSidebarData from "../components/admin-sidebar-data"
import AddElectionModal from '../components/modals/add-election-modal';
import { useState } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import ElectionTable from '../components/tables/election-table';

function AdminElection() {
  const [sidebar, setSidebar] = useState("inactive");
  const [main, setMain] = useState("main-inactive");
  const [showAddElection, setshowAddElection] = useState(false);

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
                  <Search/>
                  {/* add button side */}
                  <div className="add-btn">
                    <HeaderBtnBlue name={"ADD ELECTION"} icon={AddIcon} onClick={showElectionModal}/>
                  </div>
              </div>
              <ElectionTable/>
              {/* modal */}
              <AddElectionModal show={showAddElection} close={closeElectionModal} toast={showToast}/>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminElection