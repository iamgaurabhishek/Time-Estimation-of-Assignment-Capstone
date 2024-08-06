// import './App.css';
// 1. when we are using Firebase we don't need to manage our authentication tokens like JWT on the backend. The backend's role will be now is to handle data storage, sich as storing user responses on questions, but it won't need to handle user authentication or authorization directly.
// 2. Now I have to make sure that my backend is reveiving and storing user responses and perhaps associated them with the user's UID(provided by Firebase) if necessary.
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
function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // useEffect(()=> {
  //   const unsubsribe = onAuthStateChanged( firebaseAuth, (currentUser) =>{
  //     setUser(currentUser);
  //     if(currentUser){
  //       navigate("/");
  //     }
  //   });

  //   return() => unsubsribe();
  // }, [navigate]);

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
        </Routes>
        {/* 7. Footer Component */}
        <Footer/>
    </div>
  );
}

export default App;

// export default function AppWithRouter(){
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// };