import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './css/common.css'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import  Path from './routerPath/Path.jsx';
import { Flag } from './flag/Flag.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
  <Flag>
    <Path />
  </Flag>
  </BrowserRouter>
  


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
