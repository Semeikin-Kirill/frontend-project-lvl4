import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Route, Routes, useLocation, Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { has } from 'lodash';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { Provider as ProviderRollbar, ErrorBoundary } from '@rollbar/react';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Navigation from './Navigation.jsx';
import NoMatch from './NoMatch.jsx';
import { AuthContext } from '../contexts/index.jsx';
import { useAuth } from '../hooks/index.jsx';
import store from '../slices/index.js';
import Signup from './Signup.jsx';
import i18n from '../i18n.js';
import 'react-toastify/dist/ReactToastify.css';

const rollbarConfig = {
  accessToken: 'c7e072a198ec4d7083a194eb7fe052f5',
  payload: {
    environment: 'production',
  },
};

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
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
      <ToastContainer />
    </AuthProvider>
  );
}

export default (container) => {
  const root = ReactDOM.createRoot(container);

  return root.render(
    <ProviderRollbar config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </Provider>
        </BrowserRouter>
      </ErrorBoundary>
    </ProviderRollbar>,
  );
};
