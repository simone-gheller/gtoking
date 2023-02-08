import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Training from './Training';
import Matrix from './Matrix';
import Root from './routes/Route';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TrainingView from './TrainingView';
import ErrorPage from './ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/range-builder",
    element: <Matrix />,
  },
  {
    path: "/training",
    element: <Training />,
  },
  {
    path: "/training-view",
    element: <TrainingView />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <TrainingView /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
