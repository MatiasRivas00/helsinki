const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => {
  return (
    <>
      {props.parts.map((part) => (
        <p key={part.id}>{part.name} {part.exercises}</p>
      ))}
    </>
  )
}

const Total = (props) => {
  const exercises = props.parts.map((part) => part.exercises)
  const total = exercises.reduce((x, y) => x + y, 0)
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {id: 0, name: "Fundamentals of React", exercises: 10},
    {id: 1, name: "Using props to pass data", exercises: 7},
    {id: 2, name: "State of a component", exercises: 14},
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App