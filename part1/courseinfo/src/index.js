import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
  <p>
    { props.part } { props.exercises }
  </p>
  )
}

const Content = (props) => {
  let partItem = props.course.parts.map((item, index) => 
    <Part 
      key = {index} 
      part = {item.name} 
      exercises = {item.exercises} 
    />
  )
  return (
    <div>
      { partItem }
    </div>
  )
}

const Total = (props) => {
  let result = 0
  props.course.parts.forEach(item => {
    result += item.exercises
  })

  return (
    <div>
      <p>
        Number of exercises { result }
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = { course } />
      <Content course = { course } />
      <Total course = { course }/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))