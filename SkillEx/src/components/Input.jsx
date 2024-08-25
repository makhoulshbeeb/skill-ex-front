import './styles/Input.css'

export default function Input({ name, id, placeholder, change }) {
    return (
        <input name={name} id={id} placeholder={placeholder} onChange={change} />
    );
}