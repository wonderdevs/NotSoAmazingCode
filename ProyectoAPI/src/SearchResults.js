import { useContext } from 'react';
import { useParams } from "react-router-dom";
import { MonsterContext } from "./App";
import MonsterCard from "./components/MonsterCard";
import Pagination from "./components/Pagination";

import styles from './components/MonsterList.module.css';

export default function SearchResults() {
    let { searchTerm } = useParams();
    const { page } = useContext(MonsterContext);

    return (
        <>
            <h1>Search Results</h1>
            <p>{searchTerm}</p>
            {page && 
                <div>
                    <div className={styles.gameList}>
                        {page.results.map(monster => 
                            <MonsterCard key={monster.slug} monster={monster} />
                        )}
                        {page.count === 0 &&
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-windsock" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 3v18" /><path d="M6 11l12 -1v-4l-12 -1" /><path d="M10 5.5v5" /><path d="M14 6v4" /><path d="M4 21h4" /></svg>
                                No items found
                            </>
                        }
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Pagination />
                    </div>
                </div>
            }
        </>
    )
}