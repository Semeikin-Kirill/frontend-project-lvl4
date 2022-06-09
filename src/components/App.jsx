import React, { useMemo, useState } from 'react';
import {
  Route, Routes, useLocation, Navigate,
} from 'react-router-dom';
import { has } from 'lodash';
import { ToastContainer } from 'react-toastify';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Navigation from './Navigation.jsx';
import NoMatch from './NoMatch.jsx';
import { AuthContext } from '../contexts/index.jsx';
import { useAuth } from '../hooks/index.jsx';
import Signup from './Signup.jsx';
import 'react-toastify/dist/ReactToastify.css';
import routes from '../routes.js';

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(has(localStorage, 'userId'));

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
  };
  const login = useMemo(() => ({
    loggedIn, logIn, logOut, getAuthHeader,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={login}>
      {children}
    </AuthContext.Provider>
  );
}

function PrivateRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to={routes.login} state={{ from: location }} />
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <Navigation />
        <Routes>
          <Route
            path={routes.home}
            element={(
              <PrivateRoute>
                <Home />
              </PrivateRoute>
          )}
          />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.signup} element={<Signup />} />
          <Route path={routes.noMatch} element={<NoMatch />} />
        </Routes>
      </div>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
