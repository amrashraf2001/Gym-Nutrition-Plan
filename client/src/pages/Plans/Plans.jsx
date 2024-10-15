import { AiOutlinePlus } from 'react-icons/ai'; // Import the add icon
import React, { useState } from "react";

const Plans = () => {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [goal, setGoal] = useState("lose"); // Default: Lose weight
  const [weight, setWeight] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with form data (e.g., send to server or display it)
    console.log({
      goal,
      weight,
      startDate,
      endDate,
    });

    // Close the modal after submission
    toggleModal();
  };

  return (
    <section className="p-3 grid grid-cols-3 gap-4">
      <h1 className="col-span-3 text-xl font-bold mb-4">Plans</h1>

      {/* Sample Cards */}
      <div className="border p-4 col-span-3 shadow-lg rounded-md">
        <h2 className="text-lg font-semibold">Current Plan</h2>
        <p>Details about Plan Current Plan</p>
      </div>

      <div className="border p-4 shadow-lg rounded-md">
        <h2 className="text-lg font-semibold">Plan 2</h2>
        <p>Details about Plan 2</p>
      </div>

      {/* Add New Plan Card */}
      <div
        onClick={toggleModal}
        className="border p-4 shadow-lg rounded-md flex justify-center items-center text-gray-500 dark:hover:text-[#0a3126] hover:text-[#007654] cursor-pointer"
      >
        <AiOutlinePlus size={48} /> {/* Large add icon */}
      </div>

      {/* Modal for the form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Add Your Plan</h2>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Goal selection */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Goal:
                </label>
                <select
                  className="w-full border p-2 rounded"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                >
                  <option value="lose">Lose Weight</option>
                  <option value="gain">Gain Weight</option>
                </select>
              </div>

              {/* Weight input */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Weight (kg):
                </label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </div>

              {/* Start date input */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Start Date:
                </label>
                <input
                  type="date"
                  className="w-full border p-2 rounded"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              {/* End date input */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  End Date:
                </label>
                <input
                  type="date"
                  className="w-full border p-2 rounded"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
              >
                Submit
              </button>

              {/* Close button */}
              <button
                type="button"
                className="mt-2 text-gray-600 w-full"
                onClick={toggleModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Plans;
