import SearchBar from './SearchBar';

export default function Header () {

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Not So Amazing Monsters</h1>
                <SearchBar />
            </div>
            <hr/>
        </>
    )
}