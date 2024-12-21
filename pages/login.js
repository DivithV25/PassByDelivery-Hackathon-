import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import styles from '../styles/Login.module.css';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username: credentials.username,
      password: credentials.password
    });

    if (result.error) {
      alert('Login failed');
    } else {
      // Redirect to blockage page
      window.location.href = '/blockage';
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <input 
              type="text" 
              placeholder="Username/Phone Number"
              value={credentials.username}
              onChange={(e) => setCredentials({
                ...credentials, 
                username: e.target.value
              })}
              required 
            />
          </div>
          <div className={styles.inputGroup}>
            <input 
              type="password" 
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({
                ...credentials, 
                password: e.target.value
              })}
              required 
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}