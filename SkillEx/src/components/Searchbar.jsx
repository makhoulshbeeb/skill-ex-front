import '../styles/Searchbar.css'

export default function Searchbar({ name, id, placeholder, change }) {
    return (
        <input name={name} className='search-bar' id={id} placeholder={placeholder} onChange={change} />
    );
}