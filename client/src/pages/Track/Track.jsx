import { CiSearch } from "react-icons/ci";
import { UserContext } from "../../contexts/User"
import { useContext } from "react";
import axios from '../../api/axios'

const Track = () => {

    const loggedData = useContext(UserContext);
    const page = 1;
    const limit = 3;
    const searchFood = async (e) => {
        try {
            console.log(json.parse(loggedData.loggedUser))
            const response = await axios.get(`/user/foods/${e.target.value}`, {
                params: {
                    page: page,
                    limit: limit
                },
                headers: {
                    'Authorization': `Bearer ${loggedData.loggedUser.token}`
                }
            })
            let food = response.food
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <section className="px-14 flex items-start justify-center py-8 ">
            <div className="relative w-full">
                <input type="search" onChange={searchFood} className=" p-1 rounded-lg w-full h-16 pl-8 outline-none" id="search" placeholder="Search" />
                <label htmlFor="search" className="absolute text-black text-2xl top-1/3 left-1 z-30"><CiSearch /></label>
            </div>
        </section>
    )
}

export default Track