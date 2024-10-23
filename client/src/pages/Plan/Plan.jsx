import { useContext, useEffect, useState } from 'react';
import axios from '../../api/axios';
import { UserContext } from '../../contexts/User';

const apiKey = 'AIzaSyCIC9WTKyp1qLm6gd4P2uIsBLuf-yym9OI';
const profileDataURL = "/user/profile";
const userBMIURL = "/user/calculateBMI";

const extractMacronutrients = (planText) => {
    const macroData = {};
    let inMacroSection = false;

    planText.split('\n').forEach((line) => {
        if (line.startsWith('Macronutrients:')) {
            inMacroSection = true;
        } else if (inMacroSection) {
            const parts = line.split(':');
            if (parts.length === 2) {
                macroData[parts[0].trim()] = parseFloat(parts[1].trim());
            }
        }
    });

    return macroData;
};
const Plan = () => {
    const loggedData = useContext(UserContext);
    const [plan, setPlan] = useState(null);
    const [profile, setProfile] = useState(null);
    const [planData, setPlanData] = useState(null)
    const [bmi, setBmi] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [macroData, setMacroData] = useState(null);

    useEffect(() => {
        const fetchBMI = async () => {
            try {
                const response = await axios.get(userBMIURL, {
                    headers: {
                        "Authorization": `Bearer ${loggedData.loggedUser}`,
                    },
                });
                const userBMI = await response.data;
                setBmi(userBMI.BMI);
                console.log(userBMI.BMI);
            } catch (error) {
                console.error("Error fetching user BMI:", error);
            }
        };
        fetchBMI();
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(profileDataURL, {
                    headers: {
                        "Authorization": `Bearer ${loggedData.loggedUser}`,
                    },
                });
                const userData = await response.data;
                setProfile(userData);
                console.log(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        const generatePlan = async () => {
            if (profile && profile.user) { // Ensure profile and profile.user are defined
                try {
                    const fetchPlan = async () => {
                        return axios.post(
                            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${apiKey}`,
                            {
                                "contents": [{
                                    "parts": [{
                                        "text": `Create a personalized nutrition and workout plan for a ${profile.user.age}-year-old with a weight of ${profile.user.weight}kg, height of ${profile.user.height}cm, BMI of ${bmi}. The goal is ${planData?.goal} and the activity level is ${planData?.activityLevel} this plan for ${planData?.duration}. i want the result be text without any symbols or any markdown symbols or any quotes sympol and the out put must be like this sample 
                                        Phase 1:Initial Setup:
                                        some content here like:
                                        Nutrition: some content here
                                        Calorie Deficit: some content here
                                        Macronutrient Ratio: some content here
                                        Protein Intake: some content here
                                        Carbohydrates: some content here
                                        Healthy Fats: some content here
                                        Hydration: some content here
                                        Meal Timing: some content here
                                        Example Meal Plan (adjust portions based on calorie goals):
                                        Breakfast: some content here
                                        Lunch: some content here
                                        Dinner: some content here
                                        Snack: some content here
                                        Workout: some content here
                                        Workout Example: some content here
                                        Phase 2:
                                        some content here like:
                                        Nutrition: some content here
                                        Workout: some content here
                                        Progressive Overload:: some content here
                                        Important Considerations:
                                        some important considerations here like:
                                        Sleep:
                                        Stress Management:
                                        Supplements:
                                        Consistency is Key:
                                        Disclaimer:
                                        and at the end of the plan i want the macronutrients in a structured format, using clear labels and units for macronutrients. Here's an example:
                                        Macronutrients:
                                        - Calories: 2000 kcal
                                        - Protein: 150 g
                                        - Carbohydrates: 250 g
                                        - Fats: 50 g
                                        `
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
                    const response = await exponentialBackoff(fetchPlan);
                    setMacroData(extractMacronutrients(response.data.candidates[0].content.parts[0].text));
                    const parsedPlan = parsePlanToJSON(response.data.candidates[0].content.parts[0].text);
                    setPlan(parsedPlan);
                    console.log(response);
                } catch (error) {
                    console.error("Error generating plan:", error.response || error);
                }
            }
        };
        if (planData) {
            generatePlan();
        }
    }, [planData, profile, bmi]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const planData = {
            goal: e.target[0].value,
            activityLevel: e.target[1].value,
            duration: e.target[2].value
        };
        setPlanData(planData);
        console.log(planData);
        setIsLoading(true)
    }

    useEffect(() => {
        console.log(plan);
    }, [plan])

    const parsePlanToJSON = (planText) => {
        // Convert the planText into JSON-like structure
        const lines = planText.split('\n');
        const planObject = {
            phases: [],
            importantConsiderations: []
        };

        let currentPhase = null;
        let inImportantConsiderations = false;

        lines.forEach((line) => {
            // Check for phase titles
            if (line.startsWith('Phase')) {
                // Start a new phase object
                currentPhase = { title: line, content: [] };
                planObject.phases.push(currentPhase);
                inImportantConsiderations = false; // Not in important considerations anymore
            }
            // Check for "Important Considerations"
            else if (line.startsWith('Important Considerations')) {
                inImportantConsiderations = true;
            }
            // Check if we're in the important considerations section
            else if (inImportantConsiderations && line) {
                planObject.importantConsiderations.push(line);
            }
            // Add content to the current phase if it's not empty
            else if (currentPhase && line) {
                currentPhase.content.push(line);
            }
        });
        return planObject;
    };

    return (
        <section className='container mx-auto px-8 sm:px10 md:px-12 lg:px-14 py-3 flex flex-col gap-4'>
            <div className='flex flex-col gap-4 items-center'>
                <h1 className='text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold'>Create your custom nutrition plan</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3 md:flex-row md:gap-2 w-full justify-around p-3 rounded-md dark:from-neutral dark:to-neutral bg-gradient-to-b from-[#398650] to-green-900 items-center'>
                    <h3 className='font-semibold text-xl md:text-2xl text-white dark:text-current'>Enter these information</h3>
                    <select className="select select-success w-full max-w-xs">
                        <option disabled selected>Pick your your goal</option>
                        <option value={"weight loss"}>weight loss</option>
                        <option value={"muscle gain"}>muscle gain</option>
                        <option value={"Maintain my current fit"}>Maintain my current fit</option>
                    </select>
                    <select className="select select-success w-full max-w-xs">
                        <option disabled selected>Pick activity level</option>
                        <option value={"Sedentary"}>Sedentary</option>
                        <option value={"Lightly active"}>Lightly active</option>
                        <option value={"Moderately active"}>Moderately active</option>
                        <option value={"Very active"}>Very active</option>
                    </select>
                    <select className="select select-success w-full max-w-xs">
                        <option disabled selected>Pick your plan duration</option>
                        <option value={"1 week"}>1 week</option>
                        <option value={"2 weeks"}>2 weeks</option>
                        <option value={"3 weeks"}>3 weeks</option>
                        <option value={"1 month"}>1 month</option>
                        <option value={"2 months"}>2 months</option>
                        <option value={"3 months"}>3 months</option>
                    </select>
                    <button className="btn btn-accent dark:btn-success">Generate</button>
                </form>
            </div>
            {plan ? (
                <div className="flex flex-col gap-4 items-center">
                    <h1 className='text-3xl font-bold'>Personalized Plan</h1>
                    <div className='dark:from-neutral dark:to-neutral bg-gradient-to-b from-[#398650] to-green-900 shadow-md space-y-3 rounded-md p-4'>

                        <div className='dark:bg-slate-400 bg-green-50 flex flex-col p-2 rounded-md'>
                            <h2 className='text-neutral-700 text-xl md:text-2xl font-semibold dark:text-grey-200'>Client Profile</h2>
                            <ul className='text-neutral-700 text-lg dark:text-grey-200'>
                                <li>Name: {profile.user.userName}</li>
                                <li>
                                    Age: {profile.user.age} years
                                </li>
                                <li>Gender: {profile.user.gender}</li>
                                <li>
                                    Weight: {profile.user.weight} kg
                                </li>
                                <li>
                                    Height: {profile.user.height} cm
                                </li>
                                {profile.user.disease !== "none" ? <li>Disease: {profile.user.disease}</li> : null}
                            </ul>
                        </div>

                        <div className=' flex flex-col gap-3 rounded-lg'>
                            {plan?.phases.map((phase, index) => (
                                <div className='dark:bg-slate-400 bg-green-50 p-2 rounded-md flex flex-col gap-1' key={index}>
                                    <h2 className='text-neutral-700 text-xl md:text-2xl font-semibold dark:text-grey-200'>{phase.title}</h2>
                                    <ul>
                                        {phase.content.map((item, idx) => (
                                            <li className='text-neutral-700 text-lg dark:text-grey-200' key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className='dark:bg-slate-400 bg-green-50 flex flex-col gap-1 text-neutral-700 p-2 rounded-md'>
                            <h2 className='text-neutral-700 text-xl md:text-2xl font-semibold dark:text-grey-200'>Important Considerations</h2>
                            <ul>
                                {plan?.importantConsiderations.map((item, index) => (
                                    <li className='text-neutral-700 text-lg dark:text-grey-200' key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {plan && macroData && (
                        <div className="dark:bg-slate-400 bg-green-50 p-2 rounded-md flex flex-col gap-1 text-neutral-700">
                            <h2 className="text-neutral-700 text-xl md:text-2xl font-semibold dark:text-grey-200">Macronutrients</h2>
                            <ul>
                                <li>Calories: {macroData['- Calories']}</li>
                                <li>Protein: {macroData['- Protein']}g</li>
                                <li>Carbs: {macroData['- Carbohydrates']}g</li>
                                <li>Fats: {macroData['- Fats']}g</li>
                            </ul>
                        </div>
                    )}
                </div>)
                : isLoading ?
                    (<div className="flex w-52 flex-col gap-4">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <p>Loading plan data...</p>
                    </div>)
                    : null
            }
        </section>
    );
};

export default Plan;
