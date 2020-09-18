import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [best, setBest] = useState({"anecdote": 0, "votes": 0});
  const [anecdotesObj, setAnecdotes] = useState(
    props.anecdotes.map((anecdote) => ({ "anecdote": anecdote, "votes": 0 }))
  );

  console.table(anecdotesObj);

  const nextRandom = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  };

  const toVote = () => {
    let newAnec = [...anecdotesObj];
    newAnec[selected].votes = newAnec[selected].votes + 1;
    if (best.votes < newAnec[selected].votes) {
      setBest({"anecdote": selected, "votes": newAnec[selected].votes})
    }
    setAnecdotes(newAnec);
  };

  const findBest = () => {

  };

  return (
    <>
      <div id="anecdote">
        <Anecdote
          anecdote={anecdotesObj[selected].anecdote}
          votes={anecdotesObj[selected].votes}
          heading={"Anecdote of the day"}
        />
      </div>
      <div>
        <Button handleClick={nextRandom} name={"next anecdote"} />
        <Button handleClick={toVote} name={"vote"} />
      </div>
      <div>
        <Anecdote
          anecdote={anecdotesObj[best.anecdote].anecdote}
          votes={anecdotesObj[best.anecdote].votes}
          heading={"Anecdote with most votes"}
        />
      </div>
    </>
  );
};

const Button = ({ handleClick, name }) => {
  return <button onClick={handleClick}>{name}</button>;
};

const Anecdote = ({ anecdote, votes, heading }) => {
  return (
    <div>
      <h2>{heading}</h2>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
