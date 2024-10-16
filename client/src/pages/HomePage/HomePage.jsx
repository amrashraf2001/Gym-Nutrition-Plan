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
                console.log(response.data.foods);
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
            <div className='randomTip w-1/2 px-10 py-5 rounded-md shadow-md bg-gradient-to-b from-[#398650] to-green-900'>
                <h1 className='text-3xl font-bold text-white'>Tip of the day</h1>
                <p className='text-xl p-5 text-neutral-100'>"{tip}"</p>
            </div>
            <div className="swiper w-full">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={3}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
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
                                <SwiperSlide className='p-5  object-fit h-full flex justify-center'><img className='min-h-96 h-96' width={400} height={400} src={food.img} alt={food.name}></img></SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </section>
    );
};

export default HomePage;
