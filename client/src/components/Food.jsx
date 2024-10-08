
const Food = ({ food }) => {
    return (
        <div className="w-52 py-8 flex flex-wrap space-y-2">
            <div className="w-full h-52 bg-white"></div>
            <h2 className="font-semibold text-xl">{food.name} ({food.calories} Kcal)</h2>
            <div className="w-1/2 py-3">
                <p>Protine</p>
                <p>{food.protein}g</p>
            </div>
            <div className="w-1/2 py-3">
                <p>Fats</p>
                <p>{food.fats}g</p>
            </div>
            <div className="w-1/2 py-3">
                <p>Carbs</p>
                <p>{food.carbs}g</p>
            </div>
            <input className="px-2 py-1 rounded-md" type="number" placeholder="َQuantity in Gms" />
            <button className="px-2 py-1 bg-[#007654] text-xl font-bold text-white rounded-lg">Track This Food</button>
        </div>
    )
}

export default Food