import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from 'axios';
import { useState } from "react";

const Login = () => {
    const [fid,setFid] = useState();
    const [passwd,setPasswd] = useState();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('https://agriverse-3.onrender.com/login',{fid,passwd})
        .then((res) =>{
            
            if(res.data === "yes"){
                localStorage.setItem("status","true");
                localStorage.setItem("user",fid);
                navigate('/dashboard');
            }
            else{
                return alert("Wrong Credentials!");
            }
        })
        .catch((err) => console.log(err));
    }

    return (
        <>
            <Navbar />
            <div className="container" id="container">
                <div className="login form-container sign-up-container">
                    <form>
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="login form-container sign-in-container">
                    <form>
                        <h1>Log in</h1>
                        <div className="social-container">
                            
                        </div>
                        <span>FID is your farmer ID!</span>
                        <input type="number" onChange={(e) => setFid(e.target.value)} placeholder="FID" />
                        <input type="password" onChange={(e) => setPasswd(e.target.value)} placeholder="Password" /><br></br>
                        {/* <a href="#">Forgot your password?</a> */}
                        <button onClick={handleLogin}>Log In</button>
                    </form>
                </div>
                <div className="login overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button class="ghost" id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Welcome, Farmer!</h1>
                            <p>Bring your farm to the virtual world!</p>
                            {/* <button className="ghost" id="signUp">Sign Up</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;