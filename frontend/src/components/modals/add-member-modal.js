import { Modal } from "react-bootstrap"
import ModalButtons from "../buttons/modal-btns";
import ModalTextInput from "../inputs/modal-text-input";
import SelectInput from "../inputs/select-input";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';

const AddMemberModal = (prop) => {
    const keyValue = prop.keyValue;
    const setKey = prop.setKey;
    const show = prop.show;
    const close = prop.close;
    const data = ["Candidate", "Non-Candidate"];
    
    const [studentNumber, setStudentNumber] = useState("");
    const [fname, setFname] =useState("");
    const [mname, setMname] = useState("");
    const [lname, setLname] =useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("");
    const password = "temp" + studentNumber;

    const inputChecker = studentNumber === "" || fname === "" || lname === "" || email === "" || userType === "";

    const handleStudNum = (e) => setStudentNumber(e.target.value);
    const handleFname = (e) => setFname(e.target.value);
    const handleMname = (e) => setMname(e.target.value);
    const handleLname = (e) => setLname(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleUserType = (e) => setUserType(e.target.value);

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

    const resetInput = () => {
        setStudentNumber("");
        setFname("");
        setLname("");
        setMname("");
        setEmail("");
        setUserType("");
    }

    const handleAdd = () => {
      fetch('http://localhost:3001/add-member',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          student_number: studentNumber,
          first_name: fname,
          middle_name: mname,
          last_name: lname,
          email: email.toLowerCase(),
          user_type: userType,
          password: password
        })
      })
      .then((response) => response.json())
      .then((body) => {
        if(body.success)
        {
          showToast(true, body.message)
          setKey(keyValue+1)
          close();
        }
        else
        {
          showToast(false, body.message);
          resetInput();
        }
      })
    }

  return (
    <div className="add-member-modal">
        {/* <ToastContainer/> */}
        <Modal show={show} centered className="modal-container" >
            <Modal.Body className="modal-body">
            <Modal.Title className="modal-title">Add Member</Modal.Title>
                <ModalTextInput label={"Student Number"} onChange={handleStudNum} value={studentNumber}/>
                <ModalTextInput label={"First Name"} onChange={handleFname} value={fname}/>
                <ModalTextInput label={"Middle Name"} onChange={handleMname} value={mname}/>
                <ModalTextInput label={"Last Name"} onChange={handleLname} value={lname}/>
                <ModalTextInput label={"Email"} onChange={handleEmail} value={email}/>
                <SelectInput  label={"Status"} data={data} id={"select-status"} onChange={handleUserType} value={userType}/>
                <ModalButtons name={"Add"} close={close} onClick={handleAdd} inputChecker={inputChecker}/>
            </Modal.Body> 
        </Modal>
    </div>
  )
}

export default AddMemberModal