import { Button } from "react-bootstrap"
import "../../assets/styles/modal.css"

const ModalButtons = (prop) => {
    const btnName = prop.name;
    const submit = prop.onClick;
    const close = prop.close;
    const checker = prop.inputChecker
    
  return (
    <div className="modal-btns">
        <Button className="modal-btn" id="modal-cancel-btn" onClick={close}>Cancel</Button>
        {checker ? (<Button className="modal-btn" id="modal-submit-btn" disabled>{btnName}</Button>)
        : (<Button className="modal-btn" id="modal-submit-btn" onClick={submit}>{btnName}</Button>)}
    </div>
  )
}

export default ModalButtons