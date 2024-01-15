import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import MonsterList from './components/MonsterList';
import Detail from './Detail';
import About from './About';
import SearchResults from './SearchResults';
import Documents from './components//Documents';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <MonsterList /> },
      { path: "detail/:detailId", element: <Detail /> },
      { path: "about", element: <About /> },
      { path: "search/:searchTerm?", element: <SearchResults /> },
      { path: "documents", element: <Documents /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);