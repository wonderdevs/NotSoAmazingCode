import './App.css';
import Header from './components/Header';
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
        <Header />
        <hr/>
        <div>
          <Outlet />
        </div>
      {/* FOOTERComponent */}
        <footer><small>Made with 💜 <br/>NotSoAmazingThings © - 2023</small></footer>
    </div>
  );
}

export default App;