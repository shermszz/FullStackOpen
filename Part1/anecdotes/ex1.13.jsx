import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  //This will initliase an array of votes all filled with 0s, up to the length of the anedotes array.
  //[0,0,0,0,0,0,0,0]
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const getRandomIndex = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const vote = () => {
    //Update the votes for the selected anecdote, for now without a database
    //First, copy the array of votes, to avoid mutating the state directly
    const updatedVotes = [...votes]
    //Next, increment the selected anecdote
    updatedVotes[selected] += 1
    //Lastly, update the state
    setVotes(updatedVotes)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      <Button onClick={vote} text='vote' />
      <Button onClick={getRandomIndex} text='next anecdote' />
    </div>
  )
}

export default App