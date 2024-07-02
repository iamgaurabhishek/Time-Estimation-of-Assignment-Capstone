import React from 'react'
import "./Home.css";
import Lottie from "lottie-react";
import { Link } from 'react-router-dom';
import animationData2 from "../assets/Animation - 1716373284068.json";
import background from "../assets/FOCUS_FUTURE.png";
export default function Home() {
  return (
    <div className='home'>
      <img className='bg' src={background} alt='logo'/>
      <h2>Estimate your time for Assignments</h2>
      <p>Be Focused, stay Focus</p>
      <Lottie animationData={animationData2} className='animation'/>
      <Link to="/signup">Sign Up</Link>
    </div>
  )
}