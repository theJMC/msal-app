
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import { GlobalState, useGlobalState } from './globalState';

import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MsalAuthenticationTemplate, MsalProvider } from '@azure/msal-react'

import { loginRequest } from "./authConfig"



import NavBar from "./components/navbar";

import App from './pages/App';
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'


const configuration = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID
  }
}

const pca = new PublicClientApplication(configuration)



function ErrorComponent({error}) {
  console.log(error)
  return <p>Error Occured</p>
}

function LoadingComponent() {
  return <p>Authentication In Progress...</p>
}

function Main() {
  console.log(process.env.REACT_APP_CLIENT_ID)
  // const authRequest = {
  //   scopes: ["openid", "profile"]
  // }

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<App />} />

        <Route path="/dashboard" element={
          <MsalAuthenticationTemplate 
            interactionType={InteractionType.Redirect}
            authenticationRequest={loginRequest}
            errorComponent={ErrorComponent}
            loadingComponent={LoadingComponent}
          >
            <Dashboard />
          </MsalAuthenticationTemplate>
          } />
        <Route path="/profile" element={
          <MsalAuthenticationTemplate 
            interactionType={InteractionType.Redirect}
            authenticationRequest={loginRequest}
            errorComponent={ErrorComponent}
            loadingComponent={LoadingComponent}
          >
            <Profile />
          </MsalAuthenticationTemplate>
        } />


      </Routes>
    </Router>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <MsalProvider instance={pca}>
    <GlobalState>  
      <Main />
    </GlobalState>
  </MsalProvider>
  // </React.StrictMode>
);
