
import { useContext, useEffect } from 'react';
import { MonsterContext } from '../App';
import VideoGameCard from './MonsterCard';
import Pagination from './Pagination';

import styles from './MonsterList.module.css';

export default function MonsterList () {
    const {setLoading, page, setPage} = useContext(MonsterContext);

    useEffect(() => {
        setLoading(true);
        fetch('https://api.open5e.com/v1/monsters/')
            .then(response => { return response.json() })
            .then(setPage)
            .finally(() => {
                setLoading(false)
            })
      }, [setPage, setLoading])

    return (
        <div>
            {page && 
                <div>
                    <Pagination />
                    <div className={styles.gameList}>
                        {page.results.map(monster => 
                            <VideoGameCard key={monster.slug} monster={monster} />
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