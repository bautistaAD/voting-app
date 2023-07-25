import '../assets/styles/admin-election.css';
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import AdminSidebarData from "../components/admin-sidebar-data"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Status from '../components/status';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PositionTable from '../components/tables/position-table';

const ElectionDetails = () => {
    const [sidebar, setSidebar] = useState("inactive");
    const [main, setMain] = useState("main-inactive");
    const [details, setDetails] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    let status = location.state.status;  // get state
    let {name} = useParams();

    const nameDisplay = name.toUpperCase();

    useEffect(() => {
      fetch(`http://localhost:3001/get-election-by-name?name=${name}`)
      .then((response) => response.json())
      .then((body) => {
        setDetails(body);
      })
    });
  

  return (
    <div id="main">
      <Navbar setSidebar={setSidebar} sidebar={sidebar} main={setMain}/>
      <div className="content-election">
        <Sidebar sidebar={sidebar} sideData={AdminSidebarData}></Sidebar>
        <div className={main}  id="admin-election-main" style={{marginTop:"60px"}}>
          <div className='main-inner'>
            <div className='back-btn' onClick={()=>{navigate(`/admin-election`)}}>
                <ArrowBackIosIcon/>
                {"Back"}
            </div>
            <div className="admin-page-base shadow mb-5 bg-body rounded">
                <div className="admin-page-title">Election Details</div>
                <div className="admin-page-body">
                <div className="admin-page-header" id="election-details">

                  <div className='election-title'>
                    <div className='election-title-left'>
                      <h3>{nameDisplay}</h3>
                      <Status className={"election-details-status"} name={status.toUpperCase()} bgColor={status === "Open" ? ("bg-success") : (status === "Closed" ? ("bg-danger") : ("bg-secondary"))}/>
                    </div>
                    <div className='election-title-right'>
                      <div className='edit-delete-btns'>
                      <ModeEditOutlineOutlinedIcon fontSize='medium' id="election-details-edit"/>
                      <DeleteOutlineOutlinedIcon fontSize='medium' id="election-details-delete"/>
                      </div>
                    </div>
                  </div>

                  <div className='election-data'>
                    <div className='election-data-left'>
                      <div className='time-date-data'>
                          <div className='open-date'>
                            <p className='date-label'>Opening Date</p>
                            <p className='date-data'>{new Date(details.start_date_time).toLocaleDateString()}</p>
                          </div>
                          <div className='open-time'>
                            <p className='time-label'>Opening Time</p>
                            <p className='time-data'>{new Date(details.start_date_time).toLocaleTimeString()}</p>
                          </div>
                          <div className='close-date'>
                            <p className='date-label'>Closing Date</p>
                            <p className='date-data'>{new Date(details.end_date_time).toLocaleDateString()}</p>
                          </div>
                          <div className='close-time'>
                            <p className='time-label'>Closing Time</p>
                            <p className='time-data'>{new Date(details.end_date_time).toLocaleTimeString()}</p>
                          </div>
                      </div>
                      <Button className='btn-success'>View Results</Button>
                    </div>
                  </div>

                </div>
                <PositionTable/>
                {/* modal */}
                {/* <AddElectionModal show={showAddElection} close={closeElectionModal} toast={showToast}/> */}

                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ElectionDetails