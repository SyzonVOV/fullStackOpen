import {
  ADD_BLOG,
  ADD_VOTE,
  HIDE_NOTIF,
  SHOW_NOTIF,
  INIT_BLOG,
  INIT_TIMER,
  DEL_TIMER
} from './action-types';
import api from '../services/blogs';

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

export const addBlogThunk = payload => {
  return async dispatch => {
    console.log({...payload, votes: 0});
    const newBlog = await api.createNew({...payload, votes: 0});
    dispatch({
      type: ADD_BLOG,
      payload: newBlog,
    });
    dispatch(setNotificationcThunk(`you add '${newBlog.title}'`, 3));
  };
};

export const initializeBlogThunk = () => {
  return async dispatch => {
    const payload = await api.getAll();
    dispatch({
      type: INIT_BLOG,
      payload,
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
      const newBlog = await api.updateVote(payload);
      dispatch({
        type: ADD_VOTE,
        payload: newBlog,
      });
    } catch (error) {console.log(error);}
  };
};

