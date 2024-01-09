//This code defines a SearchBar component. This component is used to search for monsters based on certain criteria.
import { useContext, useRef } from 'react';

import styles from './SearchBar.module.css';
import { MonsterContext } from '../App';

export default function SearchBar() {
    //The SearchBar function component uses the useContext hook to access the setPage and setLoading functions from the MonsterContext. It also uses the useRef hook to create a reference to the form in the component.
    const {setPage, setLoading} = useContext(MonsterContext);
    const formRef = useRef();


    const searchMonster = (event) => {
        //The searchMonster function is an event handler for form submission. It prevents the default form submission behavior, retrieves the search term, challenge rating (cr), and types from the form, and constructs a URL for the API request.
        event.preventDefault();
        const term = formRef.current.term.value;
        const cr = formRef.current.cr.value;
        let arrayTypes = [];
        formRef.current.type.forEach(element => {
            if(element.checked) arrayTypes.push(element.value)
        });
        const types = arrayTypes.join(',')
        console.log(term, cr, types);

        const searchAPI = `https://api.open5e.com/v1/monsters/?search=${term}&cr=${cr}&type__in=${types}`;
        setLoading(true);

        fetch(searchAPI)
            .then(response => {return response.json()})
            .then(result => {setPage(result)})
            .finally(() => {
                setLoading(false)
            });
    }

    const clearSearch = (event) => {
        //The clearSearch function is an event handler for the clear button. It resets the form and calls the searchMonster function.
        formRef.current.reset();
        searchMonster(event);
    }

    return (
        //The SearchBar component returns a form with a search input, a challenge rating input, a list of checkboxes for monster types, and a search button. The form is submitted when the user clicks the search button or presses the enter key. The form is reset when the user clicks the clear button.
        <div className={styles.searchBar}>
            <form onSubmit={searchMonster} ref={formRef}>
                <div className={styles.container}>
                    <input type="search" name='term' className={styles.input} placeholder="Search a monster..." />
                    <div className={styles.icon} onClick={searchMonster}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                    </div>
                    
                    <div className={styles.clear} onClick={clearSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 10l4 4m0 -4l-4 4" /></svg>
                    </div>
                </div>
                <input name='cr' type="number" placeholder="Insert Challenge Rating"/>

                <div>
                    <label><input name="type" value='Elemental' type='checkbox' />Elemental</label>
                    <label><input name="type" value='Dragon' type='checkbox' />Dragon</label>
                    <label><input name="type" value='Construct' type='checkbox' />Construct</label>
                    <label><input name="type" value='Beast' type='checkbox' />Beast</label>
                    <label><input name="type" value='Undead' type='checkbox' />Undead</label>
                    <label><input name="type" value='Humanoid' type='checkbox' />Humanoid</label>
                </div>
                
                <button type='submit'>Search</button>
            </form>
        </div>
    )
}