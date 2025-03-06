import { useState } from 'react'

const Button = ({onClick, text}) => (<button onClick={onClick}>{text}</button>)

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const avg = (good*1 + neutral*0 + bad*-1)/total
  const positive = good*100/total

  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good}/>
        <StatisticsLine text="neutral" value={neutral}/>
        <StatisticsLine text="bad" value={bad}/>
        <StatisticsLine text="total" value={total}/>
        <StatisticsLine text="average" value={avg.toFixed(1)}/>
        <StatisticsLine text="positive" value={`${positive.toFixed(1)} %`}/>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onClickState = (state, setState) => () => setState(state + 1)

  return (
    <div>
      <div>
        <h2>give feedback</h2>
        <div>
          <Button onClick={onClickState(good, setGood)} text={'good'}/>
          <Button onClick={onClickState(neutral, setNeutral)} text={'neutral'}/>
          <Button onClick={onClickState(bad, setBad)} text={'bad'}/>
        </div>
      </div>
      <div>
        <h2>statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    </div>
  )
}

export default App