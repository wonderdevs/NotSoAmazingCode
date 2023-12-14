import styles from './TypeSelect.module.css';

export default function TypeSelect() {

    return(
        <div style={{display: 'flex', alignItems: 'start'}}>
            <div className={styles.checkboxContainer}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-atom" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12v.01" /><path d="M19.071 4.929c-1.562 -1.562 -6 .337 -9.9 4.243c-3.905 3.905 -5.804 8.337 -4.242 9.9c1.562 1.561 6 -.338 9.9 -4.244c3.905 -3.905 5.804 -8.337 4.242 -9.9" /><path d="M4.929 4.929c-1.562 1.562 .337 6 4.243 9.9c3.905 3.905 8.337 5.804 9.9 4.242c1.561 -1.562 -.338 -6 -4.244 -9.9c-3.905 -3.905 -8.337 -5.804 -9.9 -4.242" /></svg>
                TYPE
            </div>
            <div className={styles.typeGrid}>
                <label><input name="type" value='Elemental' type='checkbox' />Elemental</label>
                <label><input name="type" value='Dragon' type='checkbox' />Dragon</label>
                <label><input name="type" value='Construct' type='checkbox' />Construct</label>
                <label><input name="type" value='Beast' type='checkbox' />Beast</label>
                <label><input name="type" value='Undead' type='checkbox' />Undead</label>
                <label><input name="type" value='Humanoid' type='checkbox' />Humanoid</label>
                <label><input name="type" value='Aberration' type='checkbox' />Aberration</label>
                <label><input name="type" value='Celestial' type='checkbox' />Celestial</label>
                <label><input name="type" value='Fey' type='checkbox' />Fey</label>
                <label><input name="type" value='Fiend' type='checkbox' />Fiend</label>
                <label><input name="type" value='Giant' type='checkbox' />Giant</label>
                <label><input name="type" value='Monstrosity' type='checkbox' />Monstrosity</label>
                <label><input name="type" value='Ooze' type='checkbox' />Ooze</label>
                <label><input name="type" value='Plant' type='checkbox' />Plant</label>
            </div>
        </div>
    );
}