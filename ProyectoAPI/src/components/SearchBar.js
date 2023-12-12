import { useState } from 'react';

export default function SearchBar() {
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
        <><input type="search" placeholder="Search a monster..." /></>
    )
}