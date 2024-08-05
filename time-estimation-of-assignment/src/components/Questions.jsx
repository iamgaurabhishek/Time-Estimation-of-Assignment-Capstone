import questions from '../main-questions-data/MainQuestions';
import { signOut } from 'firebase/auth';
import React, { useState, useEffect } from 'react'
import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Questions.css";
export default function Questions() {
    const navigate = useNavigate();
    const [completed, setCompleted] = useState("");
    const [days, setDays] = useState("");
    const [hours, setHours] = useState("");
    const [selectedSkills, setSelectedSkills] = useState({});
    const [confidenceLevels, setConfidenceLevels] = useState({});
    const [isFrequently, setIsFrequently] = useState(false);
    const [ currentUser, setCurrentUser] = useState(null);
    // the below useStates are not in use right now maybe later on these States might be considered for development purposes.
    const [check, setCheck] = useState("");
    const [scaleValue, setScaleValue] = useState({
        writing : 0,
        dataAnalysis : 0,
        coding : 0,
        research : 0,
        projectManagement : 0,
        communication : 0,
        design : 0,
        otherTask : 0
    })
    const skills = [
        'writing',
        'dataAnalysis',
        'coding',
        'research',
        'projectManagement',
        'communication',
        'graphic design',
        'otherTask',
      ];
      useEffect(()=>{
        // Set current user from Firebase authetication
        const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
            if(user){
                setCurrentUser(user);
            } else {
                navigate('/login');
            }
        });
        return () => unsubscribe();
      }, [navigate]);
      

    // Handling the checkbox changes
    const handleCheckboxChange = (e)=> {
        const { name, checked } = e.target;
        setSelectedSkills({
            ...selectedSkills,
            [name] : checked,
        });
    };

    //Ranging the Confidence level of the user towards the certain subject.
    const handleConfidenceChange = (e, skill)=>{
        const { value } = e.target;
        setConfidenceLevels({
            ...confidenceLevels,
            [skill] : value,
        });
    };
    
    const handleCompleted = (e)=>{
        setCompleted(e.target.value);
    }

    const calculateEstimatedTime = (answers) => {
        // Implement your time estimation logic here
        // For now, returning a dummy estimated time
        return{
            days: days ? parseInt(days) : 0,
            hours: hours? parseInt(hours) : 0
        };
    };

    const handleSubmit = async () => {
        const answers = {
            completed,
            days,
            hours,
            selectedSkills,
            confidenceLevels,
            isFrequently,
        };
        const estimatedTime = calculateEstimatedTime(answers);
        try{
            await axios.post('http://localhost:5000/api/assignments/submit', {
                userId : currentUser.uid,
                answers,
                estimatedTime,
            });
            navigate('/results');
        }
        catch(err){
            console.error('Error submitting answers:', err);
        }
    };
    const handleSignOut = async () => {
        try {
          await signOut(firebaseAuth);
          navigate("/")
          // Handle successfull sign-out (e.g., redirect, update UI)
        } catch (error) {
          console.error('Error signing out:', error);
          // Handle sign-out errors
        }
      };
      const renderQuestion = (question) => {
        switch(questions.id){
            case 1:
                return (
                    <div key={question.id}>
                        <div>{question.question}</div>
                        { question.options.map((option) => (
                            <label key={option.id}>
                                <input type='radio' name={`assignmentRead`} value={option.text} /> {option.text}
                            </label>
                        ))};
                    </div>
                );
            case 2:
                return (
                    <div key={question.id}>
                        <div>{question.question}</div>
                        { question.options.map((option) => (
                            <label key={option.id}>
                                <input type="radio" name={`completed`} value={option.text.toLowerCase()} checked={completed === option.text.toLowerCase()} onChange={handleCompleted}/> {option.text}
                            </label>
                        ))}
                        {completed === 'yes' && (
                            <div>
                                <label>
                                    a. How many days?
                                    <input type='number' value={days} onChange={e => setDays(e.target.value)}/>
                                </label>
                                <label>
                                    b. How many hours?
                                    <input type='number' value={hours} onChange={e => setHours(e.target.value)}/>
                                </label>
                            </div>
                        )}
                    </div>
                )
            case 3:
                return(
                    <div key={question.id}>
                        <div>{question.question}</div>
                        {skills.map((skill) => (
                            <div key={skill}>
                                <input type="checkbox" name={skill} value={skill} onChange={handleCheckboxChange}/>
                                {' '}
                                {skill.charAt(0).toUpperCase() + skill.slice(1)}
                                {selectedSkills[skill] && (
                                    <div>
                                        <label>
                                            Scale your confidence levels (on a scale of 0 to 10):
                                            <input type='range' min="0" max="10" value={confidenceLevels[skill] || ''} onchange={e => handleConfidenceChange(e, skill)}/>
                                            <span>{confidenceLevels[skill] || "0"}</span>
                                        </label>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )
        }
      }
  return (
    <div>
        <button onClick={handleSignOut}>Sign Out</button>
      <h1>You have to answer these question.</h1>

      <form>
            <label>
                <div className='question'>1. Did you read your Assignment completely? Because it is really vital to know your Assignment!</div>
                <div>
                    <label>
                        <input type="radio" name='assignmentRead' value="Yes"/> Yes
                    </label>
                    <label>
                        <input type="radio" name='assignmentRead' value="No"/> No
                    </label>
                </div>
            </label>
            <label>
                <div className='question'>2. Have you completed similar kind of or any assignment in the past? If so, how long does it took?</div>
                <br/><br/>
                <label>
                    <input type="radio" name='completed' value='yes' checked={completed === "yes"} onChange={handleCompleted}/> Yes
                </label>
                <label>
                    <input type="radio" name='completed' value='no' checked={completed === "no"} onChange={handleCompleted}/> No
                </label>
                <br/><br/>
                {completed === 'yes' && (
                    <div>
                        <label>
                            a. How many days?
                            <input type="number" value={days} onChange={e=> setDays(e.target.value)}/>
                        </label>
                        <br/><br/>
                        <label>
                            b. How many hours each day?
                            <input type="number" value={hours} onChange={e=> setHours(e.target.value)}/>
                        </label>
                    </div>
                )}
            </label>
            <label>
                <div className='question'>
                    3. What specific skills are required for this assignment and how confident are you in those skills? (on a scale of 0 to 10)
                </div>
                <br></br>
                {skills.map((skill)=> (
                    <div key={skill}>
                        <input type="checkbox" name={skill} value={skill} onChange={handleCheckboxChange}/> 
                    {' '}
                    {skill.charAt(0).toUpperCase() + skill.slice(1)}
                    {selectedSkills[skill] && (
                        <div>
                            <label>
                                Scale yourself (0 to 10):
                                <input type="range" min="0" max="10" step="1" value={confidenceLevels[skill] || ''} onChange={(e)=> handleConfidenceChange(e, skill)} />
                                <span>{confidenceLevels[skill] || '0'}</span>
                            </label>
                        </div>
                    )}
                    </div>
                    
                ))}
            </label>
            <label>
                <div className='question'>4. Are there any particular challenges or difficult sections in the assignment that your foresee?</div>
                <br/><br/>
                <label>
                    <input type="radio" name='foreseen'/> Yes
                </label>
                <label>
                    <input type="radio" name='foreseen'/> No
                </label>
                <br/><br/>
            </label>
            <label>
                <div className='question'>5. What is your strategy for handling unexpected delays or issues?</div>
                <br /><br />
                <input type="checkbox" /> a. Communicate with your professor why is it delayed?
                <br /><br />
                <input type="checkbox" /> b. Will take some help from your classmates/ professors?
                <br /><br />
                <input type="checkbox" /> c. Create a timeline for yourself and keep track of each day doings to decrease pressure during.
                <br /><br />
                <input type="checkbox" /> d. Don't have a strategy just start doing it.
                <br /><br />
                <input type="checkbox" /> e. Acknowleding delay formally first?
                <br /><br />
                <input type="checkbox" /> f. Leave margin for unexpected delays.
            </label>
            <br /><br />
            <label>
                <div className='question'>6. What is your style of working?</div>
                <br /><br />
                <input name='frequency' type="radio" onChange={()=> setIsFrequently(false)}/> LONG UNINTERRUPTED SESSIONS
                <br /><br />
                <input name='frequency' type="radio" onChange={()=> setIsFrequently(true)}/> IN SHORTER, FREQUENT INTEVALS
                <br /><br />
               {isFrequently &&
               <div>
                    How frequently?
                    <br /><br />
                    <input type="radio" /> 1. Every 45 mins
                    <br /><br />
                    <input type="radio" /> 2. Every 1 hour
                    <br /><br />
                    <input type="radio" /> 3. Every 2 hours
                    <br /><br />
                </div>
                }
            </label>
        <button type='button' onClick={handleSubmit}>Submit My Answers</button>
      </form>
      
    </div>
  )
}