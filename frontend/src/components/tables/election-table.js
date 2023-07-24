import "bootstrap/dist/css/bootstrap.min.css";
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
import {useNavigate } from 'react-router-dom';


const ElectionTable = () => {
  const [elections, setElections] = useState([]);
  const navigate = useNavigate();

  //renders updated members in database
  useEffect(() => {
    fetch('http://localhost:3001/get-elections')
      .then(response => response.json())
      .then(body => {
        setElections(body);
      });
  }); // <-- Add an empty dependency array here


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
      <div className="d-flex justify-content-evenly">
        {/* onClick={showEditModal} */}
        <button className="btn btn-success d-flex align-items-center justify-content-center" style={{width: "fit-content", height: "30px", fontSize:"1vw"}} 
        onClick={()=> {navigate(`/election-details/${row.election_name}`, {state: {status: status}})}} >
         View Details
        </button>
      </div>
    );
  };
  
  //column header of the table
  const columns = [
      {dataField: 'election_name', text: 'Election Name', sort: true, 
        sortCaret: (order, column) => {
          return caret(order);
        }
      },
      {dataField: 'start_date_time', text: 'Start' , sort: true,   
          formatter: (cell, row) => {
          const startDate = (new Date(row.start_date_time)).toLocaleDateString();
          const startTime = (new Date(row.start_date_time)).toLocaleTimeString();
          return <div>{`${startDate} ${startTime}`}</div> ;
        },
        sortCaret: (order, column) => {
          return caret(order);
        }
      },
      {dataField: 'end_date_time', text: 'End' , sort: true,   
          formatter: (cell, row) => {
            const endDate = (new Date(row.end_date_time)).toLocaleDateString();
            const endTime = (new Date(row.end_date_time)).toLocaleTimeString();
            return <div>{`${endDate} ${endTime}`}</div> ;
        },
        sortCaret: (order, column) => {
          return caret(order);
        }
      },
      {dataField: 'status', text: 'Status', style: {'width' : '150px'},
        formatter: (cell, row) => {
            const start = new Date(row.start_date_time);
            const end = new Date(row.end_date_time);
            const status = electionStatusGenerator(start,end);
          return(
              <Status className={"election-status"} name={status} bgColor={status === "Open" ? ("bg-success") : (status === "Closed" ? ("bg-danger") : ("bg-secondary"))}/>
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

// const renderPaginationList = (props) => {
//     return (
//       <ul className="pagination justify-content-center" key={props.currentPage}> {/* Add key prop here */}
//         {props.pages.map((page) => (
//           <li key={page} className={`page-item ${props.currentPage === page ? 'active' : ''}`}>
//             <a className="page-link" onClick={() => props.onPageChange(page)}>{page}</a> {/* Add key prop here */}
//           </li>
//         ))}
//       </ul>
//     );
//   };
  
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
    // renderPaginationList
  };

  
return (
  <div>
      <ToastContainer pauseOnHover/>
      <div className='mt-4'>
        <BootstrapTable keyField='election_name' columns={columns} data={elections} striped={true} bootstrap4={true}  pagination={paginationFactory(options)}/> 
    </div>
  </div>
)
}

export default ElectionTable 