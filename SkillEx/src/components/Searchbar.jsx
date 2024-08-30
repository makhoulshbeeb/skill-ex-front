import '../styles/Searchbar.css'

export default function Searchbar({ placeholder, change }) {
    return (
        <input className='search-bar' placeholder={placeholder} onChange={change} />
    );
}