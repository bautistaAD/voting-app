import { Modal, Button } from "react-bootstrap"
import ModalButtons from "./modal-btns";
import { useState } from "react";

const ImportCSVModal = (prop) => {
    const show = prop.show;
    const close = prop.close;

  return (
    <div className="add-member-modal">
        <Modal show={show} centered className="modal-container" >
            <Modal.Body className="modal-body">
                <Modal.Title className="modal-title">Import CSV File</Modal.Title>
                <div class="custom-file">
                    <input  style={{marginBottom:"10px"}} type="file" className="form-control" accept=".csv"/>
                </div>
                <ModalButtons name={"Import"} close={close}/>
            </Modal.Body> 
        </Modal>
    </div>
  )
}

export default ImportCSVModal