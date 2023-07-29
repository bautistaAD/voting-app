import { Modal } from "react-bootstrap"
import ModalButtons from "../buttons/modal-btns";
import SelectInput from "../inputs/select-input";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import {ToastContainer, toast} from 'react-toastify';



const AddCandidateModal = (prop) => {
  const show = prop.show;
  const close = prop.close;
  const positionId = prop. posId;
  const setKey = prop.setKey;
  const key = prop.keyValue;

  const [members, setMembers] = useState([]);
  const [candidate, setCandidate] = useState("");
  const [gpoa, setGpoa] = useState(null);
  const [memid, setMemId] = useState();
  const [candidates, setCandidates] = useState([]);
  const [checker, setChecker] = useState()
   //renders updated members in database
    useEffect(() => {
        fetch('http://localhost:3001/get-members')
        .then(response => response.json())
        .then(body => {
            setMembers(body);
        });

        fetch('http://localhost:3001/get-candidates')
        .then(response => response.json())
        .then(body => {
            setCandidates(body);
        });
    }, [checker]) 
    
const candidateChecker = (member) =>{
  fetch("http://localhost:3001/check-if-candidate", {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      member_id: member,
      position: positionId
    })
  })
  .then((response) => response.json())
  .then((body) => {
    setChecker(body.isCandidate)
  })
}

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

const getMemId = (name) => {
  if(name !=="" || name !== undefined)
  {
    fetch("http://localhost:3001/get-mem-id-by-name", {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        fullName: name
      })
    })
    .then((response) => response.json())
    .then((body) => {
      setMemId(body._id);

    })
  }
}


const handleCandidate = (e) => {
  setCandidate(e.target.value)
  getMemId(e.target.value)
}; 

const handleGpoa = (e) => {setGpoa(e.target.files[0])
  console.log(e.target.files[0])
} ;

const resetInput = () => {
  setGpoa(null);
  setCandidate("");

}

const handleAdd = () => {
    //mem id is saved as string
    console.log(memid)
    console.log(positionId)
    const formData = new FormData();
    formData.append('member_id', memid);
    formData.append('position', positionId);
    formData.append('gpoa', gpoa);

    fetch("http://localhost:3001/add-candidate", {
      method: 'POST',
      body: formData
    })
    .then((response) => response.json())
    .then((body) => {
      showToast(body.success, body.message);
      resetInput();
      close();
    })
  }



  return (
    <div className="add-candidate-modal">
    <ToastContainer pauseOnHover={false}/>
    <Modal show={show} centered className="modal-container" >
        <Modal.Body className="modal-body">
        <Modal.Title className="modal-title">Add Candidate</Modal.Title>
        {/* onChange={handleType} value={type} */}
            <SelectInput label={"Select Member"} id="select-candidate" data={getMemberNames(members)} onChange={handleCandidate} value={candidate} />
            {/* upload file */}
            <div className="custom-file">
              <div className='modal-label'>General Plan of Action</div>
              <input  style={{marginBottom:"10px"}} type="file" className="form-control" accept=".pdf" onChange={handleGpoa} />
            </div>
            {/* onClick={handleAddElection} inputChecker={inputChecker} */}
            <ModalButtons name={"Add"} close={close} onClick={()=> {handleAdd()}}/>
        </Modal.Body> 
    </Modal>
  </div>
  )
}

export default AddCandidateModal