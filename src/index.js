import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/antd.css';
// import 'antd/dist/antd.less'
import AuthContextProvider from './context/auth-context';
import {HashRouter} from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <HashRouter >
      <App />
      </HashRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
