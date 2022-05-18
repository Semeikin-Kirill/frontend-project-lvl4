import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Route, Routes, useLocation, Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { has } from 'lodash';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Navigation from './Navigation.jsx';
import NoMatch from './NoMatch.jsx';
import AuthContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';
import store from '../slices/index.js';

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(has(localStorage, 'userId'));

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  const login = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

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
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <Home />
              </PrivateRoute>
          )}
          />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
      <div className="Toastify" />
    </AuthProvider>
  );
}

export default (container) => {
  const root = ReactDOM.createRoot(container);

  return root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  );
};
