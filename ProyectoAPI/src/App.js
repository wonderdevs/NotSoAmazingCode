import { createContext, useRef, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet, ScrollRestoration } from "react-router-dom";

export const MonsterContext = createContext(null);

function App() {
  // This is the App component. It is used to display the header, footer, and the rest of the components.
  const [page, setPage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const topButton = useRef(null);

  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    // This function is used to display the scroll to top button.
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      topButton.current.style.display = "block";
    } else {
      topButton.current.style.display = "none";
    }
  }

  const topFunction = () => {
    // This function is used to scroll to the top of the page.
    window.scrollTo(0, 0);
  }

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

        <button ref={topButton} onClick={topFunction} className='scrollTopButton' title="Go to top">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-up" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M16 9l-4 -4" /><path d="M8 9l4 -4" /></svg>
        </button>
        <ScrollRestoration />
        <Footer />
      </MonsterContext.Provider>
    </div>
  );
}

export default App;