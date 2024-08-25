import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="px-14 flex py-4 items-center justify-between text-white bg-[#9fb429] min-[320px]:space-x-16">
            <Link to={"/"} className="text-3xl font-bold">GYMNUT</Link>
            <nav className="flex items-center justify-center gap-16 text-1xl">
                <Link to={"/"} className="font-semibold">HOME</Link>
                <Link className="font-semibold">ABOUT</Link>
                <Link className="font-semibold">SERVICES</Link>
                <Link className="font-semibold">CONTACT</Link>
                <Link className="font-semibold" to={"/login"}>LOGIN</Link>
            </nav>
        </header>
    )
}

export default Header