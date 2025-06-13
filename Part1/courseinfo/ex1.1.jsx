// Header takes care of rendering the name of the course
const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}
//Content renders the parts and their number of exercises
const Content = ({parts}) => {

  return (
    <div>
      <p>{parts[0].name} {parts[0].exercises}</p>
      <p>{parts[1].name} {parts[1].exercises}</p>
      <p>{parts[2].name} {parts[2].exercises}</p>
    </div>
  )
}
//Total renders the total number of exercises
const Total = ({parts}) => {
  return (
    <div>
      <p>Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)} </p>
    </div>
  )
}

//App is always the root component. Everything else is its child component
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {name: 'Fundamentals of React', exercises: 10},
    {name: 'Using props to pass data', exercises: 7},
    {name: 'State of a component', exercises: 14},
  ]
  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts} />
    </div>
  )
}

export default App