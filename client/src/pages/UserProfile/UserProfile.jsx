import Sidebar from "../../components/Sidebar"
import { useEffect, useState, useContext } from "react"
import axios from "../../api/axios";
import { UserContext } from "../../contexts/User";
import { CiEdit } from "react-icons/ci";

const getProfileUrl = "/user/profile"
const updateProfileURL = "/user/updateProfile";

function UserButtons({ data, setData, setShowHide }) {
  //input
  const [editingFields, setEditingFields] = useState({
    age: false,
    gender: false,
    height: false,
    weight: false,
    disease: false,
    email: false,
    phoneNum: false
  })

  const toggleInput = (key) => {
    setEditingFields((prev) => ({
      ...prev,
      [key]: !prev[key], // Toggle the input for the specific key
    }));
    setShowHide(true);
  };

  return (
    <>
      {Object.entries(data).map(([key, value]) => (
        <>
        <div className="flex gap-10 items-center" key={key}>
          {/* Conditionally render the h3 or input based on whether editing is active for this key */}
          {
            key === "age" ? (
                <div className="divider w-full border-opacity-50">Details</div>
            ) : key === "disease" ?  (
              <div className="divider w-full border-opacity-50">Health Status</div>
            ) :  key === "email" ? (
              <div className="divider w-full border-opacity-50">Contact</div>
            ) : ""
          }
          {!editingFields[key] ? (
            <h3
              className="text-2xl w-96 cursor-pointer"
              onClick={() => toggleInput(key)} // Toggle input on click
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
            </h3>
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setData((prev) => ({ ...prev, [key]: e.target.value })); // Update the state with input value
              }}
              className="rounded-lg w-16 hover:w-48 transition-all ease-in-out duration-700 p-2 hover:border-2 hover:border-black"
            />
          )}
          <button
            onClick={() => toggleInput(key)} // Toggle input when button is clicked
            className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"
          >
            <CiEdit />
          </button>
        </div>
        </>
      ))}


    </>
  );
}

function UserProfile() {

  const loggedData = useContext(UserContext);

  const [data, setData] = useState({});
  const [showHide, setShowHide] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getProfileUrl, {
          headers: {
            "Authorization": `Bearer ${(loggedData.loggedUser)}`,
          },
        });
        // console.log()
        setData(response.data.user);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(); // Call the async function

  }, []);

  const sendData = async (updatedFields) => {
    // console.log(loggedData.loggedUser)
    try {
      const updatedData = new FormData();
      updatedFields.entries().forEach(([key, value]) => {
        updatedData.append(key, value);
      });

      await axios.patch(
        updateProfileURL,
        JSON.stringify(updatedData),
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${loggedData.loggedUser}`,
          },
          withCredentials: false,
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    sendData(data);
  };

  return (
    <section className="h-screen container grid grid-cols-6">
      <Sidebar setShowHide={setShowHide} setData={setData} data={{ "username": data.userName, "profilePic": data.profilePicture }} className="col-span-1" />

      <div className="col-span-3 m-8 my-auto rounded-xl flex flex-col p-6 shadow-lg gap-10">
        <form onSubmit={handleFormSubmit}>
          <UserButtons setShowHide={setShowHide} setData={setData} data={{ "age": data.age, "gender": data.gender, "height": data.height, "weight": data.weight, "disease": data.disease, "email": data.email }} />
          {/* Submit Button */}
          <div div className="flex justify-center mt-10">
            <button type="submit" className={`${showHide ? "block" : "hidden"} bg-blue-500 text-white rounded-lg p-4 shadow-lg hover:bg-blue-700 transition-all`}>Save Changes</button>
          </div>
        </form>
      </div >
    </section >
  );
}

export default UserProfile;



