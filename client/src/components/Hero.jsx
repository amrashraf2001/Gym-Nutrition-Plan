import { Link } from "react-router-dom"
import './hero.css'
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <section className="h-full flex relative bg-hero-pattern bg-cover" id="Hero">

            <div className=" flex flex-col text-center items-center justify-center pt-28 md:pt-0 gap-6 px-14">
                <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -200 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-2  ">
                    <h2 className="font-extrabold text-7xl drop-shadow-xl text-center text-[#007654]">Gym Nutrition</h2>
                    <h3 className="font-extrabold text-6xl drop-shadow-xl text-center text-[#94e453]">Set your plan</h3>
                </motion.div>
                <motion.p
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 200 }}
                    transition={{ duration: 0.7 }}
                    className="text-xl font-medium text-[#154c3c]">
                    This website is designed for individuals interested in fitness, nutrition, and healthy living. It provides essential information on gym nutrition, healthy eating, and calorie management, catering to goals such as muscle building, weight loss, or maintaining a balanced diet. Users can access tailored plans, recipes, and advice to support their fitness journeys and improve their overall health.
                </motion.p>
                <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -200 }}
                    transition={{ duration: 0.9 }}
                >
                    <Link className="px-14 py-4 w-64 bg-[#007654] transition hover:bg-[#105642] text-[#fefefe] rounded-lg text-center items-center text-2xl overflow-hidden animation self-center" to={"/register"}></Link>
                </motion.div>
            </div>
        </section>
    )
}
export default Hero