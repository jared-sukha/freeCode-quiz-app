import React, { useState, useEffect } from 'react'
import { getTheQuotes } from './ApiClient'

export default function App() {
  //  const questions = [
  //   {
  //     questionText: 'What is the capital of France?',
  //     answerOptions: [
  //       { answerText: 'New York', isCorrect: false },
  //       { answerText: 'London', isCorrect: false },
  //       { answerText: 'Paris', isCorrect: true },
  //       { answerText: 'Dublin', isCorrect: false },
  //     ],
  //   },
  //   {
  //     questionText: 'Who is CEO of Tesla?',
  //     answerOptions: [
  //       { answerText: 'Jeff Bezos', isCorrect: false },
  //       { answerText: 'Elon Musk', isCorrect: true },
  //       { answerText: 'Bill Gates', isCorrect: false },
  //       { answerText: 'Tony Stark', isCorrect: false },
  //     ],
  //   },
  //   {
  //     questionText: 'The iPhone was created by which company?',
  //     answerOptions: [
  //       { answerText: 'Apple', isCorrect: true },
  //       { answerText: 'Intel', isCorrect: false },
  //       { answerText: 'Amazon', isCorrect: false },
  //       { answerText: 'Microsoft', isCorrect: false },
  //     ],
  //   },
  //   {
  //     questionText: 'How many Harry Potter books are there?',
  //     answerOptions: [
  //       { answerText: '1', isCorrect: false },
  //       { answerText: '4', isCorrect: false },
  //       { answerText: '6', isCorrect: false },
  //       { answerText: '7', isCorrect: true },
  //     ],
  //   },
  // ]

  // TODO
  // Will need useEffect to render inital random quotes (logic defined in ApiClient.js)
  // Also need to decide how answers will work, Answers will return random string array of character names (including answer) so will need to refer to questions and their character answers, to make sure answer is included in answer array.

  const [questions, setQuestions] = useState([
    {
      quote:
        "This stuff'll make you a goddamn sexual tyrannosaurus... just like me.",
      character: 'Blain',
    },
    {
      quote: 'Payback time.',
      character: 'Blain',
    },
    {
      quote: "You lose it here, you're in a world of hurt.",
      character: 'Blain',
    },
    {
      quote: 'Makes Cambodia look like Kansas.',
      character: 'Blain',
    },
  ])

  const answers = [
    'Dutch', 'Dillon', 'Blain', 'Billy'
  ]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerClick = (isCorrect) => {
    const nextQuestion = currentQuestion + 1
    // getTheQuotes()
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
    if (isCorrect) {
      setScore(score + 1)
    }
  }

  // const handleNextQuestionClick = () => {
  //   const nextQuestion = currentQuestion + 1;
  //   if(nextQuestion < questions.length){
  //     setCurrentQuestion(nextQuestion)
  //   } else{
  //     setShowScore(true)
  //   }
  // }

  return (
    <div className="app">
      {/* HINT: replace "false" with logic to display the 
      score when the user has answered all the questions */}
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Who said it?</span>
              <span>
                {' '}
                {currentQuestion + 1}/{questions.length}
              </span>
            </div>
            <div className="question-text">
              {questions[currentQuestion].quote}
            </div>
          </div>
          <div className="answer-section">
            {answers.map((answer, i) => (
              <button key={i} onClick={()=>handleAnswerClick(answer===questions[currentQuestion].character)}>{answer} </button>
            ))}
            
          </div>
          {/* <div className="next-question-section">
          <button onClick={()=>handleNextQuestionClick()}className="next-button">Next Question</button>
          </div> */}
        </>
      )}
    </div>
  )
}
