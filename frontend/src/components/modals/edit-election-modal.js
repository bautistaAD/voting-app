import { Modal } from "react-bootstrap";
import ModalButtons from "../buttons/modal-btns";
import ModalTextInput from "../inputs/modal-text-input";
import ModalDateTimeInput from "../inputs/datetime-input";
import { useState, useEffect } from "react";
import {ToastContainer, toast} from 'react-toastify';



const EditElectionModal = (prop) => {
    const show = prop.show;
    const close = prop.close;
    const details = prop.details;

    const [name, setName] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();

    const handleName = (e) => setName(e.target.value.toUpperCase())
    const handleStart = (e) => setStart(e.target.value)
    const handleEnd = (e) => setEnd(e.target.value)
    const handleClose = (e) => {
      close()
      setName(details.election_name.toUpperCase());
      setStart(displayDateConverter(details.start_date_time));
      setEnd(displayDateConverter(details.end_date_time));
    }
    
    const displayDateConverter = (original) => { //convert the date and time string "2023-07-19T06:12:00.000Z" to "2023-07-19T06:12"
        const originalDateTimeString = original;

        // Convert the original date string to a Date object
        const originalDate = new Date(originalDateTimeString);
    
        // Get the individual components (year, month, day, hour, minute) from the Date object
        const year = originalDate.getFullYear();
        const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
        const day = String(originalDate.getDate()).padStart(2, '0');
        const hour = String(originalDate.getHours()).padStart(2, '0');
        const minute = String(originalDate.getMinutes()).padStart(2, '0');
    
        // Construct the new date and time string
        const newDateTimeString = `${year}-${month}-${day}T${hour}:${minute}`;

        return newDateTimeString
    }

    const originalDateConverter = (date) => {

      // Convert the original date string to a Date object
      const originalDate = new Date(date);

      // Add seconds and milliseconds to the Date object
      originalDate.setSeconds(0);
      originalDate.setMilliseconds(0);

      // Convert the Date object to the ISO 8601 format (with timezone information)
      const newDateTimeString = originalDate.toISOString();

      return newDateTimeString;
    }

    useEffect(()=>{
      
      if((name === undefined || start === undefined || end === undefined ) &&  details.election_name !== undefined)
      {
        setName(details.election_name.toUpperCase());
        setStart(displayDateConverter(details.start_date_time));
        setEnd(displayDateConverter(details.end_date_time));
      }
    }, [prop.details])

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

    const handleSave = () => {
        fetch('http://localhost:3001/edit-election', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                election_id: details._id,
                election_name: name,
                start_date_time: originalDateConverter(start),
                end_date_time: originalDateConverter(end)
                })
        })
        .then((response) => response.json())
        .then((body) => {
            showToast(body.success, body.message);
        })
        
 }

  return (
    <div className="edit-election-modal">
        <ToastContainer pauseOnHover={false}/>
        <Modal show={show} centered className="modal-container" >
            <Modal.Body className="modal-body">
                <Modal.Title className="modal-title">Edit Election</Modal.Title>
                <ModalTextInput label={"Election Name"} onChange={handleName} value={name}/>
                <ModalDateTimeInput label={"Start Time"} value={start} onChange={handleStart}/>
                <ModalDateTimeInput label={"End Time"} value={end} onChange={handleEnd}/>
                {/* onClick={handleAdd}  inputChecker={inputChecker} */}
                <ModalButtons name={"Save"} close={handleClose} onClick={()=> {handleSave()}}/>

            </Modal.Body> 
        </Modal>
    </div>
  )
}

export default EditElectionModal