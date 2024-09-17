import { CiSearch } from "react-icons/ci";
import { UserContext } from "../../contexts/User"
import { useContext, useState } from "react";
import axios from "../../api/axios";

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
                        'Authorization': `Bearer ${JSON.parse(loggedData.loggedUser)}`
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
        <section className="px-14 flex flex-col items-start justify-center py-4 ">
            <div className="w-full relative">
                <div className="relative w-full">
                    <input type="search" onChange={searchFood} autoComplete="off" className=" p-1 rounded-lg w-full h-16 pl-8 outline-none" id="search" placeholder="Search" />
                    <label htmlFor="search" className="absolute text-black text-2xl top-1/3 left-1 z-30"><CiSearch /></label>
                </div>
                {
                    foodItems.length !== 0 ?
                        <div className="w-full px-10 py-5 bg-gray-400 rounded-md absolute">
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
            <div className="w-52 py-8 flex flex-wrap space-y-2">
                <div className="w-full h-52 bg-white"></div>
                <h2 className="font-semibold text-xl">Food Name (100Cal)</h2>
                <div className="w-1/2 py-3">
                    <p>Protine</p>
                    <p>50</p>
                </div>
                <div className="w-1/2 py-3">
                    <p>Fats</p>
                    <p>20</p>
                </div>
                <div className="w-1/2 py-3">
                    <p>Carbs</p>
                    <p>30</p>
                </div>
                <input className="px-2 py-1 rounded-md" type="number" placeholder="َQuantity in Gms" />
                <button className="px-2 py-1 bg-[#007654] text-xl font-bold text-white rounded-lg">Track This Food</button>
            </div>
        </section>
    )
}

export default Track