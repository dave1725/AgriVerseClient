import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ type }) => {
    const navigate = useNavigate();
    const status = localStorage.getItem("status");

    const logout = () => {
        if(window.confirm("Do you really want to logout?")){
            localStorage.setItem("status","false");
            navigate('/');
        }     
    }

    return (
        <>
            {type ? (
                <div className='navbar'>
                <div className='nav-logo'>
                    <h4>AGRIVERSE</h4>
                </div>
                <div className='navbar-items'>
                    <NavLink id="navigator" title="Go to Welcome Page" to="/" >Home</NavLink>
                    <NavLink id="navigator" title="Get to know us!" to="/about">About Us</NavLink>
                    <NavLink id="navigator" title="Get to know us!" to="/market">Market</NavLink>
                    {status === "true" ? (
                        <button id="navigator-login" title="Logout of AgriVerse" onClick={logout}>Logout</button>
                    ): (
                        <button id="navigator-login" title="Login to AgriVerse" onClick={() => navigate('/login')}>Login</button>
                    )}
                    {/* <button id="navigator-login" title="Login to ERP portal" onClick={() => navigate('/login')}>Login</button> */}
                </div>
            </div>

            ) : (
                <div className='navbar'>
                <div className='nav-logo'>
                    <h4>AGRIVERSE</h4>
                </div>
                <div className='navbar-items'>
                    <NavLink id="navigator" title="Go to Welcome Page" to="/" >Home</NavLink>
                    <NavLink id="navigator" title="Get to know us!" to="/about">About Us</NavLink>
                    <NavLink id="navigator" title="Get to know us!" to="/market">Market</NavLink>   
                    {status === "true" ? (
                        <button id="navigator-login" title="Logout of AgriVerse" onClick={logout}>Logout</button>
                    ): (
                        <button id="navigator-login" title="Login to AgriVerse" onClick={() => navigate('/login')}>Login</button>
                    )}
                </div>
            </div>
            )}
        </>
    );
}

export default Navbar;