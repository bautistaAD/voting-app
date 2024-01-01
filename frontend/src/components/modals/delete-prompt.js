import { Modal } from "react-bootstrap"
import ModalButtons from "../buttons/modal-btns";
import ModalTextInput from "../inputs/modal-text-input";
import SelectInput from "../inputs/select-input";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';

const DeletePrompt = (prop) => {
    const show = prop.show;
    const close = prop.close;
    const setDelete = prop.setDel
    const inputChecker = false;



  return (
    <div className="edit-member-modal">
    {/* <ToastContainer/> */}
    <Modal show={show} centered className="modal-container" >
        <Modal.Body className="modal-body">
        <Modal.Title className="modal-title">Are you sure you want to delete?</Modal.Title>
            <ModalButtons name={"Yes"} close={close} onClick={setDelete} inputChecker={inputChecker}/>
        </Modal.Body> 
    </Modal>
</div>
  )
}

export default DeletePrompt