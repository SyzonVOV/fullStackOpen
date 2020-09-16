import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let show = good + neutral + bad;

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h2>statistic</h2>
      <div id="statistics">
      {show 
      ? <Statistics good={good} neutral={neutral} bad={bad}/>
      : "No feedback given"}
      </div>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  return (
    <table>
      <tbody>
      <Statistic text="good" count={good} />
      <Statistic text="neutral" count={neutral} />
      <Statistic text="bad" count={bad} />
      <Statistic text="all" count={bad+neutral+good} />
      <Statistic text="average" count={(-bad+good)/(bad+neutral+good)} />
      <Statistic text="positive" count={((good*100)/(bad+neutral+good))+" %"} />
      </tbody>
    </table>
  )
}


const Statistic = ({text, count}) => {
  return (
    <tr> 
      <td>{text}</td> 
      <td>{count}</td> 
    </tr>   
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

