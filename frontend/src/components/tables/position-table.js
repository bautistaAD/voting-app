import HeaderBtnGray from "../buttons/header-btn-gray";
import AddIcon from '@mui/icons-material/Add';
import AddPositionModal from "../modals/add-position-modal";
import { useEffect, useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const PositionTable = (prop) => {
    const electionId = prop.elecID;
    const [addModal, setAddModal] = useState(false);
    const [positions, setPositions] = useState([]);

    const showAddModal = () => setAddModal(true);
    const closeAddModal =() => setAddModal(false)

    // const tempPositionData = [{
    //     position_name: "Executive Head Developer",
    //     election_id: "64b8d042cdfaae00e7977ffa"},
    //     {
    //     position_name: "Membership Affairs Head Developer",
    //     election_id: "64b8d042cdfaae00e7977ffa"}

    // ];

    useEffect(() => {
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
    })
  
  //button for the table
  const renderButton = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div className="d-flex flex-wrap gap-3 justify-content-end">
        <button className="btn btn-success d-flex align-items-center justify-content-center" style={{width: "120px", height: "30px", fontSize: "1vw"}} >
          Candidates
        </button>
        <button className="btn btn-primary d-flex align-items-center justify-content-center" style={{width: "100px", height: "30px", fontSize: "1vw"}} >
          Edit
        </button>
        <button className="btn btn-danger d-flex align-items-center justify-content-center" style={{width: "100px", height: "30px", fontSize: "1vw"}} >
          Delete
        </button>
      </div>
    );
  };

  //column header of the table
  const columns = [
    {dataField: 'position_name', text: '', headerAttrs: {hidden: true}, style: {'width' : '550px'}},
    {dataField: 'candidate count', text: '',headerAttrs: {hidden: true}, style: {'width' : '300px'},
      formatter: (cell, row) => {
        return <div># Candidates</div>;
      }
    },
    {dataField: 'action', text: 'Actions',headerAttrs: {hidden: true}, formatter: renderButton, formatExtraData: null}
]

const emptyDataMessage = () => {
  return(
    <div className="d-flex justify-content-evenly align-items-center">
      <p className="m-0 text-secondary" >No Data</p>
    </div>
  )
};

  return (
    <div className='position-table-base mb-5 bg-body rounded'>
        <div className='position-table-header'>
            <p className='position-table-title'>Position</p>
            <HeaderBtnGray name="ADD" icon={AddIcon} onClick={showAddModal}/>
        </div>
         <BootstrapTable keyField='position_name' columns={columns} data={positions} striped={true} bootstrap4={true} bordered={false} noDataIndication={emptyDataMessage}/> 
        <AddPositionModal show={addModal} close={closeAddModal} elecID={electionId}/>
    </div>
  )
}

export default PositionTable