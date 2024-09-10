import { NavLink, Link, useNavigate } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/User";




const NavLinks = () => {
    return (
        <>
            <NavLink to={"/"} className="font-semibold link">HOME</NavLink>
            <a className="font-semibold link" href="#About">ABOUT</a>
            <a className="font-semibold link" href="#Services">SERVICES</a>
            <a className="font-semibold link" href="#Contact">CONTACT</a>
            <NavLink className="font-semibold link" to={"/login"}>LOGIN</NavLink>
        </>
    );
}

const NavLinks2 = () => {
    const navigate = useNavigate()
    const loggedData = useContext(UserContext)
    const logout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token")
        loggedData.setLoggedUser(null);
        navigate("/login")
    }
    return (
        <>
            <NavLink to={"/"} className="font-semibold link">MY PLAN</NavLink>
            <NavLink className="font-semibold link">FOOD</NavLink>
            <NavLink className="font-semibold link">PLANS</NavLink>
            <NavLink className="font-semibold link">MY PROFILE</NavLink>
            <button onClick={logout} className="font-semibold link">LOGOUT</button>
        </>
    );
}


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }
    const loggedData = useContext(UserContext)

    return (
        <header className="px-14 sticky top-0 z-[20] mx-auto flex-wrap w-full flex py-4 items-center justify-between text-[#fefefe] bg-[#007654]">
            <Link to={"/"} className="text-3xl font-bold">GYMNUT</Link>
            <nav className="w-1/3 justify-end flex">
                <div className="hidden md:flex justify-between w-full">
                    {loggedData.loggedUser !== null ?
                        <NavLinks2 />
                        :
                        <NavLinks />}
                </div>
                <div>
                    <GiHamburgerMenu className="text-3xl cursor-pointer md:hidden" onClick={toggleNavbar}
                    />
                </div>
            </nav>
            {isOpen && (
                <div className="flex flex-col basis-full items-center p-1 gap-1 md:hidden">
                    {loggedData.loggedUser !== null ?
                        <NavLinks2 />
                        :
                        <NavLinks />}
                </div>
            )}
        </header>
    )
}

export default Header