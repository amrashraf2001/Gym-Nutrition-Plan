import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className="px-5 flex items-center justify-between  text-neutral-950 border-b-neutral-800 border-b-2 min-[320px]:space-x-16">
            <h1>GN</h1>
            <nav className="m-8 flex items-center justify-center gap-6 text-1xl">
                <Link>Home</Link>
                <Link>About</Link>
                <Link>Dashboard</Link>
                <Link>Contact us</Link>
                <Link to={"/login"}>Login</Link>
            </nav>
        </div>
    )
}

export default Header