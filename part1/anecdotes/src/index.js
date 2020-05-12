import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => <button onClick={props.handleClick}>next anecdotes</button>

const App = (props) => {
  let [selected, setSelected] = useState(0)

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * 10))
  }
  
  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <Button handleClick={handleClick}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'The best way to get a project done faster is to start sooner',
  'A primary cause of complexity is that software vendors uncritically adopt almost any feature that users want.',
  'Documentation is the castor oil of programming. Managers think it is good for programmers and programmers hate it!',
  'Prolific programmers contribute to certain disaster.'
]

ReactDOM.render(
  <App anecdotes = {anecdotes}/>,
  document.getElementById('root')
);