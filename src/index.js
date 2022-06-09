import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import ReactDOM from 'react-dom/client';
import runApp from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

document.querySelector('body').classList.add('bg-light');
const container = document.querySelector('#chat');

const root = ReactDOM.createRoot(container);

root.render(runApp());
