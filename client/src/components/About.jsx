import about1 from '../assets/about1.png'
import about2 from '../assets/about2.png'

const About = () => {
    return (
        <section className="flex flex-col space-y-10 px-14 pt-14 pb-40" id="About">
            <h2 className="text-5xl font-extrabold text-center">ABOUT US</h2>
            <div>
                <p className="text-3xl font-medium text-center p-3 transition-all text-green-950  hover:shadow-[#007654] hover:shadow-lg hover:rounded-2xl">Welcome to GYMNUT, your trusted partner in achieving a healthier lifestyle through balanced nutrition and personalized meal planning. We believe that good food is the foundation of a happy, healthy life, and we're here to guide you on your journey to wellness.</p>
            </div>
            <div className="flex gap-12 items-center md:flex-row-reverse flex-col ">
                <img src={about1} className="max-h-80 shadow-lg shadow-[#007654] rounded-3xl max-w-[20rem]" />
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold">Our Mission</h2>
                    <p className=" text-green-950 text-2xl font-medium p-3 transition-all  hover:shadow-[#007654] hover:shadow-lg hover:rounded-2xl">At GYMNUT, our mission is to make healthy eating accessible, enjoyable, and sustainable. We understand that everyone's nutritional needs and preferences are unique, which is why we offer personalized plans that cater to your specific goals, whether it's weight management or simply adopting a healthier lifestyle.</p>
                </div>
            </div>

            <div className="flex gap-12 items-center flex-col md:flex-row  ">
                <img src={about2} className="max-h-80 shadow-lg shadow-[#007654] rounded-3xl max-w-[20rem]" />
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold">Why Choose Us?</h2>
                    <p className=" text-green-950 text-2xl font-medium p-3 transition-all  hover:shadow-[#007654] hover:shadow-lg hover:rounded-2xl">We are committed to providing you with the tools, resources, and knowledge to make informed decisions about your diet and nutrition. Our plans are not just about food; they're about building lasting habits that contribute to your overall well-being. With GYMNUT, you can take control of your health with confidence and ease.</p>
                </div>
            </div>
        </section>
    )
}

export default About