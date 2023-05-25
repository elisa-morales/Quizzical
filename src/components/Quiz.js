import { decode } from "html-entities"
import { nanoid } from "nanoid"

export default function Quiz(props) {
  const answerElements = props.data.answers.map((item) => {
    let classBtn
    if (item.selected && !item.result) {
      classBtn = "selected"
    } else if (item.result === true && item.isCorrect) {
      classBtn = "right"
    } else if (item.result === true && !item.isCorrect) {
      classBtn = "wrong"
    } else if (props.data.checked === true && !item.selected) {
      classBtn = "deselected"
    }

    return (
      <button className={`answer-btn ${classBtn}`} key={nanoid()} onClick={(e) => props.handleClick(e, props.data.id)} disabled={props.data.checked === true ? true : false}>
        {decode(item.answer)}
      </button>
    )
  })

  return (
    <>
      {answerElements ? (
        <div className="question-container">
          <h3>{decode(props.data.question)}</h3>
          <div className="answer-containter">{answerElements}</div>
        </div>
      ) : (
        "Loading"
      )}
    </>
  )
}
