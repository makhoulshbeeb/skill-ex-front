
export default function AuthForm({ type, setType }) {
    const variant = type == "Log in";
    return (
        <div className="form-container">
            <h2 className="title">{type}</h2>
            <hr />
            <div className="input-form">

            </div>
            {variant && <a>Forgot password?</a>}
            <Button></Button>
            {
                variant
                    ? <div className="have-account">Don't have an account?<span onClick={() => setType("Log in")}>Log in</span></div>
                    : <div className="have-account">Already have an account?<span onClick={() => setType("Sign up")}>Sign up</span></div>
            }
        </div>
    )
}
