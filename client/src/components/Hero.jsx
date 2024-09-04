import { Link } from "react-router-dom"
import './hero.css'
const Hero = () => { 
    return (
        <section className="h-full flex relative bg-hero-pattern bg-cover" id="Hero">

            <div className=" flex flex-col text-center items-center justify-center gap-6 px-14">
                <div className="flex flex-col gap-1">
                    <h2 className="font-extrabold text-5xl text-center text-[#007654]">Gym Nutrition</h2>
                    <h2 className="font-extrabold text-4xl text-center text-[#94e453]">Set your plan</h2>
                </div>
                <p className="text-xl font-medium text-[#154c3c]">Are you passionate about fitness, nutrition, and living a healthy lifestyle? You’ve come to the right place! This is your go-to destination for all things related to gym nutrition, healthy eating, calorie management, and more. Whether you're aiming to build muscle, shed pounds, or just maintain a balanced diet, we’ve got the resources and tips to help you reach your goals. Dive into our expertly crafted plans, delicious recipes, and tailored advice designed to fuel your workouts and your life.</p>
                <Link className="px-14 py-4 w-64 bg-[#007654] transition hover:bg-[#105642] text-[#fefefe] rounded-lg text-center items-center text-2xl overflow-hidden animation self-center" to={"/register"}></Link>
            </div>
        </section>
    )
}
export default Hero