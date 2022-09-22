import React, { useState, useEffect } from 'react'
import { getRandomQuotes, getUniqueCharacters } from './ApiClient'

export default function App() {
  // TODO
  // Will need useEffect to render inital random quotes (logic defined in ApiClient.js)
  // Also need to decide how answers will work, Answers will return random string array of character names (including answer) so will need to refer to questions and their character answers, to make sure answer is included in answer array.

  const [answers, setAnswers] = useState(['Loading...'])

  const [questions, setQuestions] = useState([
    {
      quote: 'Loading...',
      // character: 'Loading...',
    },
  ])

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)
  const [showNextQuestion, setShowNextQuestion] = useState(false)
  const [colour, setColour] = useState(false)

  useEffect(() => {
    getRandomQuotes().then((randomQuestArr) => {
      setQuestions(randomQuestArr)
    })
  }, [])

  //TODO When do the UseEffects Mount? At the moment, both render on DOM load, BUT have an issue when questions is used as dependency

  useEffect(() => {
    // console.log('qqqqq', questions)
    function ansArr(charArr) {
      let sourceAnswers = charArr
      let orderedAnsArr = [questions[currentQuestion].character]
      while (orderedAnsArr.length < 4) {
        let r = sourceAnswers[Math.floor(Math.random() * charArr.length)]
        if (orderedAnsArr.indexOf(r) === -1) orderedAnsArr.push(r)
      }
      // console.log(res.body[Math.floor(Math.random() * res.body.length)])
      // console.log(randomAnsArr)

      return orderedAnsArr.sort(() => Math.random() - 0.5)
    }
    getUniqueCharacters().then((charArr) => {
      setAnswers(ansArr(charArr))
    })
  }, [questions,currentQuestion])

  const handleAnswerClick = (isCorrect) => {
    // const nextQuestion = currentQuestion + 1
    // // getTheQuotes()
    // console.log('answers', answers)
    // console.log('qs', questions)
    // console.log()
    // if (nextQuestion < questions.length) {
    //   setCurrentQuestion(nextQuestion)
    // } else {
    //   setShowScore(true)
    // }
    if (isCorrect) {
      setScore(score + 1)
      setColour(!colour)
    }
    if (currentQuestion+1 !== questions.length){
      setShowNextQuestion(true)
    } else {
      setShowNextQuestion(false)
      setShowScore(true)
    }
  }


  const handleNextQuestionClick = () => {
    const nextQuestion = currentQuestion + 1;
    setShowNextQuestion(false)
    if(nextQuestion < questions.length){
      setCurrentQuestion(nextQuestion)
    } 
  }

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
              <button 
                key={i}
                onClick={() =>
                  handleAnswerClick(
                    answer === questions[currentQuestion].character
                  )
                }
              >
                {answer}
              </button>
            ))}
          </div>
          {showNextQuestion && <div className="next-question-section">
          <button onClick={()=>handleNextQuestionClick()}className="next-button">Next Question</button>
          </div>}
        </>
      )}
    </div>
  )
}
