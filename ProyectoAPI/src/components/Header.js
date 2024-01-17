import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Header () {

    return (
        // This is the header component. It is used to display the title of the website and the navigation bar.
        <>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <h1>Not So Amazing Monsters</h1>
                <SearchBar />
                <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                    <Link to='/'>Monsters</Link>
                    <Link to='/documents'>Documents</Link>
                    <Link to='/about'>About</Link>
                </div>
            </div>
            <hr/>
        </>
    )
}