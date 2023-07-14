import { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import AdminSidebarData from "../components/admin-sidebar-data";
import "../assets/styles/admin-account.css";
import AccountInput from "../components/inputs/account-input";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';

function AdminAccount() {
  const email = localStorage.getItem("email");
  // const displayName = localStorage.getItem("username");

  const [sidebar, setSidebar] = useState("inactive");
  const [main, setMain] = useState("main-inactive");
  const [currentPass, setCurrent] = useState("");
  const [newPass, setNew] = useState("");
  const [retypePass, setRetype] = useState("");

  const isButtonDisabled = currentPass === "" || newPass === "" || retypePass === "";
 
  //input handlers
  const handleCurrPass = (e) => {
    setCurrent(e.target.value);
  };

  const handleNewPass = (e) => {
    setNew(e.target.value);
  };

  const handleRetype = (e) => {
    setRetype(e.target.value);
  };

  //reset input after button is clicked
  const resetInput = () => {
    setCurrent("");
    setNew("");
    setRetype("");
  }

  //show prompt using toast
  const showToast = (success, message) => {
    if(success)
    {
      toast.success(message, {
        className: 'toast-nessage',
        theme: "colored"
      })

      resetInput();
    }
    else
    {
      toast.error(message, {
        className: 'toast-nessage',
        theme: "colored"
      })

      resetInput();
    }
  }

  //event listener when button is clicked
  const handleSave = () => {
    fetch('http://localhost:3001/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        password: currentPass,
        newPassword: newPass,
        retypePass: retypePass
      })
    })
    .then((response) => response.json())
    .then((body) => {
      console.log(body)
      if(body.success)
      {
        showToast(true, body.message);
        
      }
      else
      {
        showToast(false, body.message);
      }
    })
  }

  
  return (
    <div>
      <Navbar setSidebar={setSidebar} sidebar={sidebar} main={setMain} />
      <div className="content-account">
        <ToastContainer pauseOnHover={false}/>
        <Sidebar sidebar={sidebar} sideData={AdminSidebarData}></Sidebar>
        <div className={main} id="admin-account-main" style={{ marginTop: "60px" }}>
          <div className="account-page-base shadow mb-5 bg-body rounded">
            <div className="account-page-title">Change Password</div>
            <form className="account-page-body">
              <AccountInput title={"Current Password"} placeholder={"Enter Current Password"} handleChange={handleCurrPass} value={currentPass}/>
              <AccountInput title={"New Password"} placeholder={"Enter New Password"} handleChange={handleNewPass} value={newPass} />
              <AccountInput title={"Re-Type Password"} placeholder={"Re-Type New Password"} handleChange={handleRetype}  value={retypePass}/>
            </form>
            {/* if at least one input is empty then the button is disabled */}
            {isButtonDisabled ? (
              <Button className="account-btn btn-dark btn-m float-right" style={{ width: "80px", float: "right", marginRight: "100px", marginTop: "15px" }} disabled>
                Save
              </Button>
            ) : (
              <Button className="account-btn btn-dark btn-m float-right" style={{ width: "80px", float: "right", marginRight: "100px", marginTop: "15px" }} onClick={()=> {handleSave()}}>
                Save
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAccount;
