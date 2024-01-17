import { useContext, useEffect } from 'react';
import { MonsterContext } from '../App';
import MonsterCard from './MonsterCard';
import Pagination from './Pagination';

import styles from './MonsterList.module.css';
import TopTen from './TopTen';

export default function MonsterList () {
    // This is the MonsterList component. It is used to display the monsters from the API.
    const {setLoading, page, setPage} = useContext(MonsterContext);

    useEffect(() => {
        // This function is used to fetch the monsters from the API.
        setLoading(true);
        fetch('https://api.open5e.com/v1/monsters/')
            .then(response => { return response.json() })
            .then(setPage)
            .finally(() => {
                setLoading(false)
            })
      }, [setPage, setLoading])

    return (
        // TopTen is used to display the top ten monsters by size, hit points, and intelligence. MonsterCard is used to display the monsters from the API with their name, hit points, and image. Pagination is used to display the pagination for the monsters.
        <div>
            <div className={styles.topTenContainer}>
                <TopTen term={'size'} order={'desc'} />
                <TopTen term={'hit_points'} order={'desc'} />
                <TopTen term={'intelligence'} order={'desc'}/>
            </div>
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
        </div>
    )
}