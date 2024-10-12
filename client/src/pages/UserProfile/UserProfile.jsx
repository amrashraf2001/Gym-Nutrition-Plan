import Sidebar from "../../components/Sidebar";
import { useEffect, useState, useContext, Fragment } from "react";
import axios from "../../api/axios";
import { UserContext } from "../../contexts/User";
import { CiEdit } from "react-icons/ci";


const getProfileUrl = "/user/profile";
const updateProfileURL = "/user/updateProfile";

function UserButtons({ reset, data, setData, setShowHide }) {
  const [editingFields, setEditingFields] = useState({
    age: false,
    gender: false,
    height: false,
    weight: false,
    disease: false,
    email: false,
    phoneNum: false,
  });

  // useEffect to reset editing fields when the reset prop changes
  useEffect(() => {
    if (reset) {
      setEditingFields({
        age: false,
        gender: false,
        height: false,
        weight: false,
        disease: false,
        email: false,
        phoneNum: false,
      });
    }
  }, [reset]); // This hook runs only when `reset` changes

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
        <Fragment key={key}>
          {key === "age" ? (
            <div className="divider w-full border-opacity-50">Details</div>
          ) : key === "disease" ? (
            <div className="divider w-full border-opacity-50">
              Health Status
            </div>
          ) : key === "email" ? (
            <div className="divider w-full border-opacity-50">Contact</div>
          ) : (
            ""
          )}
          <div className="flex gap-10 items-center" >
            {/* Conditionally render the h3 or input based on whether editing is active for this key */}
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
            <div
              onClick={() => toggleInput(key)} // Toggle input when button is clicked
              className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"
            >
              <CiEdit />
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
}


function UserProfile() {
  const loggedData = useContext(UserContext);
  const [reset, setReset] = useState(false);
  const [data, setData] = useState({});
  const [showHide, setShowHide] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getProfileUrl, {
          headers: {
            Authorization: `Bearer ${loggedData.loggedUser}`,
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
  }, [reset]);

  const sendData = async (updatedFields) => {
    // console.log(updatedFields);
    try {
      // creating form data to handle file upload
      const updatedData = new FormData();

      // adding updated fields to the form data
      Object.entries(updatedFields).forEach(([key, value]) => {
        updatedData.append(key, value);
      });

      const dd = await axios.patch(updateProfileURL, updatedData, {
        // removed json.stringify and added updatedData
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data to send profile picture
          Authorization: `Bearer ${loggedData.loggedUser}`,
        },
        withCredentials: false,
      });
      console.log(dd);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    sendData(data);
    setShowHide(false);
    setReset(true);
  };

  return (
    <section className="h-screen container grid grid-cols-6">
      <Sidebar
        setShowHide={setShowHide}
        setData={setData}
        data={{ username: data.userName, profilePicture: data.profilePicture }}
        className="col-span-1"
      />

      <div className="col-span-3 m-8 my-auto rounded-xl flex flex-col p-6 shadow-lg gap-10">
        <form onSubmit={handleFormSubmit}>
          <UserButtons
            setShowHide={setShowHide}
            setData={setData}
            reset={reset}
            data={{
              age: data.age,
              gender: data.gender,
              height: data.height,
              weight: data.weight,
              disease: data.disease,
              email: data.email,
            }}
          />
          {/* Submit Button */}
          <input
            type="file"
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                profilePicture: e.target.files[0],
              }));
            }}
            className="file-input file-input-bordered file-input-success w-full max-w-xs"
          />
          <div div className="flex justify-center mt-10">
            <input
              type="submit"
              className={`${
                showHide ? "block" : "hidden"
              } bg-blue-500 text-white rounded-lg p-4 shadow-lg hover:bg-blue-700 transition-all`}
              value={"Save Changes"}
            />
          </div>
        </form>
      </div>
    </section>
  );
}

export default UserProfile;
