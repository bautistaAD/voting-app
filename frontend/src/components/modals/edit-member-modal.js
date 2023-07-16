import { Modal } from "react-bootstrap"
import ModalButtons from "../buttons/modal-btns";
import ModalTextInput from "../inputs/modal-text-input";
import SelectInput from "../inputs/select-input";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';

const EditMemberModal = (prop) => {
    const show = prop.show;
    const close = prop.close;
    const data = ["Candidate", "Non-Candidate"];

    const [fname, setFname] =useState("");
    const [mname, setMname] = useState("");
    const [lname, setLname] =useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("");

    const inputChecker = fname === "" || lname === "" || email === "" || userType === "";

    const handleFname = (e) => setFname(e.target.value);
    const handleMname = (e) => setMname(e.target.value);
    const handleLname = (e) => setLname(e.target.value);
    const handleUserType = (e) => setUserType(e.target.value);

    const handleEdit = () => {
        
    }


  return (
    <div className="edit-member-modal">
    <ToastContainer/>
    <Modal show={show} centered className="modal-container" >
        <Modal.Body className="modal-body">
        <Modal.Title className="modal-title">Edit Member</Modal.Title>
            <ModalTextInput label={"First Name"} onChange={handleFname} value={fname}/>
            <ModalTextInput label={"Middle Name"} onChange={handleMname} value={mname}/>
            <ModalTextInput label={"Last Name"} onChange={handleLname} value={lname}/>
            <SelectInput  label={"Status"} data={data} id={"select-status"} onChange={handleUserType} value={userType}/>
            <ModalButtons name={"Save"} close={close} onClick={handleEdit} inputChecker={inputChecker}/>
        </Modal.Body> 
    </Modal>
</div>
  )
}

export default EditMemberModal