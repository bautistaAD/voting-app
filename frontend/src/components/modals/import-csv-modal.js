import { Modal} from "react-bootstrap"
import ModalButtons from "../buttons/modal-btns";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';

const ImportCSVModal = (prop) => {
    const show = prop.show;
    const close = prop.close;


    const [file, setFile] = useState(null)
    const [CSVData, setCSVData] = useState();
    var commonConfig = {delimiter: ","};
    const inputChecker = file === null;
    
    const importFile = () => {
        Papa.parse(file,
            {
                ...commonConfig,
                header: true,
                complete: (result) => {
                    setCSVData(result.data);
                }
            }
        );
    }

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    useEffect(() => {
        if(file!=null){
            importFile();
        }
    }, [file])

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

    const handleImport = () => {
        fetch('http://localhost:3001/import-csv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: CSVData
            })
        })
        .then((response) => response.json())
        .then((body) => {
            showToast(true, body.message);
            close();
        })
    }


  return (
    <div className="add-member-modal">
        <ToastContainer pauseOnHover={false}/>
        <Modal show={show} centered className="modal-container" >
            <Modal.Body className="modal-body">
                <Modal.Title className="modal-title">Import CSV File</Modal.Title>
                <div class="custom-file">
                    <input  style={{marginBottom:"10px"}} type="file" className="form-control" accept=".csv" onChange={handleFile}/>
                </div>
                <ModalButtons name={"Import"} close={close} onClick={handleImport} inputChecker={inputChecker}/>
            </Modal.Body> 
        </Modal>
    </div>
  )
}

export default ImportCSVModal