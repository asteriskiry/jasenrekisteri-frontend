import React from 'react';
import ReactDOM from 'react-dom';

import App from './container/App';
import AuthProvider from './container/authProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  React.createElement(AuthProvider, null, React.createElement(App)),
  document.getElementById('root')
);
