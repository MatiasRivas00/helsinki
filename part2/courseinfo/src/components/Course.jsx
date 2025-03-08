const Header = ({ course }) => (
    <h2>{course}</h2>
  )
  
  const Part = ({ part }) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }
  
  const Content = ({ parts }) => {
    
    return (
      <>
        {parts.map((part) => (
          <Part key={part.id} part={part}/>
        ))}
      </>
    )
  }
  
  const Total = ({ parts }) => {
    const exercises = parts.map((part) => part.exercises)
    const total = exercises.reduce((x, y) => x + y, 0)
    return (
      <p><strong>total of exercises {total}</strong></p>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

export default Course