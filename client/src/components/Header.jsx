import { Link } from "react-router-dom"


const Header = () => {
    return (
        <header className="px-14 flex py-4 items-center justify-between text-[#fefefe] bg-[#9fb429] min-[320px]:space-x-16">
            <Link to={"/"} className="text-3xl font-bold">GYMNUT</Link>
            <nav className="flex items-center justify-center gap-16 text-1xl">
                <Link to={"/"} className="font-semibold link">HOME</Link>
                <a className="font-semibold link" href="#About">ABOUT</a>
                <a className="font-semibold link" href="#Services">SERVICES</a>
                <a className="font-semibold link" href="#Contact">CONTACT</a>
                <Link className="font-semibold link" to={"/login"}>LOGIN</Link>
            </nav>
        </header>
    )
}

export default Header