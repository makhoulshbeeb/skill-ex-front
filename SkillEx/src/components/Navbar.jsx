import "./styles/Navbar.css"

export default function Navbar() {
    return (
        <header>
            <div className="left">
                <nav>
                    <Link><div className="logo"></div></Link>
                    <Link>Home</Link>
                    <Link>Discover</Link>
                    <Link>Community</Link>
                    <Link>About Us</Link>
                    <Link>Contact Us</Link>
                </nav>
            </div>
        </header>
    )
}

