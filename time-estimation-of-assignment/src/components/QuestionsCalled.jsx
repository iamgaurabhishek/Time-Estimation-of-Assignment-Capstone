import React, {useState} from 'react';
import questions from "../main-questions-data/MainQuestions";
import Question from './Question_Range/Question';

const QuestionsCalled = () =>{
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));

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
                {answers.every(answer => answer !== null) && <button onClick={() => alert('All questions answered!')}>Submit</button>}
            </div>
        </div>
    )
}

export default QuestionsCalled;