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
    //Using the map function to render each part dynamically
    //We always need a key={index} so that React can keep track of the elements
    //If we add/remove items, we should create an id for each element in the parts array
    //so that it prevents React from getting confused 
    <div>
      {parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises} />
      ))}
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