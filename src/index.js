import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter  } from 'react-router-dom';

ReactDOM.render(

  <BrowserRouter style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)'
  }}>
    <Main />
  </BrowserRouter >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
