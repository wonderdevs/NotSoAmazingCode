import { useEffect, useState } from 'react';
import './App.css';
import SearchVideoGame from './components/SearchVideoGame';
import VideoGamesList from './components/VideoGamesList';
import Pagination from './components/Pagination';

function App() {
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)

  const gamesFound = (page) => {
    setPage(page)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }

  const getPage = (URL) => {
    setLoading(true)
    fetch(URL)
    .then(response => { return response.json() })
    .then(setPage)
    .finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    })
  }

  const loadingResults = () => {
    setLoading(true);
  }

  useEffect(() => {
    setLoading(true);
    fetch('https://api.rawg.io/api/games?key=e6b23a2e2bce45a0b66b109bf056dc04')
    .then(response => { return response.json() })
    .then(setPage)
    .finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    })
  }, [])

  return (
    <div className="App">
      <h1>Not So Amazing Videogame List</h1>
      <hr/>
      <div className='listHeader'>
        <SearchVideoGame onSearch={loadingResults} onFound={gamesFound} />
        {page &&
          <Pagination page={page} onNext={getPage} onPrev={getPage} />
        }
      </div>
      {loading &&
        <div className="loader"></div>
      }
      {!loading && page &&
        <VideoGamesList page={page}/>
      }
      <footer><small>Made with 💜 <br/>NotSoAmazingThings © - 2023</small></footer>
    </div>
  );
}

export default App;