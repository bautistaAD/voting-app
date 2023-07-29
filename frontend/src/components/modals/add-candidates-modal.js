import { Modal } from "react-bootstrap"
import ModalButtons from "../buttons/modal-btns";
import SelectInput from "../inputs/select-input";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';
import { useState, useEffect } from "react";

const AddCandidateModal = (prop) => {
  const show = prop.show;
  const close = prop.close;
  const toast = prop.toast;
  const setKey = prop.setKey;
  const key = prop.keyValue;

  const [members, setMembers] = useState([]);
  const [candidate, setCandidate] = useState("");

   //renders updated members in database
    useEffect(() => {
        fetch('http://localhost:3001/get-members')
        .then(response => response.json())
        .then(body => {
            setMembers(body);
        });
    })      

const getMemberNames = (members) => {
    if(members === undefined) return ["None"]
    else
    {
      const memberNames = [];

      for (let i = 0; i < members.length; i++)
      {
        let fullName = members[i].last_name.toUpperCase() + ', ' + members[i].first_name.toUpperCase()
        memberNames.push(fullName)
      }

      return memberNames
    }
}

const handleAddCandidate = (e) => setCandidate(e.target.value); 



  return (
    <div className="add-candidate-modal">
    {/* <ToastContainer pauseOnHover={false}/> */}
    <Modal show={show} centered className="modal-container" >
        <Modal.Body className="modal-body">
        <Modal.Title className="modal-title">Add Candidate</Modal.Title>
        {/* onChange={handleType} value={type} */}
            <SelectInput label={"Select Member"} id="select-candidate" data={getMemberNames(members)} onChange={handleAddCandidate} value={candidate} />
            {/* upload file */}
            {/* onClick={handleAddElection} inputChecker={inputChecker} */}
            <ModalButtons name={"Add"} close={close} />
        </Modal.Body> 
    </Modal>
</div>
  )
}

export default AddCandidateModal