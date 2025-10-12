// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));
import React from 'react';
import ReactDOM from 'react-dom/client'; // Use createRoot from react-dom/client
import App from './App';
import './index.css';
import './i18n'; // Import i18n configuration


const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
