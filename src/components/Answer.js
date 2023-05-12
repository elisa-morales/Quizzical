import { useState } from "react"

export default function Answer(props) {
  const [select, setSelect] = useState(props.selected)

  const styles = {
    backgroundColor: select ? "#D6DBF5" : "transparent",
    border: select ? "1px solid #D6DBF5" : "",
  }

  function selectAnswer() {
    setSelect((prevState) => !prevState)
  }

  function checkAllAnswers() {
    setAllQuestions((prevState) => {
      return prevState.map((item) =>
        item.answers.map((answer) => {
          if (answer.selected) {
            return { ...answer, checked: true }
          } else {
            return item
          }
        })
      )
    })
  }

  return (
    <div style={styles} selected={false} className="answer-btn" onClick={() => selectAnswer(props.id)}>
      {props.answer}
    </div>
  )
}
