import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import axios from "../api/axios"
import { UserContext } from "../contexts/User"


const getProfileUrl = "/user/profile"

const Sidebar = ({ setShowHide, setData, data }) => {
    const loggedData = useContext(UserContext);



    const logout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token")
        loggedData.setLoggedUser(null);
        navigate("/login")
    }

    return (
        <aside className=" bg-[#9e9583] flex flex-col p-4 items-center">
            <div className="flex flex-col gap-6 items-center text-xl font-semibold">
                <div className="avatar">
                    <div className="w-24 rounded-full">
                    <img  src={data.profilePicture} alt={`${data.username} Profile Picture`} />
                    </div>
                    <input
                        type="file"
                        className="file-input file-input-bordered file-input-success w-full max-w-xs" />
                </div>
                <h2>{data.username}</h2>
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

