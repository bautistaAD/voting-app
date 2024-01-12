import SelectInput from "./inputs/select-input";
import { useState, useEffect } from "react";
import DashboardCandidateCard from "./dashboard-candidate-card";

const DashboardCandidate = (props) => {
  const elections = props.elections
  const electionNames = props.electionNames
  const [selectElection, setSelectElection] = useState("");
  const [candidates, setCandidates] = useState([]); //candidates
  const [electionId, setElectionId] = useState() //id of selected election

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

  useEffect(() => {
      if(selectElection === "" || selectElection === undefined)
      {
          fetch('http://localhost:3001/get-candidates')
          .then(response => response.json())
          .then(body => {
              setCandidates(body);
          });
      }
      else
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
          setCandidates(body);
        }); 
      }
  },[candidates])

    return (
      <div className="dashboard-candidate-base shadow mb-5 bg-body rounded">
        <div className="dashboard-candidate-header">
          <div className="dashboard-candidate-title">Candidates</div>
          <SelectInput data={electionNames} onChange={handleSelectElection} value={selectElection === null ? ("") :(selectElection)}/>
        </div>
        <div className="dashboard-candidate-contents d-flex flex-wrap gap-2">
          {candidates.length === 0 ? (
          <div className="no-candidates d-flex justify-content-center text-secondary"> No Candidates. </div>
            ) : (
              candidates.map((mem, index) => (
                <DashboardCandidateCard key={index} name={`${mem.first_name} ${mem.last_name}`} />
              ))
          )}
        </div>
      </div>
    );
  }
  
  export default DashboardCandidate;