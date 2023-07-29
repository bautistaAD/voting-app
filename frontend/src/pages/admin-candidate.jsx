import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import AdminSidebarData from '../components/admin-sidebar-data';
import SelectInput from "../components/inputs/select-input";
import Searchbar from "../components/search";
import "../assets/styles/admin-candidates.css";
import HeaderBtnBlue from "../components/buttons/header-btn-blue";
import AddIcon from '@mui/icons-material/Add';
import HeaderBtnGray from "../components/buttons/header-btn-gray";
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import AddCandidateModal from "../components/modals/add-candidates-modal";

function AdminCandidate() {
  const [sidebar, setSidebar] = useState("inactive");
  const [main, setMain] = useState("main-inactive");

  const [elections, setElections] = useState([]); //array of election objects
  const [selectElection, setSelectElection] = useState(""); //selected election
  const [electionId, setElectionId] = useState() //id of selected election
  const [positions, setPositions] = useState([]); //array of positions of selected election
  const [selectPosition, setSelectPosition] = useState(""); 
  const [positionId, setPositionId] = useState();

  const [add, setAdd] = useState(false);

  const addInputChecker = selectElection === "" || selectPosition === ""; //if not selected "add candidate" btn is disabled

  useEffect(() => {
    fetch('http://localhost:3001/get-elections')
      .then(response => response.json())
      .then(body => {
        setElections(body);
      });

      fetch('http://localhost:3001/get-positions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          election_id: electionId
        }) 
      })
      .then(response => response.json())
      .then(body => {
        setPositions(body)
      });
  }, [selectElection, selectPosition]);


 const showAdd = () => setAdd(true);
 const closeAdd = () => setAdd(false);

//gets name of election from array of object
  const getElectionNames = (elections) => {
    if(elections === undefined) return ["None"]
    else
    {
      const electionNames = [];
      const current = new Date();

      for (let i = 0; i < elections.length; i++)
      {
        let start = new Date(elections[i].start_date_time);
        let end = new Date(elections[i].end_date_time);

        if(!(start < current && end <current))
        {
          electionNames.push(elections[i].election_name.toUpperCase())
        }
      }

      return electionNames
    }
  }

//get if of the selected election
  const getElectionId = (name) => {
    if(name !=="")
    {
      for(let i = 0; i < elections.length; i++)
      {
        if(name.toLowerCase() === elections[i].election_name) 
        {setElectionId(elections[i]._id)}
      }
    }
  }

  const handleSelectElection = (e) => {
    console.log(e.target.value)
    setSelectElection(e.target.value);
    getElectionId(e.target.value);
  }

 
  const getPositionNames = (positions) => {
    if(positions === undefined) return ["None"]
    else
    {
      const positionNames = []

      for (let i = 0; i < positions.length; i++)
      {
        positionNames.push(positions[i].position_name.toUpperCase())
      }

      return positionNames
    }
  }

  const getPositionId = (name) => {
    if(name !=="")
    {
      for(let i = 0; i < positions.length; i++)
      {
        if(name.toLowerCase() === positions[i].position_name) 
        {setPositionId(positions[i]._id)}
      }
    }
  }

  const handleSelectPosition = (e) => {
    console.log(e.target.value)
    setSelectPosition(e.target.value);
    getPositionId(e.target.value);
  }

  return (
     <div id="main">
      <Navbar setSidebar={setSidebar} sidebar={sidebar} main={setMain}/>
      <div className="content-election">
        <Sidebar sidebar={sidebar} sideData={AdminSidebarData}></Sidebar>
        <div className={main}  id="admin-election-main" style={{marginTop:"60px"}}>
        <div className="admin-page-base shadow mb-5 bg-body rounded">
            <div className="admin-page-title">Manage Candidates</div>
            <div className="admin-page-body">
              <div className="admin-page-header d-flex flex-column">
                <div className="candidate-selectors d-flex gap-4 flex-wrap"> 
                  <SelectInput data={getElectionNames(elections)} label="Election Name" id="election-selector" onChange={handleSelectElection} value={selectElection === null ? ("") :(selectElection)}/>
                  <SelectInput data={getPositionNames(positions)} label="Position" id="position-selector" onChange={handleSelectPosition} value={selectPosition === null ? ("") :(selectPosition)}/>
                </div>
                <div className="sub-header d-flex flex-wrap justify-content-between">
                    <div className="sub-header-left d-flex gap-3">
                      <Searchbar/>
                      <HeaderBtnGray name="SORT" icon={SortOutlinedIcon}/>
                    </div>
                    <HeaderBtnBlue name="ADD CANDIDATE" icon={AddIcon} checker={addInputChecker} onClick={showAdd}/>
                </div>
              </div>
              {/* cards */}

              {/* modal */}
              <AddCandidateModal show={add} close={closeAdd} />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCandidate