import React from 'react';
import logo from "../assets/FOCUS_FUTURE.png";
import "./Header.css";
import { Link, useNavigate } from 'react-router-dom';
export default function Header(props) {
    const navigate = useNavigate();
    
  return (
    <div className='header'>
      <img className='logo' src={logo} alt="logo" />

      {/* <button className='btn' onClick={()=> navigate('/signup')}>      */}
      <Link to="/signup" className="btn">
        Sign Up
      </Link>
        {/* navigate(props.login ? "/login" : "/signup")  */}
        {/* {props.login ? "Log In" : "Sign Up"} */}
      {/* </button> */}
    </div>
    // <Link to="/signup">Sign Up</Link>
  )
}
