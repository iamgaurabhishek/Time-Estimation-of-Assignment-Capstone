import React, {useEffect, useState} from 'react';
import questions from "../main-questions-data/MainQuestions";
import Question from './Question_Range/Question';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';

const QuestionsCalled = () =>{
    // 1. Navigating tool
    const navigate = useNavigate();
    // 2. State for current question
    const [currentQuestion, setCurrentQuestion] = useState(0);
    // 3. State to sort the user's answers
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));

    // 5. State for setting up the userId
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user)=>{
            if(user){
                setUserId(user.uid); // Set the user ID from Firebase
            }
        });
        return () => unsubscribe(); // Clean up listener on unmount
    }, []);

    const handleAnswer = (index, answer) =>{
        const newAnswers = [...answers];
        newAnswers[index] = answer;
        setAnswers(newAnswers);
    };

    const nextQuestion = ()=>{
        if(currentQuestion < questions.length -1 ){
            setCurrentQuestion(currentQuestion + 1);
        }
    };
    const previousQuestion = ()=>{
        if(currentQuestion > 0){
            setCurrentQuestion(currentQuestion - 1);
        }
    };
    
  
    // 4. Creating a function to submit responses to sends the collected answer to the backend API when the user completes the questionnaire.
    const submitResponses = async () => {
        try{
            const response = await axios.post("http://localhost:5000/api/assignments/submit", {
                userId: userId,
                answers: answers,
                estimatedTime: {days: 0, hours:0 } //Replace with your calculated estimated time
            });
            navigate('/results'); // Navigate to the results page after submission
        }catch(err){
            console.error("Error submitting responses: ", err);
            alert('There was a problem submitting your responses. Please try again.')
        }
    }

    const isAnswered = answers[currentQuestion] !== null;
    return(
        <div>
            <Question
                question={questions[currentQuestion]}
                index={currentQuestion}
                answer={answers[currentQuestion]}
                onAnswer={handleAnswer}
            />
            <div>
                {currentQuestion > 0 && <button onClick={previousQuestion}>Previous</button>}
                {isAnswered && currentQuestion < questions.length - 1 && <button onClick={nextQuestion}>Next</button>}
            </div>
            <div>
                {answers.every(answer => answer !== null) && <button onClick={() => navigate("/results")}>Submit</button>}
            </div>
        </div>
    )
}

export default QuestionsCalled;