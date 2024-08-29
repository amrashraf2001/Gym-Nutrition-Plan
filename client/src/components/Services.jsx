
const Services = () => {
  return (
    <section className=" flex-col space-y-10 px-14 py-14" id="Services">
                <h2 className="text-5xl font-extrabold text-center">SERVICES</h2>
        <div className="flex max-[768px]:justify-center max-[768px]:gap-8 gap-3 flex-wrap ">
            <div className="flex-col p-5  bg-lime-200 rounded-2xl shadow-xl shadow-[#007654] space-y-2 transition hover:shadow-[#007654] hover:bg-[#80AF81] hover:text-[#eeeed4]">
                <h2 className="text-3xl font-bold text-green-950 hover:text-green-950">Nutrition Plans</h2>
                <p className="text-xl font-medium w-[300px]">Our customized nutrition plans are tailored to your unique dietary needs, preferences, and lifestyle. After a detailed assessment, we create a plan that aligns with your goals, whether you're aiming for weight loss, muscle gain, improved energy, or overall health</p>
            </div>
            <div className="flex-col p-5  bg-lime-200 rounded-2xl shadow-xl shadow-[#007654] space-y-2 transition hover:shadow-[#007654] hover:bg-[#80AF81] hover:text-[#eeeed4]">
                <h2 className="text-3xl font-bold text-green-950 hover:text-green-950">Meal Planning
                </h2>
                <p className="text-xl font-medium w-[300px]">Take the guesswork out of meal preparation with our curated meal plans. Each plan includes easy-to-follow recipes, portion sizes, and grocery lists, ensuring you have everything you need for a week of healthy eating. We offer plans for various dietary preferences, including vegetarian, vegan, gluten-free, and more.</p>
            </div>
            <div  className="flex-col p-5  bg-lime-200 rounded-2xl shadow-xl shadow-[#007654] space-y-2 transition hover:shadow-[#007654] hover:bg-[#80AF81] hover:text-[#eeeed4]">
                <h2 className="text-3xl font-bold text-green-950 hover:text-green-950">Recipe Library</h2>
                <p className="text-xl font-medium w-[300px]">Access a vast collection of delicious, nutrient-dense recipes that cater to a wide range of dietary preferences and needs. Our recipe library is constantly updated to provide you with fresh ideas for meals that are both tasty and healthy.</p>
            </div>
            <div className="flex-col p-5  bg-lime-200 rounded-2xl shadow-xl shadow-[#007654] space-y-2 transition hover:shadow-[#007654] hover:bg-[#80AF81] hover:text-[#eeeed4]">
                <h2 className="text-3xl font-bold text-green-950 hover:text-green-950">Healthy Programs</h2>
                <p className="text-xl font-medium w-[300px]">We offer specialized programs to support various health conditions and goals, such as diabetes management, heart health, digestive wellness, and sports nutrition. These programs include targeted meal plans, educational resources, and ongoing support.</p>
            </div>    
        </div>
    </section>
  )
}

export default Services