import { useEffect, useState } from 'react'

import * as API from './apicalls';
import { BeerType } from './interfaces';

import './App.css'

function App() {
  const [loading, setLoading] = useState(true);
  const [beers, setBeers] = useState<BeerType[]>([]);

  useEffect(() => {
    API.getBeers()
       .then(setBeers)
       .finally(() => setLoading(false));
  },[])

  return (
    <>
      {loading &&
        <svg viewBox="0 0 205 615" className="cola">
          <path d="M47 595c-8 0-26-6-26-34V261c0-17 9-29 16-38s16-28 16-28L68 59l-4-5s3-30 7-36 14-6 32-6 28 0 32 6 7 36 7 36l-4 5 15 136s9 19 16 28 16 21 16 38v300c0 28-18 34-26 34H47z"></path>
        </svg>
      }
      <ul>
      {
        beers.map((beer:any) => (
          <li key={beer.id}>{beer.name}</li>
        ))
      }
      </ul>
    </>
  )
}

export default App
