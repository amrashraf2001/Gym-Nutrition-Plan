import { useEffect, useState } from "react"

const Food = (props) => {
    const [grams, setGrams] = useState(100)
    const [food, setFood] = useState({})
    const [calories, setCalories] = useState(0)
    const [protein, setProtein] = useState(0)
    const [fats, setFats] = useState(0)
    const [carbs, setCarbs] = useState(0)
    useEffect(() => {
        setFood(props.food)
    },[props.food])

    useEffect(() => {
        setCalories((food.calories/100)*grams)
        setProtein((food.protein/100)*grams)
        setFats((food.fats/100)*grams)
        setCarbs((food.carbs/100)*grams)
    })

    const calculateMacros = (e) => {
        if(e.target.value.length !== 0 )
            {
            setGrams(Number(e.target.value));
        }else{
            setGrams(100);
        }
    }

    return (
        <div className="w-52 py-8 flex flex-col gap-1">
            <div className="w-full h-52 bg-white"></div>
            <h2 className="font-semibold text-xl">{food.name} ({calories} Kcal for {grams}G)</h2>
            <div className="flex flex-wrap ">
            <div className="w-1/2 py-3">
                <p>Protein</p>
                <p>{protein}g</p>
            </div>
            <div className="w-1/2 py-3">
                <p>Fats</p>
                <p>{fats}g</p>
            </div>
            <div className="w-1/2 py-3">
                <p>Carbs</p>
                <p>{carbs}g</p>
            </div>
            </div>
            <div className="flex flex-col gap-2">
            <input onChange={calculateMacros} max={1000} className="px-2 py-1 rounded-md" type="number" placeholder="َQuantity in Gms" />
            <button className="px-2 py-1 bg-[#007654] text-xl font-bold text-white rounded-lg">Track This Food</button>
            </div>
        </div>
    )
}

export default Food