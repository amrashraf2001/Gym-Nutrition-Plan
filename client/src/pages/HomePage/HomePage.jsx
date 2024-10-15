import React from 'react';

const HomePage = () => {
    // Set progress values (these can be props or state in a dynamic app)
    const mainProgress = 75;
    const bmiProgress = 23; // Assume BMI out of 50 (for visual scaling)
    const bmrProgress = 1600; // Scaled for visualization

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-8">Nutrition Plan Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Progress */}
                <div className="flex flex-col items-center">
                    <div className="radial-progress text-green-500" style={{ "--value": mainProgress }} data-testid="main-progress">
                        {mainProgress}%
                    </div>
                    <p className="mt-4 font-semibold">Main Progress</p>
                </div>

                {/* BMI Progress */}
                <div className="flex flex-col items-center">
                    <div className="radial-progress text-blue-500" style={{ "--value": bmiProgress * 2 }} data-testid="bmi-progress">
                        {bmiProgress}
                    </div>
                    <p className="mt-4 font-semibold">BMI</p>
                </div>

                {/* BMR Progress */}
                <div className="flex flex-col items-center">
                    <div className="radial-progress text-red-500" style={{ "--value": (bmrProgress / 2000) * 100 }} data-testid="bmr-progress">
                        {bmrProgress} kcal
                    </div>
                    <p className="mt-4 font-semibold">BMR</p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
