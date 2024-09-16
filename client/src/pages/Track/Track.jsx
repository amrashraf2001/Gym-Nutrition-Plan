import { CiSearch } from "react-icons/ci";
import { UserContext } from "../../contexts/User"
import { useContext, useEffect, useState } from "react";

const Track = () => {
    const loggedData = useContext(UserContext);
    const page = 1;
    const limit = 6;
    const [foodItems, setFoodItems] = useState([])

    const searchFood = async (e) => {
        try {
            if (e.target.value === '') {
                setFoodItems([]);
            } else {
                fetch(`http://localhost:5000/user/foods/${e.target.value}?page=${page}&limit=${limit}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(loggedData.loggedUser)}`
                    }
                })
                    .then((res) => res.json())
                    .then(data => {
                        setFoodItems(data.food);
                    })
                    .catch(err => console.log(err))
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <section className="px-14 flex items-start justify-center py-8 ">
            <div className="w-full">
                <div className="relative w-full">
                    <input type="search" onChange={searchFood} autoComplete="off" className=" p-1 rounded-lg w-full h-16 pl-8 outline-none" id="search" placeholder="Search" />
                    <label htmlFor="search" className="absolute text-black text-2xl top-1/3 left-1 z-30"><CiSearch /></label>
                </div>
                <div className="w-full px-10 py-5 bg-gray-400 ">
                    {
                        foodItems.map((item) => {
                            return (
                                <p className="font-semibold text-2xl" key={item._id}>{item.name}</p>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Track