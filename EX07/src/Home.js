
import { useEffect, useState } from 'react';
import SearchVideoGame from './components/SearchVideoGame';
import VideoGamesList from './components/VideoGamesList';
import Pagination from './components/Pagination';

export default function Home (){
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
        <>
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
        </>
    )
}