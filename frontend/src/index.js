import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';

import Login from './pages/login';
import AdminDashboard from './pages/admin-dashboard';
import MemberDashboard from './pages/member-dashboard';

const router = createBrowserRouter([
  {path:'/login', element: <Login/>},
  {path:'/', element: <Login/>},
  {path:'/admin-dashboard', element: <AdminDashboard/>},
  {path:'/member-dashboard', element: <MemberDashboard/>}
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

