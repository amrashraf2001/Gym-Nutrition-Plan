import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDetails1 = ({ onNext }) => {
    
    return (
        <div className="flex flex-col space-y-5 items-center pb-10">
            <h2 className="text-3xl font-semibold  text-green-700">What is your age?</h2>
            <input type="date" id="date" name="date" className="shadow-lg rounded-lg border-2 bg-green-400 p-2 border-black w-52 h-14" />
    
            <button
                className="absolute right-8 bottom-10 transition hover:translate-x-2 text-4xl text-[#007654]"
                onClick={onNext}
            >
                <FaArrowAltCircleRight />
            </button>

        </div>
    );
    
};

const UserDetails2 = ({ onNext, onPrev }) => {
    return (
        <div className="flex flex-col space-y-8 justify-center items-center pb-10">
            <h2 className="text-2xl font-semibold text-green-900">What is your height and weight?</h2>
            <div className=" space-y-5 text-left h-24 w-full">
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
                        className="placeholder:text-green-950 shadow-md rounded-lg border-2 bg-green-400 p-2 hover:border-black w-24 h-10 transition-all ease-in-out duration-1000 hover:w-52 "
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
                        className="placeholder:text-green-950 shadow-md rounded-lg border-2 bg-green-400 p-2 hover:border-black w-24 h-10 transition-all ease-in-out duration-1000 hover:w-52 "
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

const UserDetails3 = ({ onPrev }) => {
    
    return (
        <div className="flex flex-col space-y-8 justify-center items-center pb-10">
            <label htmlFor="healthCondition" className="w-96 text-2xl font-semibold text-green-900">Do you have any existing medical conditions or dietary restrictions that we should be aware of? </label>
            <select id="healthCondition" name="healthCondition" className="bg-green-400 text-green-950 rounded-md shadow-md font-serif p-2">
                <option value="" disabled selected>Select a Condiiton</option>
                <option value="none">None</option>
                <option value="diabetes">Diabetes</option>
                <option value="hypertension">Hypertension</option>
                <option value="allergies">Allergies</option>
                <option value="Lactose Intolerance">Lactose Intolerance</option>
                <option value="other">Other (Please specify)</option>
            </select>
            <input type="text" id="otherCondition" name="otherCondition" placeholder="Specify if other" className="placeholder:text-green-950 shadow-md rounded-lg border-2 bg-green-400 p-2 hover:border-black  w-24 h-10 transition-all ease-in-out duration-1000 hover:w-52 "></input>
            <input type="submit" className="absolute right-8 bottom-10 transition-all ease-in-out shadow-lg rounded-lg bg-green-400 text-green-950 text-xl hover:text-[#f1f1cc] shadow-green-700 p-1" />
                
            <button
                className="absolute left-8 bottom-10 transition hover:-translate-x-2 text-4xl text-[#007654]"
                onClick={onPrev}
            >
                <FaArrowAltCircleLeft />
            </button>
        </div>
    );
};

const Card = () => {
    const [step, setStep] = useState(1);
    

    return (

        <section className="container h-screen px-14 bg-[#ebddc3] flex justify-center items-center">
            <div className=" bg-white shadow-xl shadow-green-700 rounded-xl relative p-14 transition-all">
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    
                }}>
                      {step === 1 ? (
                        <UserDetails1 onNext={() => setStep(2)} />
                    ) : step === 2 ? (
                        <UserDetails2 onNext={() => setStep(3)} onPrev= {() => setStep(1)} />
                    ) : (
                        <UserDetails3 onPrev={() => setStep(2)} />
                    )}
                </form>
            </div>
        </section>
    );
};

export default Card;
