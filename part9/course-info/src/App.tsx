import React from 'react';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface HeaderProps {
  course: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}
interface CoursePartBaseDescrip extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBaseDescrip {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseDescrip {
  type: "submission";
  exerciseSubmissionLink: string;
}
interface CourseSpecialPart extends CoursePartBaseDescrip {
  type: "special";
  requirements: Array<string>;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const Header = (props: HeaderProps): JSX.Element => {
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Total = (props: { parts: CoursePart[] }): JSX.Element => {

  return (
    <h2>
      {props.parts.reduce((acc, curr) => acc + curr.exerciseCount, 0)}
    </h2>
  )
}

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  if (part.type === 'normal') {
    return (
      <p>
        <b>{part.name} {part.exerciseCount}</b>
        <br />
        <i>{part.description}</i>
      </p>
    )
  }
  if (part.type === 'groupProject') {
    return (
      <p>
        <b>{part.name} {part.exerciseCount}</b>
        <br />
        project exercise {part.groupProjectCount}
      </p>
    )
  }
  if (part.type === 'submission') {
    return (
      <p>
        <b>{part.name} {part.exerciseCount}</b>
        <br />
        <i>{part.description}</i>
        <br />
        submit to {part.exerciseSubmissionLink}
      </p>
    )
  }
  if (part.type === 'special') {
    return (
      <p>
        <b>{part.name} {part.exerciseCount}</b>
        <br />
        <i>{part.description}</i>
        <br />
        required skills: {part.requirements.join(', ')}
      </p>
    )
  }
  return assertNever(part)
}

const Content = (props: { parts: CoursePart[] }): JSX.Element => {
  const partsProps = props.parts;
  const parts = partsProps.map(part => <Part key={part.name} part={part} />)

  return (
    <>
      {parts}
    </>
  )
}


const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];

  return (
    <>
      <Header course={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </>
  );
};

export default App;