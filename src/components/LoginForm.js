
import React, { useState } from 'react';
import './LoginForm.css'; // We'll create this CSS file next

function LoginForm({ onSubmit, errorMessage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(username, password);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Dentist Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="login-button">Login</button>
    </form>
  );
}

export default LoginForm;
