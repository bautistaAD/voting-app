import { useEffect, useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import Status from "../status";
import {useNavigate } from 'react-router-dom';

const DashboardElectionTable = (prop) => {
    const filter = prop.filter;
    const [elections, setElections] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      if(filter == "all")
      {
        fetch('http://localhost:3001/get-elections')
        .then(response => response.json())
        .then(body => {
          setElections(body);
        });
      }
      else if(filter == "ongoing"){
        fetch('http://localhost:3001/get-ongoing-elections')
        .then(response => response.json())
        .then(body => {
          setElections(body);
        });
      }
      else
      {
        fetch('http://localhost:3001/get-upcoming-elections')
        .then(response => response.json())
        .then(body => {
          setElections(body);
        });
      }
    }, [filter]);

  //generates status
  const electionStatusGenerator = (start, end) => {
    const current = new Date();

    if(start < current && current < end)
    {
        return("Open");
    }
    else if( current < start && current < end)
    {
        return("Upcoming");
    }
    else if(start < current && end <current )
    {
        return("Closed");
    }
  }
  
  //button for the table
  const renderButton = (cell, row, rowIndex, formatExtraData) => {
    const start = new Date(row.start_date_time);
    const end = new Date(row.end_date_time);
    const status = electionStatusGenerator(start,end);
    return (
      <button className="btn btn-success d-flex align-items-center justify-content-center" style={{width: "120px", height: "30px", fontSize: "1vw"}} 
        onClick={()=> {navigate(`/election-details/${row._id}`, {state: {status: status, name: row.election_name, from: `/admin-dashboard`}})}}>
        View Details
      </button>
    );
  };

  //identifies if the date of election is already done
  const dateIdentifier = (start, end) => {
    const current = new Date();
    
    if(start < current && end <current )
    {
        return("dashboard-date-base-inactive");
    }
    else
    {
      return("dashboard-date-base-active");
    }
  }

  //column header of the table
  const columns = [
    {dataField: 'date', text: '', headerAttrs: {hidden: true}, style: {'width' : '100px'},
      formatter: (cell, row) =>{
        const dayNames = ["SUN","MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const start = new Date(row.start_date_time);
        const end = new Date(row.end_date_time);
        const day = String(start.getDate()).padStart(2, '0');
        const weekday = String(start.getDay())
        const color = dateIdentifier(start, end);

        return(
          <div className={`${color}`}>
            <h2>{`${day}`}</h2>
            <div>{`${dayNames[weekday]}`}</div>
          </div>
        )
      }
    
    },
    {dataField: 'election_name', text: '', headerAttrs: {hidden: true}, style: {'width' : '500px'},
      formatter: (cell, row) => {
        return row.election_name.toUpperCase();
      }
    },
    {dataField: 'status', text: '', headerAttrs: {hidden: true}, style: {'width' : '200px'},
      formatter: (cell, row) => {
        const start = new Date(row.start_date_time);
            const end = new Date(row.end_date_time);
            const status = electionStatusGenerator(start,end);
        return  <Status className={"election-status"} name={status} bgColor={status === "Open" ? ("bg-success") : (status === "Closed" ? ("bg-danger") : ("bg-secondary"))}/>
      }
    },
    {dataField: 'vote_count', text: '',headerAttrs: {hidden: true}, style: {'width' : '200px'},
      formatter: (cell, row) => {
        return <div># votes</div>;
      }
    },
    {dataField: 'action', text: '',headerAttrs: {hidden: true}, formatter: renderButton, formatExtraData: null}
]

const emptyDataMessage = () => {
  return(
    <div className="d-flex justify-content-evenly align-items-center">
      <p className="m-0 text-secondary" >No Data</p>
    </div>
  )
};

  return (
    <div className='dashboard-election-table-base mb-5 bg-body rounded table-responsive'>
        <BootstrapTable keyField='election_name' columns={columns} data={elections} striped={true} bootstrap4={true} bordered={false} noDataIndication={emptyDataMessage}/> 
    </div>
  )
}

export default DashboardElectionTable;