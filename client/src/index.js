import React from 'react';
import ReactDOM from 'react-dom';

// import { Horizontal } from '../src3/Horizontal';
import App2 from './App2';
import App from './App';
import './App.css'

ReactDOM.render(
  <React.StrictMode>
    <div className="mbl-hide" >
          <App/>
    </div>
    <div className="dsk-hide">
      <App2/>
    </div>
  
  
  </React.StrictMode>,
  document.getElementById('root')
);
