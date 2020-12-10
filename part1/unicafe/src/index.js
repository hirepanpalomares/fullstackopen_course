import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.clickHandler}>
      {props.text}
    </button>
  )
}

const Statistic = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td> {props.value} {props.additionalText}</td>
      </tr>
    </tbody>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <Statistic text='good' value={props.good} additionalText=''/>
        <Statistic text='neutral' value={props.neutral} additionalText=''/>
        <Statistic text='bad' value={props.bad} additionalText=''/>
        <Statistic text='total' value={props.total} additionalText=''/>
        <Statistic text='average' value={props.average} additionalText=''/>
        <Statistic text='positive' value={props.positive} additionalText='%'/>
      </table>
      
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const score = good - bad

  var average = 0
  var positive = 0
  if (total > 0) {
    average = score / total
    positive = good*100/total
  }
  
  const opinionHandler = (opinion) => {
    switch (opinion) {
      case 'good':
        return (() => {setGood(good + 1)})
      case 'neutral':
        return (() => {setNeutral(neutral + 1)})
      case 'bad':
        return (() => {setBad(bad + 1)})
      default:
        break;
    }
  }

  return (
    <div>
      <h1> give feedback </h1>

      <Button clickHandler={opinionHandler('good')} text='good'/>
      <Button clickHandler={opinionHandler('neutral')} text='neutral'/>
      <Button clickHandler={opinionHandler('bad')} text='bad'/>

      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)