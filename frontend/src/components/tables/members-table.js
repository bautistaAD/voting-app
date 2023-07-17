import "bootstrap/dist/css/bootstrap.min.css";
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
//import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import '../../assets/styles/admin-member.css'
import BootstrapTable from 'react-bootstrap-table-next';
import { useState, useEffect } from 'react';
import Status from '../status';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {ToastContainer, toast} from 'react-toastify';
import EditMemberModal from "../modals/edit-member-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';


const MembersTable = () => {
  const [members, setMembers] = useState([]);
  const [showEdit, setEdit] = useState(false); //modal
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //renders updated members in database
  useEffect(() => {
      fetch('http://localhost:3001/get-members')
      .then(response => response.json())
      .then(body => {
          setMembers(body);
      });
  })

  const showEditModal = () => setEdit(true);
  const closeEditModal = () => setEdit(false);

  const caret = (order) => {
    if (!order) 
    {
      return (
        <div className="caret">
          <FontAwesomeIcon icon={faSort} style={{color: "#c1c4c5",}} />
        </div>
      )
    }
    else if (order === 'asc') 
    {
      return(
        <div className="caret-asc">
          <FontAwesomeIcon icon={faSortUp} style={{color: "#7f7f7f",}} />
        </div>
      )
    } 
    else if (order === 'desc') 
    {
      return(
        <div className="caret-desc">
          <FontAwesomeIcon icon={faSortDown} style={{color: "#7f7f7f"}} />
        </div>
      )
    }
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
  
  //handles delete member
  const handleDelete = (email) => {
    fetch('http://localhost:3001/delete-member', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    })
    .then((response) => response.json())
    .then((body) => {
        showToast(body.success, body.message);
    })
  }

  //button for the table
  const renderButton = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div className="d-flex justify-content-evenly">
        <button className="btn btn-primary d-flex align-items-center justify-content-center" style={{width: "80px", height: "30px"}} onClick={showEditModal}>
          Edit
        </button>
        <button className="btn btn-danger d-flex align-items-center justify-content-center" style={{width: "80px", height: "30px"}} onClick={()=> {handleDelete(row.email)}}>
          Delete
        </button>
      </div>
    );
  };
  
  //column header of the table
  const columns = [
      {dataField: 'student_number', text: 'Student Number', sort: true, 
        sortCaret: (order, column) => {
          return caret(order);
        }
      },
      {dataField: 'last_name', text: 'Name' , sort: true,   
          formatter: (cell, row) => {
          const upperLastName = row.last_name.toUpperCase();
          return <div>{`${upperLastName}, ${row.first_name} ${row.middle_name}`}</div>;
        },
        sortCaret: (order, column) => {
          return caret(order);
        }
      },
      {dataField: 'email', text: 'Email', sort: true,
        sortCaret: (order, column) => {
          return caret(order);
        }
    },
      {dataField: 'user_type', text: 'Status', style: {'width' : '150px'},
        formatter: (cell, row) => {
          return(
              <Status className={"member-status"} name={row.user_type} bgColor={row.user_type === "Candidate" ? ("bg-success") : ("bg-warning")}/>
          )
        }},
        {dataField: 'action', text: 'Actions', formatter: renderButton, formatExtraData: null}
  ]

  const pageButtonRenderer = ({
    page,
    onPageChange
  }) => {
    const handleClick = (e) => {
      e.preventDefault();
      onPageChange(page);   ///. <<<<<<<<< please call this when page button change
    };
    // ....
    return (

      <li className="page-item">
        <a href="#"  onClick={ handleClick } className="page-link">{ page }</a>
      </li>
    );
  };
  
  const options = {
    paginationSize: 10,
    pageStartIndex: 1,
    hideSizePerPage: true,
    alwaysShowAllBtns: true,
    hidePageListOnlyOnePage: true,
    firstPageText: 'First',
    prePageText: 'Prev',
    nextPageText: 'Next',
    lastPageText: 'Last',
    withFirstAndLast: false,
    showTotal: true, 
    pageButtonRenderer
  };

  
return (
  <div>
      <ToastContainer pauseOnHover/>
      <div className='mt-4'>
        <BootstrapTable keyField='student-number' columns={columns} data={members} striped={true} bootstrap4={true}  pagination={paginationFactory(options)}/> 
    </div>
    <EditMemberModal show={showEdit} close={closeEditModal}/>
  </div>
)
}

export default MembersTable 