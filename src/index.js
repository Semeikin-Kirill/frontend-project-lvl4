import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import runApp from './components/App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

document.querySelector('body').classList.add('bg-light');
const container = document.querySelector('#chat');

runApp(container);
