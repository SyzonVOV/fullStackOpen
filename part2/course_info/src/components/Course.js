import React from 'react';

const Course = ({course}) => {

  return (
  <>
    <Header course={ course.name }/>
    <Content parts={ course.parts } />
    <Total parts={ course.parts }/>
  </>

  )
  
}

const Header = (props) => {
  return (
    <h2>
      { props.course }
    </h2>
  )
}

const Content = ({parts}) => {

  const partsHTML = parts.map(part => <Part key={part.id} part={ part.name } exercise={ part.exercises }/>)

  return (
    <>
      {partsHTML}
    </>
  )
}

const Total = (props) => {
  let sum = props.parts.reduce((acc, cur) => acc + cur.exercises, 0);
  return (
    <h3>
      total of { sum } exercises
    </h3>
  )
}

const Part = (props) => {
  return (
    <p>
      { props.part } { props.exercise }
    </p>
  )
}



export default Course;
