export default function StartGame(props) {
  return (
    <div className="start-container">
      <h1>Quizzical</h1>
      <p>Test your knowledge with art history quiz questions. </p>
      <button className="btn" onClick={props.startQuiz}>
        Start quiz
      </button>
    </div>
  )
}
