import React from 'react';
import axios from '../../api/axios';
import { useEffect, useState,useContext } from 'react';
import { UserContext } from "../../contexts/User";

const HomePage = () => {
    const loggedData = useContext(UserContext)
    const [tip, setTip] = useState("");
    // console.log((Math.random()*100).toFixed())
    useEffect(() => {
        const fetchData = async () => {
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
        fetchData(); // Fetch the data when reset is true
    }, []);

    return (
        <div className=" h-full flex flex-col items-center p-4">
            <div className="randomTip p-10">
                {/* <h1 className="text-3xl font-bold">Random Tip</h1> */}
                <p className="text-lg p-5">{tip}</p>
            </div>
            <div className="swiper"></div>
        </div>
    );
}

export default HomePage;
