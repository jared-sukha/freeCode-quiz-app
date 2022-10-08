import React, { useState, useEffect } from 'react'
import { getRandomQuotes, getUniqueCharacters } from './ApiClient'

export default function App() {
  const QUOTE_NUM = 10
  //NOTE: Maximum allowable unique answers is 7. BEWARE will crash if >7 (Quotes only exist for 7 different characters)
  const ANSWER_NUM = 4

  const [answers, setAnswers] = useState([
    ['Loading...', 'Loading...', 'Loading...', 'Loading...'],
  ])

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
    function ansArr(charArr, randomQuestArr) {
      let newFandangledArr = []
      for (let i = 0; i < QUOTE_NUM; i++) {
        let sourceAnswers = charArr
        let orderedAnsArr = [randomQuestArr[i].character]
        while (orderedAnsArr.length < ANSWER_NUM) {
          let r = sourceAnswers[Math.floor(Math.random() * charArr.length)]
          if (orderedAnsArr.indexOf(r) === -1) orderedAnsArr.push(r)
        }
        let randomAnsArr = orderedAnsArr.sort(() => Math.random() - 0.5)
        newFandangledArr.push(randomAnsArr)
      }
      console.log(newFandangledArr)
      return newFandangledArr
    }

    getRandomQuotes(QUOTE_NUM)
      .then((randomQuestArr) => {
        setQuestions(randomQuestArr)
        return randomQuestArr
      })
      .then((randomQuestArr) => {
        getUniqueCharacters().then((charArr) => {
          setAnswers(ansArr(charArr, randomQuestArr))
        })
      })
  }, [])

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
    } else {
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
  // console.log(questions)
  // console.log(currentQuestion)
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
                {currentQuestion + 1}/{questions.length}
              </span>
            </div>
            <div className="question-text">
              "{questions[currentQuestion].quote}"
            </div>
          </div>
          <div className="answer-section">
            {answers[currentQuestion].map((answer, i) => (
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
