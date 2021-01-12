import React from 'react';
import { connect } from 'react-redux';
import { addAnecThunk, setNotificationcThunk } from './../reducers/actions';

const AnecdoteForm = ({ addAnecThunk, setNotificationcThunk }) => {
  const handleOnSubmit = event => {
    event.preventDefault();
    const content = event.target.anec.value.trim();
    event.target.anec.value = '';
    addAnecThunk(content);
    setNotificationcThunk(`you voted '${content}'`, 3);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          <input name="anec" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  addAnecThunk,
  setNotificationcThunk,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
