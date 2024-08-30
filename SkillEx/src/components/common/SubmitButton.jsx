import "./styles/SubmitButton.css"

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SubmitButton({ text, isLoading }) {
    return (
        isLoading
            ? <button disabled className="submit-button"> <FontAwesomeIcon icon={faSpinner} spinPulse /> {text}</button>
            : <button className="submit-button">{text}</button>
    )
}
