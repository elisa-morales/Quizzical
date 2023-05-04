import { useState } from "react"

export default function Answer(props) {
  const [select, setSelect] = useState(false)

  const styles = {
    backgroundColor: select ? "#D6DBF5" : "transparent",
    border: select ? "1px solid #D6DBF5" : "",
  }

  function selectAnswer() {
    setSelect((prevState) => !prevState)
  }

  return (
    <div style={styles} selected={false} className="answer-btn" onClick={() => selectAnswer(props.id)}>
      {props.answer}
    </div>
  )
}
