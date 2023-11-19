import './App.css';
import { Outlet, Link } from "react-router-dom";

function App() {

  return (
    <div className="App">
        <Link to="/"><h1>Not So Amazing Videogame List</h1></Link>
        <hr/>
        <div>
          <Outlet />
        </div>
        <footer><small>Made with 💜 <br/>NotSoAmazingThings © - 2023</small></footer>
    </div>
  );
}

export default App;