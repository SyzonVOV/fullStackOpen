import React, { useEffect } from 'react';
import AnecdoteList from './components/AnecdoteList ';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { initializeAnecThunk } from './reducers/actions';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecThunk());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteForm />
      <br />
      <AnecdoteList />
    </div>
  );
};

export default App;
