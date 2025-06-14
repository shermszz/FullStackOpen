import { useState } from 'react'

const Button = ({onClick, text}) => 
    <button onClick={onClick}>
        {text}
    </button>

const Feedback = () => <h1>give feedback</h1>

const Statistics = ({good, neutral, bad, all}) => {
    //If there is no feedback, simply display "No feedback given"
    if (all === 0) {
        return (
          <div>
            <h1>statistics</h1>
            <p>No feedback given</p>
          </div>
            
        )
    }
    return (
        <div>
        <h1>statistics</h1>
        <Score text='good' value={good} />
            <Score text='neutral' value={neutral} />
            <Score text='bad' value={bad} />
            <Score text='all' value={all}/>
            <Average good={good} bad={bad} all={all}/>
            <Positive good={good} all={all} />
        </div>
    )
} 

const Score = ({text, value}) => {
  return (
    <p>
      {text} {value}
    </p>
  )
}

const Average = ({good, bad, all}) => {
  if (all === 0) {
    return (
      <Score text='average' value={0} />
    )
  }
  const avg = (good - bad) / all
  return (
    <Score text='average' value={avg} />
  )
}

const Positive = ({good, all}) => {
   if (all === 0) {
    return (
      <Score text='positive' value="0%" />
    )
  }
  const percentageOfPositive = (good / all) * 100
  return (
    <Score text='positive' value={`${percentageOfPositive}%`} />
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad

  const incrementGood = () => {
    setGood(good + 1)
    
  }
  const incrementNeutral = () => {
    setNeutral(neutral + 1)
    
  }
  const incrementBad = () => {
    setBad(bad + 1)
    
  }

  return (
    <div>
        <Feedback />
        <Button onClick={incrementGood} text='good'/>
        <Button onClick={incrementNeutral} text='neutral'/>
        <Button onClick={incrementBad} text='bad'/>

        <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
        
    </div>
  )
}

export default App