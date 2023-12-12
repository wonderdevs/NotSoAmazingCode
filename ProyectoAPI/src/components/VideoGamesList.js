
import VideoGameCard from './VideoGameCard';
import styles from './VideoGamesList.module.css';

export default function VideoGamesList ({page}) {
    console.log('page:',page)
    return (
        <div>
            <div className={styles.gameList}>
                {page && page.results.map(monster => 
                    <VideoGameCard key={monster.name} game={monster} />
                )}
                {page && page.count === 0 &&
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-windsock" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 3v18" /><path d="M6 11l12 -1v-4l-12 -1" /><path d="M10 5.5v5" /><path d="M14 6v4" /><path d="M4 21h4" /></svg>
                        No items found
                    </>
                }
            </div>
        </div>
    )
}