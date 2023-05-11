import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import { decode } from "html-entities"
import shuffle from "./utils/shuffle"
import StartGame from "./components/StartGame"
import Quiz from "./components/Quiz"
import Button from "./components/Button"

export default function App() {
  const [start, setStart] = useState(false)
  const [allQuestions, setAllQuestions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://opentdb.com/api.php?amount=5&category=25&type=multiple")
      const data = await res.json()
      let questionsData = []
      data.results.forEach((item) => {
        questionsData.push({
          id: nanoid(),
          question: item.question,
          answers: shuffle([...item.incorrect_answers, item.correct_answer]),
          correctAnswer: item.correct_answer,
          selected: false,
          checked: false,
        })
      })
      setAllQuestions(questionsData)
    }
    fetchData()
  }, [])

  function startQuiz() {
    setStart(true)
  }

  const answersData = allQuestions.map((item) => (
    <Quiz
      data={item}
      key={item.id}
      id={item.id}
      question={item.question}
      answers={[
        {
          answer: item.answers[0],
          id: nanoid(),
          selected: false,
        },
        {
          answer: item.answers[1],
          id: nanoid(),
          selected: false,
        },
        {
          answer: item.answers[2],
          id: nanoid(),
          selected: false,
        },
        {
          answer: item.answers[3],
          id: nanoid(),
          selected: false,
        },
      ]}
      correctAnswer={decode(item.correctAnswer)}
    />
  ))

  const quizElements = answersData

  const buttonElement = <Button data={answersData} />

  return (
    <div>
      {start ? (
        <div className="quiz-container">
          {quizElements}
          {buttonElement}
        </div>
      ) : (
        <StartGame startQuiz={startQuiz} />
      )}
    </div>
  )
}
