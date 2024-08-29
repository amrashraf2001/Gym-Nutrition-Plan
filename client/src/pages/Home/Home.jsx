import { Link } from "react-router-dom"
import Hero from "../../components/Hero"
import About from "../../components/About"
import Services from "../../components/Services"
import Contact from "../../components/Contact"
import { FaArrowAltCircleUp } from "react-icons/fa";

const Home = () => {
    return (
        <>
        <a href="#Hero" className="absolute right-10 bottom-10 text-3xl z-50 transition hover:-translate-y-2 text-[#007654] rounded-full "><FaArrowAltCircleUp /></a>
        <Hero/>
        <About/>
        <Services/>
        <Contact/>
        </>
        
    )
}

export default Home