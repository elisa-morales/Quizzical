import { decode } from "html-entities"
import Answer from "./Answer"

export default function Quiz(props) {
  const answerElements = props.answers.map((item) => <Answer key={item.id} id={item.id} answer={decode(item.answer)} correctAnswer={props.correctAnswer} selected={item.selected} />)

  return (
    <div className="question-container">
      <h3>{decode(props.question)}</h3>
      <div className="answer-containter">{answerElements}</div>
    </div>
  )
}
