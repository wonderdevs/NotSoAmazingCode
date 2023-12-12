import { useContext, useState } from 'react';

import styles from './SearchBar.module.css';
import { MonsterContext } from '../App';

export default function SearchBar() {
    const {setPage, setLoading} = useContext(MonsterContext);
    const [searchTerm, setSearchTerm] = useState('');

    const searchGame = (term) => {
        const searchAPI = `https://api.open5e.com/v1/monsters/?search=${term}`;
        setLoading(true);

        fetch(searchAPI)
            .then(response => {return response.json()})
            .then(setPage)
            .finally(() => {
                setLoading(false)
            });
    }

    const checkEnter = (e) => {
        if(e.key === 'Enter') searchGame(searchTerm);
    }

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        searchGame('');
    }

    return (
        <div className={styles.searchBar}>
            <form className={styles.container} onSubmit={(e)=>e.preventDefault()}>
                <input type="search" value={searchTerm} onKeyDown={checkEnter} onChange={handleInputChange} className={styles.input} placeholder="Search a monster..." />
                <div className={styles.icon} onClick={()=>searchGame(searchTerm)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                </div>
                {searchTerm !== '' &&
                    <div className={styles.clear} onClick={clearSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 10l4 4m0 -4l-4 4" /></svg>
                    </div>
                }
            </form>
        </div>
    )
}