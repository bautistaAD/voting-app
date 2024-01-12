import { useState, useEffect } from "react";
import {ToastContainer, toast} from 'react-toastify';
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
import DeletePrompt from "../components/modals/delete-prompt";
import CandidateCard from "../components/cards";

function AdminCandidate() {
  const [sidebar, setSidebar] = useState("inactive");
  const [main, setMain] = useState("main-inactive");

  const [elections, setElections] = useState([]); //array of election objects
  const [selectElection, setSelectElection] = useState(""); //selected election
  const [electionId, setElectionId] = useState() //id of selected election
  const [positions, setPositions] = useState([]); //array of positions of selected election
  const [selectPosition, setSelectPosition] = useState(""); //selected position
  const [positionId, setPositionId] = useState(); //id of selected position
  const [candidates, setCandidates] = useState([]); //candidates
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [add, setAdd] = useState(false);
  const [del, setDelete] = useState(false);
  const [memId, setMemId] = useState("");

  const addInputChecker = selectElection === "" || selectPosition === ""; //if not selected "add candidate" btn is disabled

  const sortCandidate = (body) => {
    if(sort ==="") 
    {
      setCandidates(body);
    }
    else if(sort === "asc")
    {
      const sortedCandidatesCopy = [...body];
      sortedCandidatesCopy.sort((a, b) => a.first_name.localeCompare(b.first_name));
      setCandidates(sortedCandidatesCopy);
    }
    else{
      const sortedCandidatesCopy = [...body];
      sortedCandidatesCopy.sort((a, b) => b.first_name.localeCompare(a.first_name));
      setCandidates(sortedCandidatesCopy);
    }
  }

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
        // updatePostions()
      });

      if(selectElection === "" || selectElection === undefined)
      {
        fetch('http://localhost:3001/get-candidates')
        .then(response => response.json())
        .then(body => {
          sortCandidate(body);
        });
      }
      else
      {
          if(positionId == undefined)
          {
            fetch('http://localhost:3001/get-candidates-election',{
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
              sortCandidate(body);
            });
          }
          else
          {
            fetch('http://localhost:3001/get-candidates-per-position',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                position: positionId
              }) 
            })
            .then(response => response.json())
            .then(body => {
              sortCandidate(body);
            });
          }
      }
  },[candidates]);

  const showAdd = () => setAdd(true);
  const closeAdd = () => setAdd(false);
  const closeDel = () => setDelete(false);
  const showDel = (memberId) => {
    setDelete(true);
    setMemId(memberId)
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

  const handleSelectPosition = (e) => {
    setSelectPosition(e.target.value);
    getPositionId(e.target.value);
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
    setSelectElection(e.target.value);
    getElectionId(e.target.value); 

    //reset
    setSelectPosition("");
    setPositionId(null)
  }

  const handleSort = () =>{
    if(sort === "" || sort === "desc")
    {
      setSort("asc")
    }
    else{
      setSort("desc")
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const showToast = (success, message) => {
    if(success)
    {
      
      toast.success(message, {
        className: 'toast-message',
        theme: "colored"
      })
    }
    else
    {
      toast.error(message, {
        className: 'toast-message',
        theme: "colored"
      })
  
    }
  }

  const handleDel = () => {
    //if both election and position dropdown is empty or position ONLY is empty
    if(selectElection === "" || selectElection === undefined)
    {
      fetch('http://localhost:3001/delete-many-candidate',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                member_id: memId
              }) 
            })
            .then(response => response.json())
            .then(body => {
              showToast(body.success, body.message);
            });
    }
    //if election has value
    else
    {
      if(positionId == undefined)
      {

      }
      //if both dropdown has values
      else
      {

      }
    }
    closeDel()
    

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
                  <SelectInput data={getPositionNames(positions)} label="Position" id="position-selector" onChange={handleSelectPosition } value={selectPosition === null ? ("") :(selectPosition)}/>
                </div>
                <div className="sub-header d-flex flex-wrap justify-content-between">
                    <div className="sub-header-left d-flex gap-3">
                      <Searchbar onChange={handleSearch}/>
                      <HeaderBtnGray name="SORT" icon={SortOutlinedIcon}  onClick={handleSort}/>
                    </div>
                    <HeaderBtnBlue name="ADD CANDIDATE" icon={AddIcon} checker={addInputChecker} onClick={showAdd}/>
                </div>
              </div>
              {/* cards */}
              <div className="candidate-cards d-flex flex-wrap gap-3">
                {/* {candidates.length === 0 ? (<div className="no-candidates d-flex justify-content-center text-secondary"> No Candidates. </div>) : 
              ( candidates.map((mem, index) => (

                <CandidateCard key={index} name={mem.first_name + " " + mem.last_name} email={mem.email}/>
              )) 
              )} */}
               {candidates.length === 0 ? (
                  <div className="no-candidates d-flex justify-content-center text-secondary"> No Candidates. </div>
                ) : (
                  candidates
                    .filter((mem) => {
                      const fullName = `${mem.first_name} ${mem.last_name}`;
                      return fullName.toLowerCase().includes(search.toLowerCase()) || mem.email.toLowerCase().includes(search.toLowerCase());
                    })
                    .map((mem, index) => (
                      // del={() => handleDel(mem._id)}
                      <CandidateCard key={index} name={`${mem.first_name} ${mem.last_name}`} email={mem.email} del={() => showDel(mem._id)}/> 
                    ))
                )}
                
                {/* If no matching candidates for the search query */}
                {candidates.length > 0 && candidates.filter((mem) => {
                  const fullName = `${mem.first_name} ${mem.last_name}`;
                  return fullName.toLowerCase().includes(search.toLowerCase()) || mem.email.toLowerCase().includes(search.toLowerCase());
                }).length === 0 && (
                  <div className="no-candidates d-flex justify-content-center text-secondary"> No matching candidates found. </div>
                )}
              </div>

              {/* modal */}
              <AddCandidateModal show={add} close={closeAdd} posId={positionId} />
              <DeletePrompt show={del} close={closeDel} setDel={handleDel}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCandidate