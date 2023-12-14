import { useContext, useRef, useState } from 'react';

import styles from './SearchBar.module.css';
import { MonsterContext } from '../App';
import CRSlider from './CRSlider';
import TypeSelect from './TypeSelect';

export default function SearchBar() {
    const {setPage, setLoading} = useContext(MonsterContext);
    const [activeFilters, setActiveFilters] = useState(false);
    const formRef = useRef();

    const searchMonster = (event) => {
        event.preventDefault();
        const term = formRef.current.term.value;
        const order = formRef.current.order.value;
        const cr = activeFilters && formRef.current.cr.value>=0? formRef.current.cr.value: '';
        let arrayTypes = [];
        if (activeFilters) {
            formRef.current.type.forEach(element => {
                if(element.checked) arrayTypes.push(element.value)
            });
        }
        const types = arrayTypes.join(',')
        console.log(term, order, cr, types);

        const searchAPI = `https://api.open5e.com/v1/monsters/?search=${term}&cr=${cr}&type__in=${types}&ordering=${order}`;
        setLoading(true);

        fetch(searchAPI)
            .then(response => {return response.json()})
            .then(result => {setPage(result)})
            .finally(() => {
                setLoading(false)
            });
    }

    const clearSearch = (event) => {
        formRef.current.reset();
        setActiveFilters(false);
        searchMonster(event);
    }

    const toggleFilters = () => {
        setActiveFilters(!activeFilters);
    }

    return (
        <div className={styles.searchBar}>
            <form onSubmit={searchMonster} ref={formRef}>
                <div className={styles.container}>
                    <input type="search" name='term' className={styles.input} placeholder="Search a monster..." />
                    
                    <div className={styles.clear} onClick={clearSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 10l4 4m0 -4l-4 4" /></svg>
                    </div>
                    <div className={styles.filterButton} onClick={toggleFilters}>
                        {!activeFilters && <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-filter" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" /></svg>}
                        {activeFilters && <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-filter-filled" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 3h-16a1 1 0 0 0 -1 1v2.227l.008 .223a3 3 0 0 0 .772 1.795l4.22 4.641v8.114a1 1 0 0 0 1.316 .949l6 -2l.108 -.043a1 1 0 0 0 .576 -.906v-6.586l4.121 -4.12a3 3 0 0 0 .879 -2.123v-2.171a1 1 0 0 0 -1 -1z" stroke-width="0" fill="currentColor" /></svg>}
                    </div>
                    <div className={styles.icon} onClick={searchMonster}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                    </div>
                    <div className={styles.selectdiv}>
                        <select name='order' onChange={searchMonster}>
                            <option value="">Order by</option>
                            <option value="name">Name ASC</option>
                            <option value="-name">Name DSC</option>
                            <option value="size">Size ASC</option>
                            <option value="-size">Size DSC</option>
                        </select>
                    </div>
                </div>
                <div>
                    {activeFilters && <div className={styles.arrow}></div>}
                    <div hidden={!activeFilters} className={styles.filters}>
                        <button className={styles.applyFilters}>Apply</button>
                        <CRSlider />
                        <TypeSelect />
                    </div>
                </div>
                
            </form>
        </div>
    )
}