import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Title = (props) => <h1>{props.title}</h1>

const Button = (props) => <button onClick={props.handleClick}>{props.name}</button>

const Statistics = ({
  good,
  neutral,
  bad
}) => {
  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>
  }
  return (
    <div>
      <table>
        <tbody>
          <Stat name='good' stat={good} />
          <Stat name='neutral' stat={neutral} />
          <Stat name='bad' stat={bad} />
          <Stat name='all' stat={good + neutral + bad} />
          <Stat name='average' stat={(good + neutral + bad) / 3} />
          <Stat name='positive' stat={good / (good + neutral + bad) + '%'} />
        </tbody>
      </table>
    </div>
  )
}

const Stat = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.stat}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <Title title='give feedback' />
      <Button handleClick={handleGood} name='good' />
      <Button handleClick={handleNeutral} name='neutral' />
      <Button handleClick={handleBad} name='bad' />
      <Title title='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
