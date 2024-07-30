import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { GlobalState } from './globalState';


import NavBar from "./components/navbar";

import App from './pages/App';
import Dashboard from './pages/Dashboard'
import {LogInPage, LogOutPage} from './pages/AuthRoutes'
import Profile from './pages/Profile'

function Main() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/logout" element={<LogOutPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalState>
      <Main />
    </GlobalState>
  </React.StrictMode>
);
