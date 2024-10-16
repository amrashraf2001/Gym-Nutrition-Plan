import React from 'react';
import axios from '../../api/axios';
import { useEffect, useState,useContext } from 'react';
import { UserContext } from "../../contexts/User";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { Autoplay} from 'swiper/modules';

const HomePage = () => {
    const loggedData = useContext(UserContext)
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
                // setData(response.data.user);

            } catch (err) {
                console.log(err);
            }
        };
        const feachFood = async () => {
            try {
                const response = await axios.get("/user/foods/page/1?limit=52",{
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
    }, []);

    return (
        <div className=" h-full flex flex-col items-center p-4">
            <div className="randomTip p-10">
                {/* <h1 className="text-3xl font-bold">Random Tip</h1> */}
                <p className="text-lg p-5">{tip}</p>
            </div>
            <div className="swiper w-full">
            <Swiper
            spaceBetween={10}
            slidesPerView={1}
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
        </div>
    );
}

export default HomePage;
