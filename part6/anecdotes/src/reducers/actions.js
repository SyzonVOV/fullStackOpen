import {
  ADD_ANEC,
  ADD_VOTE,
  HIDE_NOTIF,
  SHOW_NOTIF,
  INIT_ANEC,
  INIT_TIMER,
  DEL_TIMER
} from './action-types';
import api from '../services/anecdotes';

export const addVote = payload => {
  return { type: ADD_VOTE, payload };
};

export const showNotif = payload => {
  return { type: SHOW_NOTIF, payload };
};

export const hideNotif = () => {
  return { type: HIDE_NOTIF };
};

export const initTimer = (id) => {
  return { type: INIT_TIMER, payload: id };
};

export const delTimer = () => {
  return { type: DEL_TIMER };
};

export const addAnecThunk = payload => {
  return async dispatch => {
    const newAnec = await api.createNew(payload);
    dispatch({
      type: ADD_ANEC,
      payload: newAnec,
    });
  };
};

export const setNotificationcThunk = (message, duration) => {
  return async (dispatch, getState) => {
    let timerID = getState().notification.timerID
    if (timerID) {
      clearTimeout(timerID)
      dispatch(delTimer());
    }
    dispatch(showNotif(`You voted '${message}'`));
    timerID = setTimeout(() => dispatch(hideNotif()), duration * 1000);
    dispatch(initTimer(timerID));

  };
};

export const voteAnecThunk = payload => {
  return async dispatch => {
    try {
      const newAnec = await api.updateVote(payload);
      dispatch({
        type: ADD_VOTE,
        payload: newAnec,
      });
    } catch (error) {console.log(error);}
  };
};

export const initializeAnecThunk = () => {
  return async dispatch => {
    const payload = await api.getAll();
    dispatch({
      type: INIT_ANEC,
      payload,
    });
  };
};
