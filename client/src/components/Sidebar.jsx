import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/User"
import { CiEdit } from "react-icons/ci";

const getProfileUrl = "/user/profile"

const Sidebar = ({ setShowHide, setData, data,setUsernameDisplay,usernameDisplay }) => {

    const loggedData = useContext(UserContext);

    
    

    const logout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token")
        loggedData.setLoggedUser(null);
        navigate("/login")
    }

    const toggleUser = ()=>{
        setUsernameDisplay(prev => !prev)
        setShowHide(true)
    }
    console.log(usernameDisplay)
    
    return (
        <aside className=" bg-[#9e9583] flex flex-col p-4 items-center ">
            <div className="flex flex-col gap-6 items-center text-xl font-semibold">
                <div className="avatar">
                    <div className="w-24 rounded-full border-2 border-black">
                        <img className=" rounded-full" src={data.profilePicture} alt={`${data.username} Profile Picture`} />
                    </div>
                </div>
                <div className="flex gap-3">
                    <h2 className={`${usernameDisplay? "hidden": "block"} font-bold`}>{data.username}</h2>
                    <input
                        value={data.username}
                        type="text"
                        onChange={(e) => {
                            setData((prev) => ({ ...prev, userName: e.target.value })); // Update the state with input value
                        }}
                        className={`${usernameDisplay? "block": "hidden"} rounded-lg w-48 p-2 hover:border-2 hover:border-black transition-all ease-in-out`}
                    />
                    <div
                        onClick={toggleUser} // Toggle input when button is clicked
                        className="p-1 hover:text-white shadow-md rounded-lg transition-all cursor-pointer"
                    >
                        <CiEdit />
                    </div>
                </div>
                <hr className="border-2 w-40 m-auto border-black my-2" />
            </div>
            <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col space-y-2">
                    <Link className="text-xl hover:text-white transition-all duration-200 ease-in-out hover:shadow-md rounded-lg self-center p-2" to={"/Myprofile"}>Information</Link>
                    <Link className="text-xl hover:text-white transition-all duration-200 ease-in-out hover:shadow-md rounded-lg self-center p-2" to={"/Myprofile/MyPlans"}>My Plans</Link>
                </div>
                <button onClick={logout} className="font-semibold link text-xl hover:text-white transition-all duration-200 ease-in-out hover:shadow-md rounded-lg self-center p-2">LOGOUT</button>
            </div>
        </aside>


    )
}

export default Sidebar

