import { useContext, useEffect, useState } from 'react';
import axios from '../../api/axios';
import { UserContext } from '../../contexts/User';
import Markdown from 'react-markdown'

const apiKey = 'AIzaSyCIC9WTKyp1qLm6gd4P2uIsBLuf-yym9OI';
const profileDataURL = "/user/profile";

const Plan = () => {
    const loggedData = useContext(UserContext);
    const [plan, setPlan] = useState('');
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(profileDataURL, {
                    headers: {
                        "Authorization": `Bearer ${loggedData.loggedUser}`,
                    },
                });
                const userData = response.data;
                setProfile(userData);
                console.log(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchProfile();
    }, [loggedData.loggedUser]);

    const exponentialBackoff = async (fn, retries = 5, delay = 1000) => {
        try {
            return await fn();
        } catch (error) {
            if (retries > 0 && error.response?.status === 429) {
                const retryAfter = error.response.headers['retry-after'];
                const waitTime = retryAfter ? retryAfter * 1000 : delay;
                console.warn(`429 Too Many Requests - retrying after ${waitTime / 1000} seconds... attempts left: ${retries}`);

                await new Promise((resolve) => setTimeout(resolve, waitTime));
                return exponentialBackoff(fn, retries - 1, delay * 2); // Increase delay exponentially if no 'Retry-After'
            } else {
                throw error;
            }
        }
    };

    useEffect(() => {
        const generatePlan = async () => {
            if (Object.keys(profile).length > 0) {
                try {
                    const fetchPlan = async () => {
                        return axios.post(
                            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${apiKey}`,
                            {
                                "contents": [{
                                    "parts": [{
                                        "text": `Create a personalized nutrition and workout plan for a ${profile.user.age}-year-old with a weight of ${profile.user.weight}kg, height of ${profile.user.height} BMI of 24.7. The goal is weight_loss and the activity level is hardworker.`
                                    }]
                                }]
                            },
                            {
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }
                        );
                    };

                    // Call the function with exponential backoff for retry handling
                    const response = await exponentialBackoff(fetchPlan);

                    setPlan(response.data.candidates[0].content.parts[0].text); // Adjust this if needed
                    console.log(response)
                } catch (error) {
                    console.error("Error generating plan:", error.response || error);
                }
            }
        };
        generatePlan();
    }, []);

    return (
        <div>
            <h1>Personalized Plan</h1>
            <p><Markdown>{plan}</Markdown></p>
        </div>
    );
};

export default Plan;