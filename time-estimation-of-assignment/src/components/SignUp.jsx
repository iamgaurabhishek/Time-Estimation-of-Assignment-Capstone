import React, { useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import "./Signup.css";
import { firebaseAuth } from '../utils/firebase-config';
import axios from 'axios';
export default function SignUp() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    userName : "",
    email: "",
    password : ""
  })
  const handleSignIn = async() =>{
    try{
      const { email, password } = formValues;
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const { user } = userCredential;

      await axios.post('http://localhost:5000/api/users/register', {
        firebaseUID: user.uid,
        email: user.email,
        username: formValues.userName
      });

      navigate("/welcome");
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
        <input type="text" placeholder='Username' name='userName' value={formValues.userName} onChange={(e)=>setFormValues({...formValues, [e.target.name] : e.target.value})}/>
        <input type="email" placeholder='Email Address' name='email' value={formValues.email} onChange={(e)=>setFormValues({...formValues, [e.target.name] : e.target.value})}/>
        <input type="password" placeholder='Password' name='password' value={formValues.password} onChange={(e)=>setFormValues({...formValues, [e.target.name] : e.target.value})}/>   
        <button className='get-set-go-btn' onClick={handleSignIn}>Get Set Go</button>
      </div>
      If you have already an account - <Link to="/login">Log In</Link>
    </div>
  )
}