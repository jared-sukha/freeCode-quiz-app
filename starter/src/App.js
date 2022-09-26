import React, { useState, useEffect } from 'react'
import { getRandomQuotes, getUniqueCharacters } from './ApiClient'

export default function App() {
  // TODO
 
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
  const [colourChange, setColourChange] = useState(false)
  const [disable, setDisable] = useState(false);
  const [theTarget, setTheTarget] = useState('');

  useEffect(() => {
    getRandomQuotes().then((randomQuestArr) => {
      setQuestions(randomQuestArr)
    })
  }, [])

// TODO UseEffect is loading twice
// introduce replay button

  useEffect(() => {
    function ansArr(charArr) {
      let sourceAnswers = charArr
      let orderedAnsArr = [questions[currentQuestion].character]
      while (orderedAnsArr.length < 4) {
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
    if (evt.target.innerText !==questions[currentQuestion].character){
      setTheTarget(evt.target.innerText)
    }
    setColourChange(true)
    if (answer === questions[currentQuestion].character) {
      setScore(score + 1)
    }
    if (currentQuestion + 1 < questions.length) {
      setShowNextQuestion(true)
    } else {
      setShowNextQuestion(false)
      setShowScore(true)
    }
  }

  const handleNextQuestionClick = () => {
    // buttonRef.current.disabled = false;
    setDisable(false)
    const nextQuestion = currentQuestion + 1
    setShowNextQuestion(false)
    setColourChange(false)
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    }
  }

  function refreshPage() {
    window.location.reload(true);
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
        </>
      )}
    </div>
  )
}
