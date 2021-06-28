import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    'z-index': 1,
  },
}));

const Notification = () => {
  const notification = useSelector(state => state.notification.message);
  const classes = useStyles();
  return (
    notification && (
      <div className={classes.root}>
        <Alert severity={notification.type}>
          <AlertTitle>Add new blog!</AlertTitle>
          {notification.message}
        </Alert>
      </div>
    )
  );
};

export default Notification;
