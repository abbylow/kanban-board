import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const root = document.getElementById('root');
root.style.cssText = 'width: 100vw; height: 100vh; display: flex; flex-direction: column';

ReactDOM.render(<App />, document.getElementById('root'));

