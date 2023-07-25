import HeaderBtnGray from "../buttons/header-btn-gray";
import AddIcon from '@mui/icons-material/Add';
import AddPositionModal from "../modals/add-position-modal";
import { useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const PositionTable = () => {
    const [addModal, setAddModal] = useState(false);

    const showAddModal = () => setAddModal(true);
    const closeAddModal =() => setAddModal(false)

    const tempPositionData = [{
        position_name: "Executive Head Developer",
        election_id: "64b8d042cdfaae00e7977ffa"},
        {
        position_name: "Membership Affairs Head Developer",
        election_id: "64b8d042cdfaae00e7977ffa"}

    ];
  
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

  return (
    <div className='position-table-base mb-5 bg-body rounded'>
        <div className='position-table-header'>
            <p className='position-table-title'>Position</p>
            <HeaderBtnGray name="ADD" icon={AddIcon} onClick={showAddModal}/>
        </div>
         <BootstrapTable keyField='position_name' columns={columns} data={tempPositionData} striped={true} bootstrap4={true} bordered={false}/> 
        <AddPositionModal show={addModal} close={closeAddModal}/>
    </div>
  )
}

export default PositionTable