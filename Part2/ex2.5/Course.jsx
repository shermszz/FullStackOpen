const Header2 = ({ course }) => <h2>{course.name}</h2>

const Content = ({ parts }) => (
  <div>
    {parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({parts}) => {
  return (
    <div>
      <strong>
        total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
      </strong>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header2 course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course