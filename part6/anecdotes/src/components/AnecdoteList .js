import React from 'react';
import lodash from 'lodash';
import { connect } from 'react-redux'
// import { useSelector, useDispatch } from 'react-redux';
import { voteAnecThunk, setNotificationcThunk } from './../reducers/actions';

const AnecdoteList = ({anecdotes, voteAnecThunk, setNotificationcThunk}) => {
  const [newFilter, setNewFilter] = React.useState('');


  // const dispatch = useDispatch();

  const voteHandel = anecdote => {
    voteAnecThunk(anecdote);
    setNotificationcThunk(`you voted '${anecdote.content}'`, 3)
  };

  const anecdotesToShow =
    newFilter === ''
      ? anecdotes
      : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(newFilter));

  return (
    <div>
      <form>
        <div>
          filter: <input value={newFilter} onChange={(event)=>{setNewFilter(event.target.value)}} />
        </div>
      </form>
      <h2>Anecdotes</h2>
      {anecdotesToShow.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteHandel(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: lodash.orderBy(state.anecdotes, ['votes'], ['desc'])
  }
}

const mapDispatchToProps = {
  voteAnecThunk, setNotificationcThunk
}


export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
