import React from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => {
  return (
    <h1>
      { props.course }
    </h1>
  )
}

const Total = (props) => {
  return (
    <h2>
      { props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
    </h2>
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

  const partsProps = props.parts;
  const parts = partsProps.map(part => <Part part={ part.name } exercise={ part.exercises }/>)

  return (
    <>
      {parts}
    </>
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
    <>
      <Header course={ course.name }/>
      <Content parts={ course.parts } />
      <Total parts={ course.parts }/>
    </>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));

