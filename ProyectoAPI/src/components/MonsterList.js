//This component is used to display a list of monsters.
import { useContext, useEffect } from 'react';
import { MonsterContext } from '../App';
import MonsterCard from './MonsterCard';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

import styles from './MonsterList.module.css';
import TopTen from './TopTen';

export default function MonsterList () {
    //The MonsterList function component uses the useContext hook to access the setLoading, page, and setPage functions from the MonsterContext.
    const {setLoading, page, setPage} = useContext(MonsterContext);

    useEffect(() => {
        //The useEffect hook is used to fetch the list of monsters from an API when the component mounts.
        setLoading(true);
        fetch('https://api.open5e.com/v1/monsters/')
            .then(response => { return response.json() })
            .then(setPage)
            .finally(() => {
                setLoading(false)
            })
      }, [setPage, setLoading])

    return (
        //It checks if page is truthy and if so, it renders a div that includes the Pagination and SearchBar components, and a div with the class "gameList". This div maps over the results in the page to create a MonsterCard component for each monster. If the count of results is zero, it displays a message saying "No items found".
        <div>
            <div className={styles.topTenContainer}>
                <TopTen term={'size'} order={'desc'} />
                <TopTen term={'hit_points'} order={'asc'} />
                <TopTen term={'intelligence'} />
            </div>
            {page && 
                <div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Pagination /> <SearchBar />
                    </div>
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
                </div>
            }
        </div>
    )
}