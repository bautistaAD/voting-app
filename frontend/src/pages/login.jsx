import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import png from "../assets/images/AXIS_logo.png";
import '../assets/styles/login.css'

function Login(){
    // states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userType, setUserType] = useState("");
    const navigate = useNavigate();

    const navigateToDashboard = () => {
        if (userType === "Admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/member-dashboard");
        }
      };

    //redirect when login is successful
    useEffect(() => {
        if(isLoggedIn)
        {
            navigateToDashboard();
        }
    }, [isLoggedIn, navigate]);

    //functions
    const handleEmail = (e) =>{
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const showToast = () => toast.error("Invalid Credentials!",
    {
        className: 'toast-message',
        theme: "colored"
    });
    
    function handleLogin() {

        fetch('http://localhost:3001/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.toLowerCase(),
                password: password
            })
        })
        .then((response) => response.json())
        .then((body) => {

            if(body.success)
            {   
                console.log("1")
                setUserType(body.userType)
                setIsLoggedIn(true);
                const cookies = new Cookies();
                cookies.set("authToken", body.token, {
                    path: "localhost:3001/",
                    maxAge: 60*60,
                    sameSite: false,
                });
                localStorage.setItem("username", body.username);
            }
            else
            {
                console.log("2")
                showToast();
            }

        })
        .catch((err) => console.log(err));
    }

    return(
        <>
            <ToastContainer pauseOnHover={false}/>
            <div className='container-md shadow mb-5 bg-body rounded'>
                <img src={png} class="rounded mx-auto d-block" alt="none"></img>

                <div className="login-body">
                    <div class="form-group">
                        <input type="email" class="form-control" id="input-email" onChange={handleEmail} placeholder=' ' autocomplete='off' required/>
                        <label className= "form-label" for="input-email">Email</label>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="input-password" onChange={handlePassword} placeholder=' ' autocomplete='off' required/>
                        <label className= "form-label" for="input-password">Password</label>
                    </div>
                    <Button className="btn btn-dark" onClick={()=> {handleLogin()}} >Login</Button>
                    <div className="d-flex">
                        <p>Forgot Password?  <span>Reset here.</span></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;