import React from 'react';
import { render } from 'react-dom';
import App from './app';

render(
  <div style={{width: "100vw", height: "100vh"}}>
    <App />
  </div>,
  document.getElementById('app')
);
