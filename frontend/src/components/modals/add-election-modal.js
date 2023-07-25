import { Modal } from "react-bootstrap"
import ModalButtons from "../buttons/modal-btns";
import ModalTextInput from "../inputs/modal-text-input";
import ModalDateTimeInput from "../inputs/datetime-input";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';
import { useState } from "react";

const AddElectionModal = (prop) => {
  const show = prop.show;
  const close = prop.close;
  const toast = prop.toast;
  const setKey =prop.setKey;
  const key = prop.key;

  const [electionName, setElectionName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const inputChecker = electionName === "" || start === "" || end === "";


  const handleElectionName = (e) => {
    setElectionName(e.target.value);
  }

  const handleStart= (e) => {
    setStart(e.target.value);
  }

  const handleEnd= (e) => {
    setEnd(e.target.value);
  }

  const resetInput = () => {
    setElectionName("");
    setStart("");
    setEnd("");
  }

  const handleAddElection = () => {
    console.log(electionName);
    console.log(start);
    console.log(end);

    fetch('http://localhost:3001/add-election', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        election_name: electionName,
        start_date_time: start,
        end_date_time: end,
        is_results_open: false
      })
    })
    .then((response) => response.json())
    .then((body) => {
      if(body.success)
      {
        toast(body.success, body.message);
        setKey(key+1);
        resetInput();
        close();
      }
      else
      {
        toast(body.success, body.message);
        resetInput();
      }
    })
  }


  return (
    <div className="add-election-modal">
    <ToastContainer pauseOnHover={false}/>
    <Modal show={show} centered className="modal-container" >
        <Modal.Body className="modal-body">
        <Modal.Title className="modal-title">Add Election</Modal.Title>
        {/* onChange={handleStudNum} value={studentNumber} */}
            <ModalTextInput label={"Election Name"} onChange={handleElectionName} value={electionName}/>
            <ModalDateTimeInput label={"Start Time"} onChange={handleStart} value={start}/>
            <ModalDateTimeInput label={"End Time"} onChange={handleEnd} value={end}/>
 
            <ModalButtons name={"Add"} close={close} onClick={handleAddElection} inputChecker={inputChecker}/>
        </Modal.Body> 
    </Modal>
</div>
  )
}

export default AddElectionModal