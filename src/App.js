import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import { decode } from "html-entities"
import shuffle from "./utils/shuffle"
import StartGame from "./components/StartGame"
import Quiz from "./components/Quiz"
import BlobYellow from "./components/BlobYellow"
import BlobBlue from "./components/BlobBlue"
import ClipLoader from "react-spinners/ClipLoader"

export default function App() {
  const [start, setStart] = useState(false)
  const [loading, setLoading] = useState(false)
  const [allQuestions, setAllQuestions] = useState([])
  let endGame = false

  const override = {
    display: "block",
    margin: "300px auto",
  }

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const res = await fetch("https://opentdb.com/api.php?amount=5&category=25&type=multiple")
      const data = await res.json()
      getQuestions(data.results)
    }
    fetchData()
  }, [])

  function getQuestions(data) {
    let questionsData = []
    data.forEach((item) => {
      questionsData.push({
        id: nanoid(),
        question: item.question,
        answers: shuffle([...item.incorrect_answers, item.correct_answer]).map((answer) => ({
          answer: answer,
          correctAnswer: item.correct_answer,
          selected: "",
          result: false,
          isCorrect: answer === item.correct_answer,
        })),
      })
    })
    setAllQuestions(questionsData)
    setLoading(false)
  }

  function startQuiz() {
    setStart((prevState) => !prevState)
  }

  const quizElements = allQuestions.map((item) => {
    if (item.checked === true) {
      endGame = true
    }
    return <Quiz key={item.id} id={item.id} data={item} handleClick={chooseAnswer} />
  })

  function chooseAnswer(e, id) {
    setAllQuestions((prevState) => {
      return prevState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            answers: item.answers.map((answer) => {
              const selectAnswer = decode(answer.answer) === e.target.textContent
              return { ...answer, selected: selectAnswer }
            }),
          }
        } else {
          return item
        }
      })
    })
  }

  function checkAllAnswers() {
    setAllQuestions((prevState) => {
      return prevState.map((item) => {
        return {
          ...item,
          checked: true,
          answers: item.answers.map((answer) => {
            if (answer.selected) {
              return { ...answer, result: true }
            } else {
              return answer
            }
          }),
        }
      })
    })
  }

  function playAgain() {
    window.location.reload(true)
  }

  return (
    <>
      <BlobYellow />
      {start ? (
        !loading ? (
          <div className="quiz-container">
            {quizElements}
            <button className="btn check-btn" onClick={endGame ? playAgain : checkAllAnswers}>
              {endGame ? "Play again" : "Check answers"}
            </button>
          </div>
        ) : (
          <ClipLoader color="#4d5b9e" cssOverride={override} />
        )
      ) : (
        <StartGame startQuiz={startQuiz} />
      )}
      <BlobBlue />
    </>
  )
}
