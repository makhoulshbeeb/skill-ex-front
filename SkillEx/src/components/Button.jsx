import "../styles/Button.css";

export default function Button({
    bgColor,
    text,
    textColor = "--text-color",
    borderRadius = "0rem",
    borderColor = '--primary-light',
    onClick,
}) {
    return (
        <button className="nav-button"
            onClick={onClick}
            style={{
                backgroundColor: `var(${bgColor})`,
                borderRadius: borderRadius,
                borderColor: `var(${borderColor})`,
                color: `var(${textColor})`,
            }}

        >
            {text}
        </button>
    );
}
