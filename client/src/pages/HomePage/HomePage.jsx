import React from 'react';
import axios from '../../api/axios';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from "../../contexts/User";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { Autoplay } from 'swiper/modules';

const HomePage = () => {
    const loggedData = useContext(UserContext);
    const [tip, setTip] = useState("");
    const [foods, setFoods] = useState([]);
    // console.log((Math.random()*100).toFixed())
    useEffect(() => {
        const fetchTip = async () => {
            try {
                const response = await axios.get("/user/randomTip", {
                    headers: {
                        Authorization: `Bearer ${loggedData.loggedUser}`,
                    },
                });
                setTip(response.data.randomTip.tip);
            } catch (err) {
                console.log(err);
            }
        };
        const feachFood = async () => {
            try {
                const response = await axios.get("/user/foods/page/1?limit=52", {
                    headers: {
                        Authorization: `Bearer ${loggedData.loggedUser}`,
                    },
                });
                // console.log(response.data.foods);
                setFoods(response.data.foods);
            } catch (err) {
                console.log(err);
            }
        }
        feachFood();
        fetchTip(); // Fetch the data when reset is true
        const intervalId = setInterval(fetchTip, 10000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <section className='container mx-auto px-8 sm:px10 md:px-12 lg:px-14 py-3 flex flex-col gap-4 items-center'>
            <div className='randomTip w-[60%] px-10 py-5 rounded-md shadow-md bg-gradient-to-b from-[#398650] to-green-900'>
                <h1 className='text-3xl font-bold text-white'>Tip of the day</h1>
                <p className='text-xl p-5 text-neutral-100'>"{tip}"</p>
            </div>
            <div className="swiper w-full">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={3}
                    // onSlideChange={() => console.log('slide change')}
                    // onSwiper={(swiper) => console.log(swiper)}
                    className="w-full"
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false
                    }}
                >
                    {
                        foods.map((food) => {
                            return (
                                <SwiperSlide className='p-10 object-fit h-full flex justify-center' key={food._id}>
                                    <div className='card flex max-w-[300px] h-[530px] flex-col shadow-lg bg-orange-100 dark:bg-[#1A1A1A]'>
                                        <img className='h-[300px] rounded-t-2xl bg-white' width={300} height={300} src={food.img} alt={food.name} />
                                        <div className='flex flex-col gap-4 items-start p-5'>
                                            <h2 className='card-title'>{food.name} for 100G</h2>
                                            <div className="grid grid-cols-2 gap-4 w-full pr-4">
                                                <div className="col-span-1 flex flex-col items-start">
                                                    <p>Protein</p>
                                                    <p>{food.protein}g</p>
                                                </div>
                                                <div className="col-span-1 flex flex-col items-end">
                                                    <p>calories</p>
                                                    <p>{food.calories}Kcal</p>
                                                </div>
                                                <div className="col-span-1 flex flex-col items-start">
                                                    <p>Fats</p>
                                                    <p>{food.fats}g</p>
                                                </div>
                                                <div className="col-span-1 flex flex-col items-end">
                                                    <p>Carbs</p>
                                                    <p>{food.carbs}g</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </section>
    );
};

export default HomePage;
