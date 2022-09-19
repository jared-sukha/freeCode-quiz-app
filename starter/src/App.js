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

  useEffect(() => {
    getRandomQuotes().then((randomQuestArr) => {
      setQuestions(randomQuestArr)

    })

  }, [])



  useEffect(()=>{
    function ansArr(charArr) {
      let sourceAnswers = charArr
      let randomAnsArr = []
      while (randomAnsArr.length < 4) {
        let r = sourceAnswers[Math.floor(Math.random() * charArr.length)]
        if (randomAnsArr.indexOf(r) === -1) randomAnsArr.push(r)
      }
      // console.log(res.body[Math.floor(Math.random() * res.body.length)])
      // console.log(randomAnsArr)
      
      return randomAnsArr
    }
    getUniqueCharacters().then((charArr) => {
      setAnswers(ansArr(charArr))
      
    })
    // .then((qArr) =>{
    //   setAnswers(qArr)
    // })
  },[currentQuestion])

  // [
  //   {
  //     quote:
  //       "This stuff'll make you a goddamn sexual tyrannosaurus... just like me.",
  //     character: 'Blain',
  //   },
  //   {
  //     quote: 'Payback time.',
  //     character: 'Blain',
  //   },
  //   {
  //     quote: "You lose it here, you're in a world of hurt.",
  //     character: 'Blain',
  //   },
  //   {
  //     quote: 'Makes Cambodia look like Kansas.',
  //     character: 'Blain',
  //   }
  // ]

  // const hardAnswers = ['Dutch', 'Dillon', 'Blain', 'Billy']



  const handleAnswerClick = (isCorrect) => {
    const nextQuestion = currentQuestion + 1
    // getTheQuotes()
    console.log('answers', answers)
    console.log('qs', questions)
    console.log()
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
          {/* <div className="next-question-section">
          <button onClick={()=>handleNextQuestionClick()}className="next-button">Next Question</button>
          </div> */}
        </>
      )}
    </div>
  )
}
