import { Link } from "react-router-dom";

export default function Header () {

    return (
        <>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <h1>Not So Amazing Monsters</h1>
                <div style={{display: 'flex', gap: '8px'}}>
                    <Link to='/'>Monsters</Link>
                    <Link to='/about'>About</Link>
                </div>
            </div>
            <hr/>
        </>
    )
}