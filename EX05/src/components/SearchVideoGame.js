import { useRef } from 'react';
import styles from './SearchVideoGame.module.css';

export default function SearchVideoGame ({onSearch, onFound}) {
    const search = useRef();

    const searchGame = (e) => {
        e.preventDefault();
        onSearch();
        const searchTerm = search.current.value;
        const searchAPI = `https://api.rawg.io/api/games?key=e6b23a2e2bce45a0b66b109bf056dc04&search=${searchTerm}&search_exact=true`;
    
        fetch(searchAPI)
        .then(response => {return response.json()})
        .then(onFound);
    }

    const checkEnter = (e) => {
        if(e.key === 'Enter') searchGame(e);
    }

    return (
        <div className={styles.searchBar}>
            <form className={styles.container}>
                <input ref={search} type="text" onKeyDown={checkEnter} className={styles.input} placeholder="Type to search..." />
                <div className={styles.icon} onClick={searchGame}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                </div>
            </form>
        </div>
    )
}