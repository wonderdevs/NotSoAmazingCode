import { Link } from 'react-router-dom'
import styles from './MonsterCard.module.css'
import placeholder from '../comingSoon.jpg'

export default function MonsterCard({monster}) {

    return (
        <Link key={monster.slug} to={'/detail/'+monster.slug} className='cardLink'>
            <div className={styles.card}>
                <p className={styles.name}>{monster.name}</p>

                <div className={styles.cover}>
                <img src={monster.img_main || placeholder} alt="cover" width={'100%'} />
                    <div className={styles.rating}>{monster.hit_points}</div>
                </div>

            </div>
        </Link>
    )
}