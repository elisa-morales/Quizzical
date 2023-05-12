import { decode } from "html-entities"
import { nanoid } from "nanoid"
// import Answer from "./Answer"

export default function Quiz(props) {
  const answerElements = props.data.answers.map((item) => (
    <div className={item.selected ? "deselected" : "answer-btn"} key={nanoid()} onClick={(e) => props.handleClick(e, props.data.id)}>
      {decode(item.answer)}
    </div>
  ))

  return (
    <div className="question-container">
      <h3>{decode(props.data.question)}</h3>
      <div className="answer-containter">{answerElements}</div>
    </div>
  )
}
