//This component is used to navigate through pages of monster data.
import { useContext, useEffect, useState } from 'react';
import styles from './Pagination.module.css';
import { MonsterContext } from '../App';

const RESULTS_PER_PAGE = 20;

export default function Pagination() {
    //The Pagination function component uses the useContext hook to access the page, setPage, and setLoading functions from the MonsterContext. It also uses the useState hook to create state variables totalPages and current for storing the total number of pages and the current page number.
    const {page, setPage, setLoading} = useContext(MonsterContext);
    
    const [totalPages, setTotalPages] = useState(0);
    const [current, setCurrent] = useState(1);

    const getPage = (URL, number) => {
        //The getPage function is used to fetch a page of data from a given URL and update the page number. The setLoading function is called to display the loading spinner while the API request is being processed.
        setLoading(true)
        fetch(URL)
        .then(response => { return response.json() })
        .then(setPage)
        .finally(() => {
            setLoading(false)
            setCurrent(prev => prev + number)
        })
    }

    const getNextPage = () => {
        getPage(page.next, +1)
    }
    const getPrevPage = () => {
        getPage(page.previous, -1)
    }

    useEffect(() => {
        //The useEffect hook is used to calculate the total number of pages and reset the current page number when the page data changes. If the current page is the first page, the previous button is disabled. If the current page is the last page, the next button is disabled.
        setTotalPages(Math.ceil(page.count/RESULTS_PER_PAGE))
        if(!page.previous) setCurrent(1)
    }, [page])

    return(
        <div className={styles.pagination}>
            <div className={styles.buttonContainer}>
                <button className={styles.button} disabled={page.previous? false:true} onClick={()=>getPrevPage(page.previous)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-chevron-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 15l-3 -3l3 -3" /><path d="M21 12a9 9 0 1 0 -18 0a9 9 0 0 0 18 0z" /></svg>
                </button>
                {page.count > 0 &&
                    <>{current}/{totalPages}</>
                }
                {page.count === 0 &&
                    <>-</>
                }
                <button className={styles.button} disabled={page.next? false:true} onClick={()=>getNextPage(page.next)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-chevron-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 9l3 3l-3 3" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0z" /></svg>
                </button>
            </div>
        </div>
    )
}