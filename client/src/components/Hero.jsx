import { Link } from "react-router-dom"
import './hero.css'
const Hero = () => {
    return (
        <section className="h-full flex relative bg-hero-pattern bg-cover min-[390px]:" id="Hero">
          
            <div className="absolute top-36 right-0 flex flex-col text-left justify-center max-w-[700px] gap-6 px-14">
                <div className="flex flex-col text-left gap-1">
                    <h2 className="font-extrabold text-5xl text-[#007654]">Gym Nutrition</h2>
                    <h2 className="font-extrabold text-5xl text-[#9fb429]">Set your plan</h2>
                </div>
                <p className="text-lg font-medium text-[#154c3c]">Are you passionate about fitness, nutrition, and living a healthy lifestyle? You’ve come to the right place! This is your go-to destination for all things related to gym nutrition, healthy eating, calorie management, and more. Whether you're aiming to build muscle, shed pounds, or just maintain a balanced diet, we’ve got the resources and tips to help you reach your goals. Dive into our expertly crafted plans, delicious recipes, and tailored advice designed to fuel your workouts and your life.</p>
                <Link className="px-14 w-64 py-4 w-64 bg-[#007654] transition hover:bg-[#105642] text-[#fefefe] rounded-lg w-fit text-center items-center text-2xl overflow-hidden animation" to={"/register"}></Link>
            </div>
        </section>
    )
}
export default Hero