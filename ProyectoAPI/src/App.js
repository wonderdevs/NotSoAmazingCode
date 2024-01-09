import { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from "react-router-dom";

export const MonsterContext = createContext(null);
//The MonsterContext is created using createContext and exported for use in other components. This context will be used to share state and functions between components.

function App() {
  //The App function component uses the useState hook to create state variables page, searchTerm, and loading. page is used to store the current page of data, searchTerm is used to store the current search term, and loading is used to store whether the app is currently loading data.
  const [page, setPage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    //This includes a MonsterContext.Provider component that provides the state variables and their setter functions to its child components. The value prop of the MonsterContext.Provider is an object containing the state variables and their setter functions.
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

//cuando hacemos una busqueda deberia salir en el link un /search/aboleth por ejemplo, igual hacemos en detalles
//navbar tendria que llevar a algun sitio cuando se hace click, entonces ha sugerido, aunque se repita, poner tipo los diferentes tipos de monstruos y cuando hagas click que se muestre esos
//dijo que si quisiera podia hacer que el filtro solo se pudiese activar si hubiese una palabra de busqueda, pero que no hacia falta en si
//mover lo de pagination abajo
//un botón para volver arriba de la pagina