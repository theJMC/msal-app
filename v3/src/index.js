import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { GlobalState, useGlobalState } from './globalState';
import { RequireAuth } from './ProtectedRoute';
import { supabase } from './supabaseClient';

import NavBar from "./components/navbar";

import App from './pages/App';
import Dashboard from './pages/Dashboard'
import {LogInPage, LogOutPage} from './pages/AuthRoutes'
import Profile from './pages/Profile'

function Main() {
  // const [globalState, setGlobalState] = useGlobalState()
  // const [loaded, setLoaded] = useState(false)


  // useEffect(() => {
  //   const checkAuth = async () => { 
  //       setLoaded(false)
  //       try {
  //           const { data: { user }, error } = await supabase.auth.getUser() 
  //           if (error !== null) {
  //             setGlobalState("isAuth", false)
  //           } else if (user.id === JSON.parse(globalState.session).user.id) {
  //             setGlobalState("isAuth", true)
  //           } else {
  //             setGlobalState("isAuth", false)
  //           }
  //       } catch {
  //         setGlobalState("isAuth", false)
  //       } finally {
  //           setLoaded(true)
  //       }
        
  //   }
  //   checkAuth()
  // }, [globalState.isAuth, globalState.session, setGlobalState])

  // if (!loaded) {
  //   return null
  // }

  return (
    <Router>
      <NavBar />
      <Routes>


        <Route exact path="/" element={<App />} />

        <Route path="/dashboard" element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
          } />

        <Route path="/login" element={<LogInPage />} />

        <Route path="/logout" element={<LogOutPage />} />

        <Route path="/profile" element={<Profile />} />


      </Routes>
    </Router>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <GlobalState>
      <Main />
    </GlobalState>
  // </React.StrictMode>
);
