import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { UserContext } from "../../contexts/User";
import PropTypes from "prop-types";

const updateProfileURL = "/user/updateProfile";

const UserDetails1 = ({ onNext, age, setAge }) => {
    return (
        <div className="flex flex-col space-y-5 items-center pb-10">
            <h2 className="text-3xl font-semibold text-green-700">What is your age?</h2>
            <input
                type="number"
                onChange={(e) => {
                    // console.log(e.target.value);
                    // console.log(e.target.min);
                    // console.log(e.target.max);  
                    if(parseInt(e.target.value) > parseInt(e.target.max) || parseInt(e.target.value) < parseInt(e.target.min)){
                        console.log("Please enter a valid age");
                        e.target.value = e.target.min;
                    }
                    // if(!isNaN(parseInt(e.target.value))){
                    //     setAge(parseInt(e.target.value));
                    // }
                    setAge(e.target.value);
                }}
                value={age}
                id="age"
                name="age"
                className="placeholder:text-green-950 shadow-lg rounded-lg border-2 bg-green-400 p-2 border-black w-52 h-14"
                placeholder="Enter your Age"
                max={150}
                min={5}
            />
            <button
                className="absolute right-8 bottom-10 transition hover:translate-x-2 text-4xl text-[#007654]"
                onClick={()=>{
                    if(isNaN(age)){
                        // alert("Please enter a valid age");
                    }else{
                    onNext();
                    }
                }
                }
            >
                <FaArrowAltCircleRight />
            </button>
        </div>
    );
};

UserDetails1.propTypes = {
    onNext: PropTypes.func.isRequired,
    age: PropTypes.string.isRequired,
    setAge: PropTypes.func.isRequired,
};

const UserDetails2 = ({ onNext, onPrev, height, setHeight, weight, setWeight }) => {
    return (
        <div className="flex flex-col space-y-8 justify-center items-center pb-10">
            <h2 className="text-2xl font-semibold text-green-900">What is your height and weight?</h2>
            <div className="space-y-5 text-left h-24 w-full">
                <div className="flex gap-5 text-left">
                    <label className="font-medium text-2xl w-20 text-green-900 text-left">Height</label>
                    <input
                        type="number"
                        required
                        placeholder="Enter your Height"
                        min={0}
                        max={300}
                        id="Height"
                        name="Height"
                        onChange={(e) => {
                            if(parseInt(e.target.value) > parseInt(e.target.max) || parseInt(e.target.value) < parseInt(e.target.min)){
                                console.log("Please enter a valid height");
                                e.target.value = e.target.min;
                            }
                                // if(!isNaN(parseInt(e.target.value))){
                                //     setHeight(parseInt(e.target.value));
                                // }
                            setHeight(e.target.value);
                            // e.target.focus();
                        }}
                        value={height}
                        className="placeholder:text-green-950 shadow-md rounded-lg border-2 bg-green-400 p-2 hover:border-black w-52 h-10 transition-all duration-500 ease-in-out"
                    />
                </div>
                <div className="flex gap-5 text-left">
                    <label className="font-medium text-2xl w-20 text-green-900">Weight</label>
                    <input
                        type="number"
                        required
                        placeholder="Enter your Weight"
                        min={0}
                        max={500}
                        id="Weight"
                        name="Weight"
                        onChange={(e) => {
                            if(parseInt(e.target.value) > parseInt(e.target.max) || parseInt(e.target.value) < parseInt(e.target.min)){
                                console.log("Please enter a valid weight");
                                e.target.value = e.target.min;
                            }
                            // if(!isNaN(parseInt(e.target.value))){
                            //     setWeight(parseInt(e.target.value));
                            // }
                            setWeight(e.target.value);
                        }}
                        value={weight}
                        className="placeholder:text-green-950 shadow-md rounded-lg border-2 bg-green-400 p-2 hover:border-black w-52 h-10 transition-all ease-in-out duration-500 "
                    />
                </div>
            </div>
            <button
                className="absolute right-8 bottom-10 transition hover:translate-x-2 text-4xl text-[#007654]"
                onClick={onNext}
            >
                <FaArrowAltCircleRight />
            </button>
            <button
                className="absolute left-8 bottom-10 transition hover:-translate-x-2 text-4xl text-[#007654]"
                onClick={onPrev}
            >
                <FaArrowAltCircleLeft />
            </button>
        </div>
    );
};

UserDetails2.propTypes = {
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    height: PropTypes.string.isRequired,
    setHeight: PropTypes.func.isRequired,
    weight: PropTypes.string.isRequired,
    setWeight: PropTypes.func.isRequired,
};


const UserDetails3 = ({ onPrev, disease, setDisease, specifiedDisease, setSpecifiedDisease, specifiedDiseaseActive, setSpecifiedDiseaseActive }) => {
    const diseaseHandler = (e) => {
        if (e.target.value === "other") {
            setDisease(specifiedDisease);
            setSpecifiedDiseaseActive(true);
        } else {
            setDisease(e.target.value);
            setSpecifiedDiseaseActive(false);
        }
    };

    return (
        <div className="flex flex-col space-y-8 justify-center items-center pb-10">
            <label htmlFor="healthCondition" className="w-96 text-2xl font-semibold text-green-900">
                Do you have any existing medical conditions or dietary restrictions that we should be aware of?
            </label>
            <select
                onChange={diseaseHandler}
                value={disease}
                id="healthCondition"
                name="healthCondition"
                className="bg-green-400 text-green-950 rounded-md shadow-md font-serif p-2"
                required
                placeholder="Select a Condition"
            >
                <option value="none">None</option>
                <option value="diabetes">Diabetes</option>
                <option value="hypertension">Hypertension</option>
                <option value="allergies">Allergies</option>
                <option value="Lactose Intolerance">Lactose Intolerance</option>
                <option value="other">Other (Please specify)</option>
            </select>
            <input
                type="text"
                onChange={(e) => setSpecifiedDisease(e.target.value)}
                value={specifiedDisease}
                id="otherCondition"
                name="otherCondition"
                placeholder="Specify if other"
                style={specifiedDiseaseActive ? {} : { display: "none" }}
                className="placeholder:text-green-950 shadow-md rounded-lg border-2 bg-green-400 p-2 hover:border-black w-24 h-10 transition-all ease-in-out duration-1000 hover:w-52"
            />
            <input
                type="submit"
                className="absolute right-8 bottom-10 transition-all ease-in-out shadow-lg rounded-lg bg-green-400 text-green-950 text-xl hover:text-[#f1f1cc] shadow-green-700 p-1"
            />
            <button
                className="absolute left-8 bottom-10 transition hover:-translate-x-2 text-4xl text-[#007654]"
                onClick={onPrev}
            >
                <FaArrowAltCircleLeft />
            </button>
        </div>
    );
};

UserDetails3.propTypes = {
    onPrev: PropTypes.func.isRequired,
    disease: PropTypes.string.isRequired,
    setDisease: PropTypes.func.isRequired,
    specifiedDisease: PropTypes.string.isRequired,
    setSpecifiedDisease: PropTypes.func.isRequired,
    specifiedDiseaseActive: PropTypes.bool.isRequired,
    setSpecifiedDiseaseActive: PropTypes.func.isRequired,
};

const Card = () => {
    const loggedData = useContext(UserContext);

    const [step, setStep] = useState(1);
    const [age, setAge] = useState("");
    const [height, setHeight] = useState(""); // Declare height here
    const [weight, setWeight] = useState(""); // Declare weight here
    const [disease, setDisease] = useState("");
    const [specifiedDisease, setSpecifiedDisease] = useState("");
    const [specifiedDiseaseActive, setSpecifiedDiseaseActive] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(age, height, weight, disease);
        console.log(loggedData.loggedUser)
        if(isNaN(parseInt(age)) || isNaN(parseInt(height)) || isNaN(parseInt(weight))){
            alert("Please enter valid values");
        }else{
        try {
            await axios.patch(
                updateProfileURL,
                JSON.stringify({
                    age,
                    weight,
                    height,
                    disease,
                }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${loggedData.loggedUser}`,
                    },
                    withCredentials: false,
                }
            );

            navigate("/HomePage");
        } catch (err) {
            console.error(err);
        }
    }
    };

    return (
        <section className="container h-screen px-14 bg-[#ebddc3] flex justify-center items-center">
            <div className="bg-white shadow-xl shadow-green-700 rounded-xl relative p-14 transition-all">
                <form onSubmit={handleSubmit}>
                    {step === 1 ? (
                        <UserDetails1 onNext={() => setStep(2)} age={age} setAge={setAge} />
                    ) : step === 2 ? (
                        <UserDetails2
                            onNext={() => setStep(3)}
                            onPrev={() => setStep(1)}
                            height={height}
                            setHeight={setHeight}
                            weight={weight}
                            setWeight={setWeight}
                        />
                    ) : (
                        <UserDetails3
                            onPrev={() => setStep(2)}
                            disease={disease}
                            setDisease={setDisease}
                            specifiedDisease={specifiedDisease}
                            setSpecifiedDisease={setSpecifiedDisease}
                            specifiedDiseaseActive={specifiedDiseaseActive}
                            setSpecifiedDiseaseActive={setSpecifiedDiseaseActive}
                        />
                    )}
                </form>
            </div>
        </section>
    );
};

export default Card;