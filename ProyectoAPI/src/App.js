import { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { Outlet } from "react-router-dom";

export const MonsterContext = createContext(null);

function App() {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <div className="App">
      <MonsterContext.Provider value={{
          page, setPage,
          loading, setLoading
        }}>
        <Header />
        {loading && <div className="loader"></div>}
        <Outlet />
        <footer><small>Made with 💜 <br/>NotSoAmazingThings © - 2023</small></footer>
      </MonsterContext.Provider>
    </div>
  );
}

export default App;