export default function Button(props) {
  const buttons = document.getElementsByClassName("answer-btn")

  function checkAnswers() {
    props.data.map((item) => {
      if (item.correctAnswer) {
        Array.from(buttons).every((btn) => {
          if (btn.style.backgroundColor === "#D6DBF5") {
            console.log("oky")
          }
        })
      }
    })
  }

  return (
    <button className="check-btn" onClick={checkAnswers}>
      Check answers
    </button>
  )
}

//item.id, item.question, item.correctAnswer
