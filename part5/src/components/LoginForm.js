import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  handleSendServerLogin,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (ev) => {
    ev.preventDefault();
    handleSendServerLogin({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <div id="loginFormComp">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSendServerLogin: PropTypes.func.isRequired
};

export default LoginForm;
