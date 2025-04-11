// src/App.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'; 
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <div>Loading...</div>;
  return (
      <main>
        {isAuthenticated ? ( 
        <>
        <LandingPage /> 
        <LogoutButton/>
        </> // If authenticated, show the homepage
      ) : (
        <div className="login-container">
          <HomePage/>
          <LoginButton /> 
         {/* Show Login Button if not authenticated */}
        </div>
      )}
      </main>
  );
}

export default App;
