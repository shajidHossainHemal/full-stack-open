import { useState } from 'react'

const Header = ({text}) => <h2>{text}</h2>
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad
  const average = (good - bad) / sum
  const positive = (good / sum) * 100

  if(sum == 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={sum} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positive + ' %'} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodButtonClick = () => setGood(good + 1)
  const handleNeutralButtonClick = () => setNeutral(neutral + 1)
  const handleBadButtonClick = () => setBad(bad + 1)

  return (
    <>
      <Header text='give feedback'/>
      <Button onClick={handleGoodButtonClick} text='good'/>
      <Button onClick={handleNeutralButtonClick} text='neutral' />
      <Button onClick={handleBadButtonClick} text='bad' />
      <Header text='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App
