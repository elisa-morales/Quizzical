import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import { decode } from "html-entities"
import shuffle from "./utils/shuffle"
import StartGame from "./components/StartGame"
import Quiz from "./components/Quiz"

export default function App() {
  const [start, setStart] = useState(false)
  const [allQuestions, setAllQuestions] = useState([])
  const [] = useState()

  useEffect(() => {
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
  }

  function startQuiz() {
    setStart(true)
  }

  const quizElements = allQuestions.map((item) => <Quiz key={item.id} id={item.id} data={item} handleClick={chooseAnswer} />)

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

  return (
    <>
      {start ? (
        <div className="quiz-container">
          {quizElements}
          <button className="btn check-btn" onClick={checkAllAnswers}>
            Check answers
          </button>
        </div>
      ) : (
        <StartGame startQuiz={startQuiz} />
      )}
    </>
  )
}
