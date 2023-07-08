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

    const resetInput = () => 
    {
        setEmail("");
        setPassword("");
    }
    
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
                setUserType(body.userType)
                setIsLoggedIn(true);
                const cookies = new Cookies();
                cookies.set("authToken", body.token, {
                    path: "localhost:3001/",
                    maxAge: 60*60,
                    sameSite: false,
                });
                localStorage.setItem("username", body.username);
                localStorage.setItem("email", body.email);
            }
            else
            {
                showToast();
                resetInput()
            }

        })
        .catch((err) => console.log(err));
    }

    return(
        <>
            <ToastContainer pauseOnHover={false}/>
            <div className='container-md shadow mb-5 bg-body rounded'>
                <img src={png} className="rounded mx-auto d-block" alt="none"></img>

                <form  className="login-body">
                    <div className="form-group">
                        <input type="email" className="form-control" id="input-email" onChange={handleEmail} placeholder=' ' required value={email}/>
                        <label className= "form-label" htmlFor="input-email">Email</label>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="input-password" autoComplete="off" onChange={handlePassword} placeholder=' ' required value={password}/>
                        <label className= "form-label" htmlFor="input-password">Password</label>
                    </div>
                    <Button className="btn btn-dark" onClick={()=> {handleLogin()}} >Login</Button>
                    <div className="d-flex">
                        <p>Forgot Password?  <span>Reset here.</span></p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;