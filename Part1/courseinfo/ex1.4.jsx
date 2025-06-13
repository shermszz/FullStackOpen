const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

//Refactoring the Content component to use a Part component
const Part = ({name, exercises}) => {
    return (
        <p>{name} {exercises}</p>
    )
}

const Content = ({parts}) => {
  return (
    <div>
      <Part name={parts[0].name} exercises={parts[0].exercises} />
      <Part name={parts[1].name} exercises={parts[1].exercises} />
      <Part name={parts[2].name} exercises={parts[2].exercises} />
    </div>
  )
}

const Total = ({parts}) => {
  return (
    <div>
      <p>Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)} </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  //Could additionally add an id to each part object, e.g. {id: 1, name: 'Fundamentals of React', exercises: 10}
  //But in this case, using the index as the key would suffice
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