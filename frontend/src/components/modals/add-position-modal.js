import { Modal } from "react-bootstrap";
import ModalButtons from "../buttons/modal-btns";
import ModalTextInput from "../inputs/modal-text-input";
import { useState } from "react";
import {ToastContainer, toast} from 'react-toastify';

const AddPositionModal = (prop) => {
    const elecID = prop.elecID;
    const show = prop.show;
    const close = prop.close;

    const [position, setPosition] = useState("");
    const inputChecker = position === "";
    
    const handlePos = (e) => {
        setPosition(e.target.value);
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

    const handleAdd = () => {
      fetch('http://localhost:3001/add-position', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        position_name: position,
        election_id: elecID
      })
    })
    .then((response) => response.json())
    .then((body) => {
      showToast(body.success, body.message);
    })
  }
    
  return (
    <div className="add-member-modal">
        <ToastContainer pauseOnHover={false}/>
        <Modal show={show} centered className="modal-container" >
            <Modal.Body className="modal-body">
            <Modal.Title className="modal-title">Add Position</Modal.Title>
              <ModalTextInput label={"Position Title"} onChange={handlePos} value={position}/>
                <ModalButtons name={"Add"} close={close} onClick={handleAdd}  inputChecker={inputChecker}/>
 
            </Modal.Body> 
        </Modal>
    </div>
  )
}

export default AddPositionModal