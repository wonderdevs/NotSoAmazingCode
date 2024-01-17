import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import styles from './RelatedMonsters.module.css';
import placeholder from '../comingSoon.jpg'

export default function RelatedMonsters ({monster}) {
    //This function shows related mosnters based on the CR of the monster you are viewing.
    const [related, setRelated] = useState([]);

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }
      

    useEffect(() => {
        fetch(`https://api.open5e.com/v1/monsters/?cr__range=${monster.cr-1},${monster.cr+1}`)
            .then(response => { return response.json() })
            .then((results) => {
                shuffleArray(results.results)
                setRelated(results.results.slice(0, 5))
            })
    },[monster]);

    return (<>
        Related Monsters (Similar CR)
        <ul className={styles.listContainer}>
            {related.map(monster => 
                <li key={monster.slug}>
                    <Link to={'/detail/'+monster.slug}>
                        <div className={styles.card}>
                            <div className={styles.profileImage}>
                                <img src={monster.img_main || placeholder} alt="profile" width={80} height={80} style={{borderRadius: '50%'}} />
                            </div>
                            <div className={styles.textContainer}>
                                <p className={styles.name}>{monster.name}</p>
                                <p className={styles.profile}>{monster.type}</p>
                            </div>
                        </div>
                    </Link>
                </li>
            )}
        </ul>
    </>)
}