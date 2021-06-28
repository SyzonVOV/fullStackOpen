import React from 'react';

interface HeaderProps{
  course: string;
}

interface CourseParts{
  parts: {
  name: string;
  exerciseCount: number;
}[]}

const Header = (props: HeaderProps): JSX.Element => {
  return (
    <h1>
      { props.course }
    </h1>
  )
}

const Total = (props: CourseParts): JSX.Element => {

  return (
    <h2>
      { props.parts.reduce((acc, curr) => acc + curr.exerciseCount, 0)}
    </h2>
  )
}

const Part = (props: {part: string; exercise: number}): JSX.Element => {
  return (
    <p>
      { props.part } { props.exercise }
    </p>
  )
}

const Content = (props: CourseParts): JSX.Element => {

  const partsProps = props.parts;
  const parts = partsProps.map(part => <Part key={ part.name} part={ part.name } exercise={ part.exerciseCount }/>)

  return (
    <>
      {parts}
    </>
  )
}


const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <>
    <Header course={ courseName }/>
    <Content parts={ courseParts } />
    <Total parts={ courseParts }/>
  </>
  );
};

export default App;