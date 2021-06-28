import {
  ADD_BLOG,
  ADD_VOTE,
  HIDE_NOTIF,
  SHOW_NOTIF,
  INIT_BLOG,
  INIT_TIMER,
  DEL_TIMER,
  SET_USER,
} from './action-types';
import apiBlogs from '../services/blogs';
import apiLogin from '../services/login';

export const addVote = payload => {
  return { type: ADD_VOTE, payload };
};

export const showNotif = payload => {
  return { type: SHOW_NOTIF, payload };
};

export const hideNotif = () => {
  return { type: HIDE_NOTIF };
};

export const initTimer = id => {
  return { type: INIT_TIMER, payload: id };
};

export const delTimer = () => {
  return { type: DEL_TIMER };
};

export const setUser = payload => {
  return { type: SET_USER, payload };
};

export const addBlogThunk = payload => {
  return async dispatch => {
    console.log({ ...payload, votes: 0 });
    const newBlog = await apiBlogs.createNew({ ...payload, votes: 0 });
    dispatch({
      type: ADD_BLOG,
      payload: newBlog,
    });
    dispatch(
      setNotificationcThunk(
        { message: `you add '${newBlog.title}'`, type: 'success' },
        3,
      ),
    );
  };
};

export const initializeBlogThunk = () => {
  return async dispatch => {
    const payload = await apiBlogs.getAll();
    dispatch({
      type: INIT_BLOG,
      payload,
    });
  };
};

export const setUserThunk = content => {
  return async dispatch => {
    try {
      const user = await apiLogin(content);
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      dispatch(setUser(user.name));
    } catch (exception) {
      dispatch(
        setNotificationcThunk(
          { message: 'Wrong credentials', type: 'error' },
          3,
        ),
      );
    }
  };
};


export const likeBlogThunk = blogId => {
  return async (dispatch, getState) => {
    let blogs = getState().blogs;
    let blogData = blogs.find(blog => blog.id===blogId);
    blogData = { ...blogData, likes: blogData.likes+1 };
    try {
      const updatedBlog = await apiBlogs.update(blogData);
      dispatch(addVote(updatedBlog));
      dispatch(
        setNotificationcThunk(
          { message: `the blog ${updatedBlog.title} by ${updatedBlog.author} updated`, type: 'success' },
          3,
        ),
      );
    } catch (exception) {
      dispatch(
        setNotificationcThunk(
          { message: 'Wrong credentials', type: 'error' },
          3,
        ),
      );
    }
  };
};

export const setNotificationcThunk = (message, duration) => {
  return async (dispatch, getState) => {
    let timerID = getState().notification.timerID;
    if (timerID) {
      clearTimeout(timerID);
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
      const newBlog = await apiBlogs.updateVote(payload);
      dispatch({
        type: ADD_VOTE,
        payload: newBlog,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
