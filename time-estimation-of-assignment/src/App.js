// import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Questions from './components/Questions';
import Footer from './components/Footer';
import QuestionsCalled from "./components/QuestionsCalled";
function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/welcome' element={<Welcome/>}/>
        <Route path='/questions' element={<QuestionsCalled/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;