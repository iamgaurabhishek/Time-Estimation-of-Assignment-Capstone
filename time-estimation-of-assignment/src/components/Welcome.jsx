import React from 'react'
import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <div>
      Welcome to Estimate your Assignment.

      <div>Now next click here to answer few <Link to="/questions">Questions</Link></div>
    </div>
  )
}
