import "./App.css";
import Beer from "./components/Beer";
import useFetchBeers from "./useFetchBeer";

function App() {
  const { data: beers, isLoading, error } = useFetchBeers();

  return (
    <>
      <h1 className="page-title">Beers</h1>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <Beer beers={beers} />
      )}
    </>
  );
}

export default App;
