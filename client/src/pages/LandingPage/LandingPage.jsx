import Hero from "../../components/Hero"
import About from "../../components/About"
import Services from "../../components/Services"
import Contact from "../../components/Contact"
import { FaArrowAltCircleUp } from "react-icons/fa";

const LandingPage = () => {
    return (
        <>
            <a href="#Hero" className="absolute right-10 bottom-10 text-4xl z-50 transition hover:-translate-y-2 text-[#346859] glass rounded-full  "><FaArrowAltCircleUp /></a>
            <Hero />
            <About />
            <Services />
            <Contact />
        </>

    )
}

export default LandingPage