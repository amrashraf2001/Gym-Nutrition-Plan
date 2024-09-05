import { Link } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";


const NavLinks = () => {
    return (
        <>
            <Link to={"/"} className="font-semibold link">HOME</Link>
            <a className="font-semibold link" href="#About">ABOUT</a>
            <a className="font-semibold link" href="#Services">SERVICES</a>
            <a className="font-semibold link" href="#Contact">CONTACT</a>
            <Link className="font-semibold link" to={"/login"}>LOGIN</Link>
        </>
    );
}


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }
    return (
        <header className="px-14 sticky top-0 z-[20] mx-auto flex-wrap w-full flex py-4 items-center justify-between text-[#fefefe] bg-[#007654]">
            <Link to={"/"} className="text-3xl font-bold">GYMNUT</Link>
            <nav className="w-1/3 justify-end flex">
                <div className="hidden md:flex justify-between w-full">
                    <NavLinks />
                </div>
                <div>
                    <GiHamburgerMenu className="text-3xl cursor-pointer md:hidden" onClick={toggleNavbar}
                    />
                </div>
            </nav>
            {isOpen && (
                <div className="flex flex-col basis-full items-center p-1 gap-1 md:hidden">
                    <NavLinks />
                </div>
            )}
        </header>
    )
}

export default Header