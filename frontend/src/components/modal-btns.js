import { Button } from "react-bootstrap"
import "../assets/styles/modal.css"

const ModalButtons = (prop) => {
    const btnName = prop.name;
    const submit = prop.onClick;
    const close = prop.close;
    
  return (
    <div className="modal-btns">
        <Button className="modal-btn" id="modal-cancel-btn" onClick={close}>Cancel</Button>
        <Button className="modal-btn" id="modal-submit-btn">{btnName}</Button>
    </div>
  )
}

export default ModalButtons