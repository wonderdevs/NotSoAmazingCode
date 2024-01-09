//This component is used to display a card with information about a single monster.
import { Link } from 'react-router-dom'
import styles from './MonsterCard.module.css'
import placeholder from '../comingSoon.jpg'

export default function MonsterCard({monster}) {
    //The MonsterCard function component takes a monster prop, which is an object containing information about a monster.

    return (
        // It includes a Link component that links to the detail page for the monster, using the monster's slug as part of the URL. The Link component has a key prop with the monster's slug.
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