import "bootstrap/dist/css/bootstrap.min.css";
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import BootstrapTable from 'react-bootstrap-table-next';
import { useState, useEffect } from 'react';
import Status from './status';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';

const MembersTable = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
      fetch('http://localhost:3001/get-members')
      .then(response => response.json())
      .then(body => {
          setMembers(body);
      });
  })


  const renderButton = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div className="d-flex justify-content-evenly">
        <button className="btn btn-primary d-flex align-items-center justify-content-center" style={{width: "80px", height: "30px"}}>
          Edit
        </button>
        <button className="btn btn-danger d-flex align-items-center justify-content-center" style={{width: "80px", height: "30px"}}>
          Delete
        </button>
      </div>
    );
  };
  
  const columns = [
      {dataField: 'student_number', text: 'Student Number', sort: true, width:'fit-content'},
      {dataField: 'last_name', text: 'Name' , sort: true,   
          formatter: (cell, row) => {
          const upperLastName = row.last_name.toUpperCase();
          return <div>{`${upperLastName}, ${row.first_name} ${row.middle_name}`}</div>;
        }},
      {dataField: 'email', text: 'Email', sort: true},
      {dataField: 'user_type', text: 'Status', style: {'width' : '150px'},
        formatter: (cell, row) => {
          return(
              <Status className={"member-status"} name={row.user_type} bgColor={row.user_type === "Candidate" ? ("bg-success") : ("bg-warning")}/>
          )
        }},
        {dataField: 'action', text: 'Actions', formatter: renderButton, formatExtraData: null}
  ]

  const defaultSorted = [{
    dataField: 'student_number',
    order: 'desc'
  }];



return (
  <div className='mt-4'>
      <BootstrapTable keyField='student-number' columns={columns} data={members} striped={true} defaultSorted={defaultSorted} bootstrap4={true}/>
  </div>
)
}

export default MembersTable 