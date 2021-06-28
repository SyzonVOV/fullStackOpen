import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useField } from './../hooks/indexHook';
import { useDispatch } from 'react-redux';
import { setUserThunk } from '../reducers/actions';

const LoginForm = () => {
  const username = useField('username');
  const password = useField('password', 'password');
  const dispatch = useDispatch();


  const handleOnSubmit = event => {
    event.preventDefault();
    const content = { username: username.value, password: password.value };
    username.onChange();
    password.onChange();
    dispatch(setUserThunk(content));
  };

  return (
    <div id="loginFormComp">
      <h2>Login</h2>

      <form onSubmit={handleOnSubmit}>
        
        <div>
        <TextField id="username" label="Username" fullWidth {...username} />
      </div>
      <div>
        <TextField id="password" label="Password" fullWidth {...password} />
      </div>
      <div>
        <Button id="login-button" variant="contained" color="primary" type="submit">
          add
        </Button>
      </div>
      </form>
    </div>
  );
};


export default LoginForm;
