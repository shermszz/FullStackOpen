import { useState } from 'react'

const Button = ({onClick, text}) => 
    <button onClick={onClick}>
        {text}
    </button>

const Feedback = () => <h1>give feedback</h1>

const Statistics = () => <h1>statistics</h1>

const Score = ({text, value}) => {
  return (
    <p>
      {text} {value}
    </p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
        <Feedback />
        <Button onClick={incrementGood} text='good'/>
        <Button onClick={incrementNeutral} text='neutral'/>
        <Button onClick={incrementBad} text='bad'/>

        <Statistics />
        <Score text='good' value={good} />
        <Score text='neutral' value={neutral} />
        <Score text='bad' value={bad} />

    </div>
  )
}

export default App