import { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from "react-router-dom";

export const MonsterContext = createContext(null);

function App() {
  const [page, setPage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <MonsterContext.Provider value={{
          page, setPage,
          searchTerm, setSearchTerm,
          loading, setLoading
        }}>
        <Header />
        {loading && <div className="loader"></div>}
        <Outlet />
        <Footer />
      </MonsterContext.Provider>
    </div>
  );
}

export default App;

//TODO
// Add a top ten list of the monsters with highest sizes on the home page
// Add related content to details page (monsters with same alignment for example)
