import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { i18nextPlugin } from 'translation-check';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import ru from './locales/ru.js';
import socketClient from './api/index.js';
import store from './slices/index.js';
import { SocketContext } from './contexts/index.jsx';
import App from './components/App.jsx';

export default function init() {
  const i18nextInstance = i18n.createInstance();

  i18nextInstance.use(i18nextPlugin).use(initReactI18next).init({
    lng: 'ru',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ru,
    },
  });

  const socket = socketClient();

  socket.getMessage(store.dispatch);
  socket.getChannel(store.dispatch);
  socket.getRemoveChannel(store.dispatch);
  socket.getRenameChannel(store.dispatch);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <I18nextProvider i18n={i18nextInstance}>
          <SocketContext.Provider value={socket}>
            <App />
          </SocketContext.Provider>
        </I18nextProvider>
      </Provider>
    </BrowserRouter>
  );
}
