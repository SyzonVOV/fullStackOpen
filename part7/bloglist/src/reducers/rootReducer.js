import { combineReducers } from 'redux';
import { ADD_BLOG, ADD_VOTE, HIDE_NOTIF, SHOW_NOTIF, INIT_BLOG, DEL_TIMER, INIT_TIMER, SET_USER } from './action-types';

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = anecdote => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

//const initialState = anecdotesAtStart.map(asObject);

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_VOTE:
      return state.map(anecdote =>
        anecdote.id !== action.payload.id
          ? anecdote
          : { ...anecdote, votes: action.payload.votes},
      );

    case ADD_BLOG:
      return state.concat(action.payload);

    case INIT_BLOG:
      return action.payload;

    default:
      return state;
  }
};

const notificationReducer = (state = {message: null, timerID: null}, action) => {
  switch (action.type) {
    case SHOW_NOTIF:
      return {...state, message: action.payload};

    case HIDE_NOTIF:
      return {...state, message: null};

    case DEL_TIMER:
      return {...state, timerID: null};

    case INIT_TIMER:
      return {...state, timerID: action.payload};

    default:
      return state;
  }
};

const userReducer = (state = {user: null}, action) => {
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.payload};

    default:
      return state;
  }
};

export const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer
});
