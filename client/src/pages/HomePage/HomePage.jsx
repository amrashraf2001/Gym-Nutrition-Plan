import React from 'react';
import axios from '../../api/axios';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from "../../contexts/User";

const HomePage = () => {
    const loggedData = useContext(UserContext);
    const [tip, setTip] = useState("");

    useEffect(() => {
        const fetchData = async () => {
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
        fetchData();
    }, []);

    return (
        <section className='container mx-auto px-8 sm:px10 md:px-12 lg:px-14 py-3 flex flex-col gap-4 items-center'>
            <div className='randomTip p-10 rounded-md shadow-md bg-gradient-to-b from-[#398650] to-green-900'>
                <h1 className='text-3xl font-bold text-white'>Tip of the day</h1>
                <p className='text-lg p-5 text-neutral-100'>{tip}</p>
            </div>
        </section>
    );
};

export default HomePage;
