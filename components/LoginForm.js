import React, { useState } from 'react';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for login logic
    console.log('Email:', email, 'Password:', password);
    setEmail('');
    setPassword('');
    // Add actual login logic here
  };

  const handleRegisterRedirect = () => {
    router.push('/driver-registration'); // Redirect to the driver registration page
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="logo-container">
          <img src="/passby.png" alt="Pass-By Logo" className="logo" />
          <span className="brand-name">Pass-By-Delivery</span>
        </div>

        <h2 className="sign-in-title">Sign In</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
required            />
          </div>

          <div className="options">
            <label className="remember-me">
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#" className="forgot-password">
              Forgot password
            </a>
          </div>

          <button type="submit" className="button">
            Sign In
          </button>
        </form>

        <div className="register-option">
          <p>
            Not a registered user?{' '}
            <span className="register-link" onClick={handleRegisterRedirect}>
              Click here to register.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;