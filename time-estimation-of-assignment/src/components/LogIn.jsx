import React, { useState } from 'react'
import "./LogIn.css";
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
export default function LogIn() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password : ""
  })
  const handleLogIn = async() =>{
    try{
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password)
    }catch(err){
      console.log(err);
    }
  }

  onAuthStateChanged(firebaseAuth, (currentUser)=>{
    if(currentUser) navigate("/welcome")
  })
  return (
    <div>
      <h2>Log In</h2>
      <div className='login-form'>
        <input className='login-email' type="email" placeholder='Email Address' name='email' value={formValues.email} onChange={(e)=>setFormValues({...formValues, [e.target.name] : e.target.value})}/>
        <input className='login-password' type="password" placeholder='Password' name='password' value={formValues.password} onChange={(e)=>setFormValues({...formValues, [e.target.name] : e.target.value})}/>
        <button className='login-btn' onClick={handleLogIn}>Log In</button>
      </div>
      If you don't have an account - <Link to="/signup">Sign Up</Link>
    </div>
  )
}
