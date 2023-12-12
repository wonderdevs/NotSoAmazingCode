import SearchBar from './SearchBar';

export default function Header () {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between' }}><h1>Not So Amazing Monsters</h1> <SearchBar /> </div>
    )
}