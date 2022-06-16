import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { i18nextPlugin } from 'translation-check';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { Provider as ProviderRollbar, ErrorBoundary } from '@rollbar/react';
import ru from './locales/ru.js';
import getApi from './api/index.js';
import store from './slices/index.js';
import { ChatApiContext } from './contexts/index.jsx';
import App from './components/App.jsx';
import { messageAdded } from './slices/messagesSlice.js';
import { channelAdded, removedChannel, renamedChannel } from './slices/channelsSlice.js';

export default function init() {
  const rollbarConfig = {
    accessToken: process.env.TOKEN,
    payload: 'production',
  };

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

  const api = getApi();

  api.getMessage((message) => store.dispatch(messageAdded(message)));
  api.getChannel((channel) => store.dispatch(channelAdded(channel)));
  api.getRemoveChannel((id) => store.dispatch(removedChannel(id)));
  api.getRenameChannel((channel) => store.dispatch(renamedChannel(channel)));

  return (
    <ProviderRollbar config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <Provider store={store}>
            <I18nextProvider i18n={i18nextInstance}>
              <ChatApiContext.Provider value={api}>
                <App />
              </ChatApiContext.Provider>
            </I18nextProvider>
          </Provider>
        </BrowserRouter>
      </ErrorBoundary>
    </ProviderRollbar>
  );
}
