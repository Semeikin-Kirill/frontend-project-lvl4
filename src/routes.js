// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
  getData: () => [host, prefix, 'data'].join('/'),
  sendLogin: () => [host, prefix, 'login'].join('/'),
  sendSignup: () => [host, prefix, 'signup'].join('/'),
  home: '/',
  login: '/login',
  signup: '/signup',
  noMatch: '*',
};
