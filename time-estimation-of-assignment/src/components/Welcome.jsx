import React from 'react'
import { Link } from 'react-router-dom'
import questions from '../content-before-questioning/Content'
export default function Welcome() {

  const question =  questions.map((question) => (
    <div key={question.id}>
      <div> {question.text}</div>
    </div>
  ))

  return (
    <div>
      <h2>Welcome to Estimate your Assignment.</h2>

      {question}

      <div>Now next click here to answer few <Link to="/questions">Start Questions to Answer</Link></div>
    </div>
  )
}
