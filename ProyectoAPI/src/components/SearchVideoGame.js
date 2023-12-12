import { useState } from 'react';
import styles from './SearchVideoGame.module.css';

export default function SearchVideoGame ({onSearch, onFound}) {
    const [searchTerm, setSearchTerm] = useState('');

    const searchGame = (term) => {
        onSearch();
        const searchAPI = `https://api.rawg.io/api/games?key=e6b23a2e2bce45a0b66b109bf056dc04&search=${term}&search_exact=true`;
    
        fetch(searchAPI)
        .then(response => {return response.json()})
        .then(onFound);
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
                <input type="text" value={searchTerm} onKeyDown={checkEnter} onChange={handleInputChange} className={styles.input} placeholder="Name your game..." />
                <div className={styles.icon} onClick={()=>searchGame(searchTerm)}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                </div>
                {searchTerm !== '' &&
                    <div className={styles.clear} onClick={clearSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 10l4 4m0 -4l-4 4" /></svg>
                    </div>
                }
            </form>
        </div>
    )
}