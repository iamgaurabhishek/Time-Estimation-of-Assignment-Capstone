import React, { useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import "./Signup.css";
import { firebaseAuth } from '../utils/firebase-config';
export default function SignUp() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    fName : "",
    lName : "",
    email: "",
    password : ""
  })
  const handleSignIn = async() =>{
    try{
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password)
    }catch(err){
      console.log(err);
    }
  }

  onAuthStateChanged(firebaseAuth, (currentUser)=>{
    if(currentUser) navigate("/welcome")
  })
  return (
    <div>
      <h2>Sign Up</h2>
      <div className='signup-form'>
        <input type="text" placeholder='First Name' name='fName' value={formValues.fName} onChange={(e)=>setFormValues({...formValues, [e.target.name] : e.target.value})}/>
        <input type="text" placeholder='Last Name' name='lName' value={formValues.lName} onChange={(e)=>setFormValues({...formValues, [e.target.name] : e.target.value})}/>
        <input type="email" placeholder='Email Address' name='email' value={formValues.email} onChange={(e)=>setFormValues({...formValues, [e.target.name] : e.target.value})}/>
        <input type="password" placeholder='Password' name='password' value={formValues.password} onChange={(e)=>setFormValues({...formValues, [e.target.name] : e.target.value})}/>   
        <button className='get-set-go-btn' onClick={handleSignIn}>Get Set Go</button>
      </div>
      If you have already an account - <Link to="/login">Log In</Link>
    </div>
  )
}