import "./App.css";
import Beer from "./components/Beer";
import { useEffect, useState } from "react";

function App() {
  const [beers, setBeer] = useState(null);

  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers")
      .then((res) => res.json())
      .then((data) => setBeer(data));
  }, []);
  return (
    <>
      <h1 className="page-title">Beers</h1>
      <Beer beers={beers} />
    </>
  );
}

export default App
