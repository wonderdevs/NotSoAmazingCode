import { useEffect, useState } from 'react';
import styles from './Pagination.module.css';

const RESULTS_PER_PAGE = 20;

export default function Pagination({page, onPrev, onNext}) {
    const [totalPages, setTotalPages] = useState(0);
    const [current, setCurrent] = useState(1);

    const getNextPage = () => {
        setCurrent(prev => prev + 1)
        onNext(page.next)
    }
    const getPrevPage = () => {
        setCurrent(prev => prev - 1)
        onPrev(page.previous)
    }

    useEffect(() => {
        setTotalPages(Math.ceil(page.count/RESULTS_PER_PAGE))
        if(!page.previous) setCurrent(1)
    }, [page])

    return(
        <div className={styles.pagination}>
            <div className={styles.buttonContainer}>
                <button className={styles.button} disabled={page.previous? false:true} onClick={()=>getPrevPage(page.previous)}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 15l-3 -3l3 -3" /><path d="M21 12a9 9 0 1 0 -18 0a9 9 0 0 0 18 0z" /></svg>
                </button>
                {page.count > 0 &&
                    <>{current}/{totalPages}</>
                }
                {page.count === 0 &&
                    <>-</>
                }
                <button className={styles.button} disabled={page.next? false:true} onClick={()=>getNextPage(page.next)}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 9l3 3l-3 3" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0z" /></svg>
                </button>
            </div>
        </div>
    )
}