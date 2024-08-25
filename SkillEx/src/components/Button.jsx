import "./styles/Button.css";

export default function Button({
  bgColor,
  text,
  borderRadius = "0rem",
  textColor = "--text-color",
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: `var(${bgColor})`,
        borderRadius: borderRadius,
        color: `var(${textColor})`,
      }}
    >
      {text}
    </button>
  );
}
