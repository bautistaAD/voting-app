import { Modal, Button } from "react-bootstrap"
import ModalButtons from "./modal-btns";
import ModalTextInput from "./modal-text-input";
import SelectInput from "./select-input";
import { useState } from "react";

const AddMemberModal = (prop) => {
    const show = prop.show;
    const close = prop.close;
    const data = ["Candidate", "Non-Candidate"];
    
    const [studentNumber, setStudentNumber] = useState("");
    const [fname, setfname] =useState("");
    const [mname, setmname] = useState("");
    const [lname, setlname] =useState("");
    const [email, setemail] = useState("");
    const password = "temp" + studentNumber;

    


  return (
    <div>
        <Modal show={show} centered className="modal-container" >
            <Modal.Body className="modal-body">
            <Modal.Title className="modal-title">Add Member</Modal.Title>
                <ModalTextInput label={"Student Number"}/>
                <ModalTextInput label={"First Name"}/>
                <ModalTextInput label={"Middle Name"}/>
                <ModalTextInput label={"Last Name"}/>
                <ModalTextInput label={"Email"}/>
                <SelectInput  label={"Status"} data={data} id={"select-status"}/>
                <ModalButtons name={"Add"} close={close}/>
            </Modal.Body> 
        </Modal>
    </div>
  )
}

export default AddMemberModal