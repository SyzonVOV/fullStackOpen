import React from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => {
  return (
    <p>
      { props.course }
    </p>
  )
}

const Total = (props) => {
  return (
    <p>
      { props.exercises }
    </p>
  )
}

const Part = (props) => {
  return (
    <p>
      { props.part } { props.exercise }
    </p>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={ props.parts[0] } exercise={ props.exercises[0] }/>
      <Part part={ props.parts[1] } exercise={ props.exercises[1] }/>
      <Part part={ props.parts[2] } exercise={ props.exercises[2] }/>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={ course }/>
      <Content parts={ [part1, part2, part3] } exercises={ [exercises1, exercises2, exercises3] }/>
      <Total exercises={ exercises1 + exercises2 + exercises3 }/>
    </>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));

