import { Link } from 'react-router-dom'
import styles from './VideoGameCard.module.css'

export default function VideoGameCard({game}) {

    return (
        <Link key={game.id} to={'/game/'+game.id} className='cardLink'>
            <div className={styles.card}>
                <p className={styles.name}>{game.name}</p>

                <div className={styles.cover}>
                    <img src={game.background_image} alt="cover" width={'100%'} />
                    <div className={styles.rating}>{game.rating}<sub>/5</sub></div>
                </div>

                <div className={styles.tags}>
                    {game.genres.map((genre) => 
                        <small>{genre.name}</small>
                    )}
                </div>

            </div>
        </Link>
    )
}