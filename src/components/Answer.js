import { useState } from "react"

export default function Answer(props) {
  const [select, setSelect] = useState(false)
  const [selected, setSelected] = useState(false)

  const styles = {
    backgroundColor: select ? "#D6DBF5" : "transparent",
    border: select ? "1px solid #D6DBF5" : "",
  }

  function selectAnswer(id) {
    setSelect((prevState) => !prevState)
    setSelected((prevState) => !prevState)
  }

  function checkAnswerInside() {
    props.checkAnswer(props.id, props.answer, props.correctAnswer, selected)
  }

  return (
    <div style={styles} selected={false} className="answer-btn" onClick={() => selectAnswer(props.id)}>
      {props.answer}
    </div>
  )
}
