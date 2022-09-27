import React, { useState, useEffect } from 'react'
import { getRandomQuotes, getUniqueCharacters } from './ApiClient'

export default function App() {
  const [answers, setAnswers] = useState(['Loading...'])
  const [uniqueCharsAnswers, setUniqueCharsAnswers] = useState([])

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
  const [showScoreButton, setshowScoreButton] = useState(false)
  const [colourChange, setColourChange] = useState(false)
  const [disable, setDisable] = useState(false)
  const [theTarget, setTheTarget] = useState('')

  useEffect(() => {
    getRandomQuotes().then((randomQuestArr) => {
      setQuestions(randomQuestArr)
      console.log(randomQuestArr)
    })
    getUniqueCharacters().then((uniqueCharArr) => {
      setUniqueCharsAnswers(uniqueCharArr)
      console.log(uniqueCharArr)
    })
  }, [])

  // TODO UseEffect is loading twice!!!!

  // useEffect(() => {
  //   let orderedAnsArr = [questions[currentQuestion].character]
  //   console.log('iniitial', orderedAnsArr)
  // }, [questions])

  // useEffect(() => {
  //   function ansArr(charArr) {
  //     let orderedAnsArr = []
  //     // console.log('iniitial', orderedAnsArr)

  //     while (orderedAnsArr.length < 4) {
  //       console.log(orderedAnsArr)

  //       let r = charArr[Math.floor(Math.random() * charArr.length)]
  //       if (orderedAnsArr.indexOf(r) === -1) orderedAnsArr.push(r)
  //     }
  //     return orderedAnsArr.sort(() => Math.random() - 0.5)
  //   }
  //   setAnswers(ansArr)
  // }, [currentQuestion])

  useEffect(() => {
    function ansArr(charArr) {
      let sourceAnswers = charArr
      let orderedAnsArr = [questions[currentQuestion].character]
      while (orderedAnsArr.length < 4) {
        console.log(orderedAnsArr)
        let r = sourceAnswers[Math.floor(Math.random() * charArr.length)]
        if (orderedAnsArr.indexOf(r) === -1) orderedAnsArr.push(r)
      }
      return orderedAnsArr.sort(() => Math.random() - 0.5)
    }
    getUniqueCharacters().then((charArr) => {
      setAnswers(ansArr(charArr))
    })
  }, [questions, currentQuestion])

  const handleAnswerClick = (answer, evt) => {
    setDisable(true)
    console.log(evt.target.innerText)
    if (evt.target.innerText !== questions[currentQuestion].character) {
      setTheTarget(evt.target.innerText)
    }
    setColourChange(true)
    if (answer === questions[currentQuestion].character) {
      setScore(score + 1)
    }
    if (currentQuestion + 1 < questions.length) {
      setShowNextQuestion(true)
    } else if (currentQuestion + 1 === questions.length) {
      setshowScoreButton(true)
    } 
    else {
      setShowNextQuestion(false)
    }
    
  }

  const handleNextQuestionClick = () => {
    setDisable(false)
    const nextQuestion = currentQuestion + 1
    setShowNextQuestion(false)
    setColourChange(false)
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    }

  }

  const handleEndGameClick = () => {
    setShowScore(true)

  }

  function refreshPage() {
    window.location.reload(true)
  }

  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
          <button onClick={refreshPage}>Replay?</button>
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
                disabled={disable}
                className={
                  'button ' +
                  (colourChange &&
                  answer === questions[currentQuestion].character
                    ? 'correct'
                    : colourChange && answer === theTarget
                    ? 'incorrect'
                    : '')
                }
                key={i}
                onClick={(evt) => handleAnswerClick(answer, evt)}
              >
                {answer}
              </button>
            ))}
          </div>
          {showNextQuestion && (
            <div className="next-question-section">
              <button
                onClick={() => handleNextQuestionClick()}
                className="next-button"
              >
                Next Question
              </button>
            </div>
          )}
          {showScoreButton && (
            <div className="next-question-section">
              <button
                onClick={() => handleEndGameClick()}
                className="next-button"
              >
                Show Scores?
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
