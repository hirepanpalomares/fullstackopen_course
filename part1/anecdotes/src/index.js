import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return (
        <button onClick={props.clickHandler}>
            {props.text}
        </button>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes_list, setVotes] = useState(
    {
      0:0,
      1:0,
      2:0,
      3:0,
      4:0,
      5:0
    }
  )
  
  const most_voted = get_most_voted(votes_list)

  const changeSelected = () => {
    var rand = Math.floor(Math.random() * Math.floor(props.anecdotes.length));
    while (rand === selected) {
        rand = Math.floor(Math.random() * Math.floor(props.anecdotes.length));
    }
    console.log(rand)
    setSelected(rand)
  }

  const handleVote = () => {
    const copy_votes = {...votes_list}
    copy_votes[selected] += 1
    console.log(copy_votes);
    setVotes(copy_votes)
  }

  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br></br>
      has {votes_list[selected]} votes
      <br></br>
      <Button text='vote' clickHandler={handleVote} />
      <Button text='next anecdote' clickHandler={changeSelected} />
      <br></br>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[most_voted]}
      <br></br>
      has {votes_list[most_voted]} votes
    </div>
  )
}


function get_most_voted(votes) {
  var max_value = -1
  var max_key
  for (let [key, value] of Object.entries(votes)) {
    if (value > max_value) {
      max_value = value
      max_key = key
    }
  }
  return max_key
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)