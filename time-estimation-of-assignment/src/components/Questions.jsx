import { signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';
import "./Questions.css";
export default function Questions() {
    const navigate = useNavigate();
    const [completed, setCompleted] = useState("");
    const [check, setCheck] = useState("");
    const [days, setDays] = useState("");
    const [hours, setHours] = useState("");
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
        'design',
        'otherTask',
      ];
        const [selectedSkills, setSelectedSkills] = useState({});
        const [confidenceLevels, setConfidenceLevels] = useState({});
    const handleCheckboxChange = (e)=> {
        const { name, checked } = e.target;
        setSelectedSkills({
            ...selectedSkills,
            [name] : checked,
        });
    };
    const handleConfidenceChange = (e, skill)=>{
        const { value} = e.target;
        setConfidenceLevels({
            ...confidenceLevels,
            [skill] : value,
        });
    };
    const [isFrequently , setIsFrequently] = useState(false);
    const handleCompleted = (e)=>{
        setCompleted(e.target.value);
    }
    const handleSignOut = async () => {
        try {
          await signOut(firebaseAuth);
          navigate("/")
          // Handle successful sign-out (e.g., redirect, update UI)
        } catch (error) {
          console.error('Error signing out:', error);
          // Handle sign-out errors
        }
      };
  return (
    <div>
        <button onClick={handleSignOut}>Sign Out</button>
      <h1>You have to answer these question.</h1>

      <form action="">
        <div>
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
                    3. What specific skills are required for this assignment and how confident are you in those skills? (on a scale of 0 to 1)
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
        </div>
      </form>
      <button>Submit My Answers</button>
    </div>
  )
}


// Meta data using before-- for Question 3:
{/* 3. What specific skills are required for this assignment and how confident are you in those skills? on scale of 0 to 1</div>
                <br /><br />
                <input type="checkbox" name='writing' value="writing" /> Writing
                <input type="checkbox" name='data analysis' value="dataAnalysis"/> Data Analysis
                <input type="checkbox" name='coding' value="coding"/> Coding
                <input type="checkbox" name='research' value="research"/> Research
                <br /><br />
                <input type="checkbox" name='project management' value="projectManagement"/> Project Management
                <input type="checkbox" name='communication' value="communication"/> Communication
                <input type="checkbox" name='design' value="design"/> Design
                <input type="checkbox" name='other task' value="otherTask"/> Other Task
                <br /><br />
                {check === "yes" && (
                    <div>
                        Scale youself?
                        <input type="number" value={scaleValue}/>
                    </div>
                )} */}