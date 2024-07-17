import React from 'react';
import Range from './Range';

const Question = ({ question, index, answer, onAnswer }) => {
    const handleChange = (option) => {
        onAnswer(index, option);
    };

    return (
        <div>
            <h2>{question.question}</h2>
            {question.id === 3 ? (
                question.options.map((option) => (
                    <div key={option.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={answer && answer.includes(option.id)}
                                onChange={() => handleChange(option.id)}
                            />
                            {option.text}
                        </label>
                        {answer && answer.includes(option.id) && <Range option={option} />}
                    </div>
                ))
            ) : (
                question.options.map((option) => (
                    <label key={option.id}>
                        <input
                            type="radio"
                            name={`question-${index}`}
                            value={option.id}
                            checked={answer === option.id}
                            onChange={() => handleChange(option.id)}
                        />
                        {option.text}
                    </label>
                ))
            )}
        </div>
    );
};

export default Question;
