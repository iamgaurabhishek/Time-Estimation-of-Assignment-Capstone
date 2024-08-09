import {BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from './components/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Questions from './components/Questions';
import Footer from './components/Footer';
import QuestionsCalled from "./components/QuestionsCalled";
import { useState, useEffect } from 'react';
import { firebaseAuth } from "./utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Results from "./components/Results";
function App() {

  return (
    <div className="App">
        {/*1.  Header Component */}
        <Header/>
        <Routes>
          {/* 2. Home Component */}
          <Route path='/' element={<Home/>}/>
          {/* 3. Sign Up Component */}
          <Route path='/signup' element={<SignUp/>} />
          {/* 4. Log In Component */}
          <Route path='/login' element={<LogIn />} />
          {/* 5. Welcome Component */}
          <Route path='/welcome' element={<Welcome/>}/>
          {/* 6. Questions Called Component */}
          <Route path='/questions' element={<QuestionsCalled/>} />
          {/* 7. Results Component*/}
          <Route path='/results/:userId' element={<Results/>} />
        </Routes>
        {/* 8. Footer Component */}
        <Footer/>
    </div>
  );
}

export default App;