import { CiSearch } from "react-icons/ci";
import { UserContext } from "../../contexts/User"
import { useContext, useState } from "react";
import axios from "../../api/axios";
import Food from "../../components/Food";

const Track = () => {
    const loggedData = useContext(UserContext);
    const page = 1;
    const limit = 6;
    const [foodItems, setFoodItems] = useState([]);
    const [food, setFood] = useState(null);

    const searchFood = async (e) => {
        try {
            if (e.target.value === '') {
                setFoodItems([]);
            } else {
                const response = await axios.get(`/user/foods/${e.target.value}`, {
                    headers: {
                        'Authorization': `Bearer ${loggedData.loggedUser}`
                    },
                    params: {
                        page: page,
                        limit: limit
                    }
                })
                let data = await response.data;
                setFoodItems(data.food);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const displayItem = (id) => {
        console.log(id)
    }

    return (
        <section className="px-14 flex flex-col gap-3 items-start justify-center py-4 ">
            <div className="w-full relative">
                <div className="relative w-full">
                    <input type="search" onChange={searchFood} autoComplete="off" className=" dark:text-[#070F2B] text-xl p-1 rounded-lg w-full h-16 pl-8 placeholder:dark:text-[#070F2B] outline-none dark:bg-[#535C91]" id="search" placeholder="Search" />
                    <label htmlFor="search" className="absolute text-black dark:text-[#070F2B] text-2xl top-1/3 left-1 z-30"><CiSearch /></label>
                </div>
                {
                    foodItems.length !== 0 ?
                        <div className="w-full px-10 py-5 dark:bg-[#9290C3] dark:text-[#070F2B] bg-gray-400 rounded-md absolute">
                            {
                                foodItems.map((item) => {
                                    return (
                                        <p onClick={() => setFood(item)} className="font-semibold cursor-pointer text-2xl" key={item._id}>{item.name}</p>
                                    )
                                })
                            }
                        </div>
                        :
                        null
                }
            </div>
            {
                food !== null ? (
                    <Food food={food} />
                ) : null
            }
        </section>
    )
}

export default Track