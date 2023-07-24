import { Modal } from "react-bootstrap";
import ModalButtons from "../buttons/modal-btns";

const AddPositionModal = (prop) => {
    const show = prop.show;
    const close = prop.close;

  return (
    <div className="add-member-modal">
        {/* <ToastContainer/> */}
        <Modal show={show} centered className="modal-container" >
            <Modal.Body className="modal-body">
            <Modal.Title className="modal-title">Add Position</Modal.Title>
                {/* <ModalTextInput label={"Student Number"} onChange={handleStudNum} value={studentNumber}/>
                <ModalTextInput label={"First Name"} onChange={handleFname} value={fname}/>
                <ModalTextInput label={"Middle Name"} onChange={handleMname} value={mname}/>
                <ModalTextInput label={"Last Name"} onChange={handleLname} value={lname}/>
                <ModalTextInput label={"Email"} onChange={handleEmail} value={email}/>
                <SelectInput  label={"Status"} data={data} id={"select-status"} onChange={handleUserType} value={userType}/> */}
                <ModalButtons name={"Add"} close={close} />
                {/* onClick={handleAdd} inputChecker={inputChecker} */}
            </Modal.Body> 
        </Modal>
    </div>
  )
}

export default AddPositionModal