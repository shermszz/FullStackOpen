import { useState } from 'react'

const Button = ({onClick, text}) => 
    <button onClick={onClick}>
        {text}
    </button>

const Feedback = () => <h1>give feedback</h1>

//Using Statistics as its own component
const Statistics = (props) => {
    if (props.all === 0) {
        return (
          <div>
            <h1>statistics</h1>
            <p>No feedback given</p>
          </div>
            
        )
    }
    //Instead of using Average and Posiotive Components,
    //we can calculate the average and positive percentage directly in the Statistics component
    const average = (props.good - props.bad) / props.all
    const positivePercentage = (props.good / props.all) * 100
    return (
        <div>
        <h1>statistics</h1>
        <StatisticLine text='good' value={props.good} />
            <StatisticLine text='neutral' value={props.neutral} />
            <StatisticLine text='bad' value={props.bad} />
            <StatisticLine text='all' value={props.all}/>
            <StatisticLine text='average' value={average} />
            <StatisticLine text='positive' value={`${positivePercentage}%`} />
        </div>
    )
} 

//Renaming Score to StatisticLine 
const StatisticLine = ({text, value}) => {
  return (
    <p>
      {text} {value}
    </p>
  )
}
// Removed Average and Positive components as they are now integrated into Statistics

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  //Remove the useState for all compared to Ex1.7
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