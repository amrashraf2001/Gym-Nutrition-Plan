// import Sidebar from "../../components/Sidebar"
// import { useEffect, useState, useContext } from "react"
// import axios from "../../api/axios";
// import { UserContext } from "../../contexts/User";
// import { CiEdit } from "react-icons/ci";

// const getProfileUrl = "/user/profile"
// const updateProfileURL = "/user/updateProfile";

// function UserProfile() {

//   const loggedData = useContext(UserContext);
//   const [data, setData] = useState({});
//   const [showAgeInput, setShowAgeInput] = useState(false);
//   const [showGenderInput, setShowGenderInput] = useState(false);
//   const [showHeightInput, setShowHeightInput] = useState(false);
//   const [showWeightInput, setShowWeightInput] = useState(false);
//   const [showDiseaseInput, setShowDiseaseInput] = useState(false);
//   const [showEmailInput, setShowEmailInput] = useState(false);

//   const [age, setAge] = useState("")
//   const [gender, setGender] = useState("")
//   const [height, setHeight] = useState("")
//   const [weight, setWeight] = useState("")
//   const [disease, setDisease] = useState("")
//   const [email, setEmail] = useState("")

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(getProfileUrl, {
//           headers: {
//             Authorization: `Bearer ${JSON.parse(loggedData.loggedUser)}`,
//           },
//         });

//         setData(response.data.user);
//         console.log(response.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchData(); // Call the async function

//   }, [loggedData]);

//   const sendData = async () => {
//     try {
//       await axios.patch(
//         updateProfileURL,
//         JSON.stringify({
//           age: age,
//           gender: gender,
//           height: height,
//           weight: weight,
//           disease: disease,
//           email: email,

//         }),
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${loggedData.loggedUser}`,
//           },
//           withCredentials: false,
//         }
//       );

//     } catch (err) {
//       console.error(err);
//     }
//   }
//   sendData()

//   const toggleInput = (setter) => {
//     setter(prev => !prev); // Toggle the state for the specific field
//   };

//   return (
//     <section className="h-screen container grid grid-cols-6">
//       <Sidebar className="col-span-1" />

//       <div className="col-span-3 m-8 my-auto rounded-xl flex flex-col p-6 shadow-lg gap-10">
//         <div className="flex flex-col gap-3">
//           <h2 className="text-3xl font-semibold">User Details:</h2>
//           <div className="flex flex-col gap-3 p-2">

//             {/* Age */}
//             <div className="flex gap-10 items-center">
//               <h3 className={`${showAgeInput ? "hidden" : "block"} text-2xl w-96`}>Age: {data.age}</h3>
//               {showAgeInput && <input type="text" onChange={(e) => { setAge(e.target.value) }} className="rounded-lg w-16 hover:w-48 transition-all ease-in-out duration-700 p-2 hover:border-2 hover:border-black" />}
//               <button onClick={() => toggleInput(setShowAgeInput)} className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"><CiEdit /></button>
//             </div>

//             {/* Gender */}
//             <div className="flex gap-10 items-center">
//               <h3 className={`${showGenderInput ? "hidden" : "block"} text-2xl w-96`}>Gender: {data.gender}</h3>
//               {showGenderInput && <input type="text" onChange={(e) => { setGender(e.target.value) }} className="rounded-lg w-16 hover:w-48 transition-all ease-in-out duration-700 p-1" />}
//               <button onClick={() => toggleInput(setShowGenderInput)} className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"><CiEdit /></button>
//             </div>

//             {/* Height */}
//             <div className="flex gap-10 items-center">
//               <h3 className={`${showHeightInput ? "hidden" : "block"} text-2xl w-96`}>Height: {data.height}</h3>
//               {showHeightInput && <input type="text" onChange={(e) => { setHeight(e.target.value) }} className="rounded-lg w-16 hover:w-48 transition-all ease-in-out duration-700 p-1" />}
//               <button onClick={() => toggleInput(setShowHeightInput)} className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"><CiEdit /></button>
//             </div>

//             {/* Weight */}
//             <div className="flex gap-10 items-center">
//               <h3 className={`${showWeightInput ? "hidden" : "block"} text-2xl w-96`}>Weight: {data.weight}</h3>
//               {showWeightInput && <input type="text" onChange={(e) => { setWeight(e.target.value) }} className="rounded-lg w-16 hover:w-48 transition-all ease-in-out duration-700 p-1" />}
//               <button onClick={() => toggleInput(setShowWeightInput)} className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"><CiEdit /></button>
//             </div>
//           </div>
//         </div>

//         {/* Health Status */}
//         <div className="flex flex-col gap-3">
//           <h2 className="text-3xl font-semibold">Health Status:</h2>
//           <div className="flex gap-10 items-center">
//             <h3 className={`${showDiseaseInput ? "hidden" : "block"} text-2xl w-96`}>Disease: {data.disease}</h3>
//             {showDiseaseInput && <input type="text" onChange={(e) => { setDisease(e.target.value) }} className="rounded-lg w-16 hover:w-48 transition-all ease-in-out duration-700 p-1" />}
//             <button onClick={() => toggleInput(setShowDiseaseInput)} className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"><CiEdit /></button>
//           </div>
//         </div>

//         {/* Contact */}
//         <div className="flex flex-col gap-3">
//           <h2 className="text-3xl font-semibold">Contact:</h2>
//           <div className="flex gap-10 items-center">
//             <h3 className={`${showEmailInput ? "hidden" : "block"} text-2xl w-96`}>Email: {data.email}</h3>
//             {showEmailInput && <input type="text" onChange={(e) => { setEmail(e.target.value) }} className="rounded-lg w-16 hover:w-48 transition-all ease-in-out duration-700 p-1" />}
//             <button onClick={() => toggleInput(setShowEmailInput)} className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"><CiEdit /></button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default UserProfile;







// import Sidebar from "../../components/Sidebar"
// import { useEffect, useState, useContext } from "react"
// import axios from "../../api/axios";
// import { UserContext } from "../../contexts/User";
// import { CiEdit } from "react-icons/ci";

// const getProfileUrl = "/user/profile"
// const updateProfileURL = "/user/updateProfile";

// function UserProfile() {

//   const loggedData = useContext(UserContext);
//   const [data, setData] = useState({});
//   const [showAgeInput, setShowAgeInput] = useState(false);
//   const [showGenderInput, setShowGenderInput] = useState(false);
//   const [showHeightInput, setShowHeightInput] = useState(false);
//   const [showWeightInput, setShowWeightInput] = useState(false);
//   const [showDiseaseInput, setShowDiseaseInput] = useState(false);
//   const [showEmailInput, setShowEmailInput] = useState(false);

//   const [age, setAge] = useState("")
//   const [gender, setGender] = useState("")
//   const [height, setHeight] = useState("")
//   const [weight, setWeight] = useState("")
//   const [disease, setDisease] = useState("")
//   const [email, setEmail] = useState("")

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(getProfileUrl, {
//           headers: {
//             Authorization: `Bearer ${JSON.parse(loggedData.loggedUser)}`,
//           },
//         });

//         setData(response.data.user);
//         console.log(response.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchData(); // Call the async function

//   }, [loggedData]);

//   // const sendData = async () => {
//   //   try {
//   //     await axios.patch(
//   //       updateProfileURL,
//   //       JSON.stringify({
//   //         age: age,
//   //         gender: gender,
//   //         height: height,
//   //         weight: weight,
//   //         disease: disease,
//   //         email: email,

//   //       }),
//   //       {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           "Authorization": `Bearer ${loggedData.loggedUser}`,
//   //         },
//   //         withCredentials: false,
//   //       }
//   //     );

//   //   } catch (err) {
//   //     console.error(err);
//   //   }
//   // }
//   // sendData()

//   const toggleInput = (setter) => {
//     setter(prev => !prev); // Toggle the state for the specific field
//     // console.log(age)
//   };
//   // console.log(age)
//   return (
//     <section className="h-screen container grid grid-cols-6">
//       <Sidebar className="col-span-1" />

//       <div className="col-span-3 m-8 my-auto rounded-xl flex flex-col p-6 shadow-lg gap-10">
//         <div className="flex flex-col gap-3">
//           <h2 className="text-3xl font-semibold">User Details:</h2>
//           <div className="flex flex-col gap-3 p-2">

//             {/* Age */}
//             <div className="flex gap-10 items-center">
//               <h3 className={`${showAgeInput ? "hidden" : "block"} text-2xl w-96`}>Age: {data.age}</h3>
//               {showAgeInput && <input type="text" onChange={(e) => { setAge(e.target.value) }} className="rounded-lg w-16 hover:w-48 transition-all ease-in-out duration-700 p-2 hover:border-2 hover:border-black" />}
//               <button onClick={() => toggleInput(setShowAgeInput)} className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"><CiEdit /></button>
//             </div>

//             {/* Gender */}
//             <div className="flex gap-10 items-center">
//               <h3 className={`${showGenderInput ? "hidden" : "block"} text-2xl w-96`}>Gender: {data.gender}</h3>
//               {showGenderInput && <input type="text" onChange={(e) => { setGender(e.target.value) }} className="rounded-lg w-16 hover:w-48 transition-all ease-in-out duration-700 p-1" />}
//               <button onClick={() => toggleInput(setShowGenderInput)} className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"><CiEdit /></button>
//             </div>

//             {/* Height */}
//             <div className="flex gap-10 items-center">
//               <h3 className={`${showHeightInput ? "hidden" : "block"} text-2xl w-96`}>Height: {data.height}</h3>
//               {showHeightInput && <input type="text" onChange={(e) => { setHeight(e.target.value) }} className="rounded-lg w-16 hover:w-48 transition-all ease-in-out duration-700 p-1" />}
//               <button onClick={() => toggleInput(setShowHeightInput)} className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"><CiEdit /></button>
//             </div>

//             {/* Weight */}
//             <div className="flex gap-10 items-center">
//               <h3 className={`${showWeightInput ? "hidden" : "block"} text-2xl w-96`}>Weight: {data.weight}</h3>
//               {showWeightInput && <input type="text" onChange={(e) => { setWeight(e.target.value) }} className="rounded-lg w-16 hover:w-48 transition-all ease-in-out duration-700 p-1" />}
//               <button onClick={() => toggleInput(setShowWeightInput)} className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"><CiEdit /></button>
//             </div>
//           </div>
//         </div>

//         {/* Health Status */}
//         <div className="flex flex-col gap-3">
//           <h2 className="text-3xl font-semibold">Health Status:</h2>
//           <div className="flex gap-10 items-center">
//             <h3 className={`${showDiseaseInput ? "hidden" : "block"} text-2xl w-96`}>Disease: {data.disease}</h3>
//             {showDiseaseInput && <input type="text" onChange={(e) => { setDisease(e.target.value) }} className="rounded-lg w-16 hover:w-48 transition-all ease-in-out duration-700 p-1" />}
//             <button onClick={() => toggleInput(setShowDiseaseInput)} className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"><CiEdit /></button>
//           </div>
//         </div>

//         {/* Contact */}
//         <div className="flex flex-col gap-3">
//           <h2 className="text-3xl font-semibold">Contact:</h2>
//           <div className="flex gap-10 items-center">
//             <h3 className={`${showEmailInput ? "hidden" : "block"} text-2xl w-96`}>Email: {data.email}</h3>
//             {showEmailInput && <input type="text" onChange={(e) => { setEmail(e.target.value) }} className="rounded-lg w-16 hover:w-48 transition-all ease-in-out duration-700 p-1" />}
//             <button onClick={() => toggleInput(setShowEmailInput)} className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"><CiEdit /></button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default UserProfile;
import Sidebar from "../../components/Sidebar"
import { useEffect, useState, useContext } from "react"
import axios from "../../api/axios";
import { UserContext } from "../../contexts/User";
import { CiEdit } from "react-icons/ci";

const getProfileUrl = "/user/profile"
const updateProfileURL = "/user/updateProfile";

function UserProfile() {

  const loggedData = useContext(UserContext);

  const [data, setData] = useState({});
  const [showAgeInput, setShowAgeInput] = useState(false);
  const [showGenderInput, setShowGenderInput] = useState(false);
  const [showHeightInput, setShowHeightInput] = useState(false);
  const [showWeightInput, setShowWeightInput] = useState(false);
  const [showDiseaseInput, setShowDiseaseInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);

  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [disease, setDisease] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getProfileUrl, {
          headers: {
            "Authorization": `Bearer ${JSON.parse(loggedData.loggedUser)}`,
          },
        });

        setData(response.data.user);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(); // Call the async function

  }, [loggedData]);

  useEffect(() => {
    if (data) {
      setAge(data.age);
      setGender(data.gender);
      setHeight(data.height);
      setWeight(data.weight);
      setDisease(data.disease);
      setEmail(data.email);
    }
  }, [data]);

  // console.log(age)

  const sendData = async (updatedFields) => {
    console.log(loggedData.loggedUser)

    try {
      await axios.patch(
        updateProfileURL,
        JSON.stringify(updatedFields),
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

  const handleSave = (field, value) => {
    const updatedData = { [field]: value };
    sendData(updatedData);
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedFields = {
      age,
      gender,
      height,
      weight,
      disease,
      email,
    };
    sendData(updatedFields);
  };

  const toggleInput = (setter, field, value) => {
    setter(prev => !prev); // Toggle the input field visibility
    if (field && value) handleSave(field, value); // Send updated data when closing the input field
  };

  return (
    <section className="h-screen container grid grid-cols-6">
      <Sidebar className="col-span-1" />

      <div className="col-span-3 m-8 my-auto rounded-xl flex flex-col p-6 shadow-lg gap-10">
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold">User Details:</h2>
            <div className="flex flex-col gap-3 p-2">

              {/* Age */}
              <div className="flex gap-10 items-center">
                <h3 className={`${showAgeInput ? "hidden" : "block"} text-2xl w-96`}>Age: {data.age}</h3>
                {showAgeInput && <input type="text" onChange={(e) => { setAge(e.target.value) }} className="rounded-lg w-16 hover:w-48 transition-all ease-in-out duration-700 p-2 hover:border-2 hover:border-black" />}
                <button onClick={() => toggleInput(setShowAgeInput, 'age', age)} className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"><CiEdit /></button>
              </div>

              {/* Gender */}
              <div className="flex gap-10 items-center">
                <h3 className={`${showGenderInput ? "hidden" : "block"} text-2xl w-96`}>Gender: {data.gender}</h3>
                {showGenderInput && <input type="text" onChange={(e) => { setGender(e.target.value) }} className="rounded-lg w-16 hover:w-48 transition-all ease-in-out duration-700 p-1" />}
                <button onClick={() => toggleInput(setShowGenderInput, 'gender', gender)} className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"><CiEdit /></button>
              </div>

              {/* Height */}
              <div className="flex gap-10 items-center">
                <h3 className={`${showHeightInput ? "hidden" : "block"} text-2xl w-96`}>Height: {data.height}</h3>
                {showHeightInput && <input type="text" onChange={(e) => { setHeight(e.target.value) }} className="rounded-lg w-16 hover:w-48 transition-all ease-in-out duration-700 p-1" />}
                <button onClick={() => toggleInput(setShowHeightInput, 'height', height)} className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"><CiEdit /></button>
              </div>

              {/* Weight */}
              <div className="flex gap-10 items-center">
                <h3 className={`${showWeightInput ? "hidden" : "block"} text-2xl w-96`}>Weight: {data.weight}</h3>
                {showWeightInput && <input type="text" onChange={(e) => { setWeight(e.target.value) }} className="rounded-lg w-16 hover:w-48 transition-all ease-in-out duration-700 p-1" />}
                <button onClick={() => toggleInput(setShowWeightInput, 'weight', weight)} className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"><CiEdit /></button>
              </div>
            </div>
          </div>

          {/* Health Status */}
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold">Health Status:</h2>
            <div className="flex gap-10 items-center">
              <h3 className={`${showDiseaseInput ? "hidden" : "block"} text-2xl w-96`}>Disease: {data.disease}</h3>
              {showDiseaseInput && <input type="text" onChange={(e) => { setDisease(e.target.value) }} className="rounded-lg w-16 hover:w-48 transition-all ease-in-out duration-700 p-1" />}
              <button onClick={() => toggleInput(setShowDiseaseInput, 'disease', disease)} className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"><CiEdit /></button>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold">Contact:</h2>
            <div className="flex gap-10 items-center">
              <h3 className={`${showEmailInput ? "hidden" : "block"} text-2xl w-96`}>Email: {data.email}</h3>
              {showEmailInput && <input type="text" onChange={(e) => { setEmail(e.target.value) }} className="rounded-lg w-16 hover:w-48 transition-all ease-in-out duration-700 p-1" />}
              <button onClick={() => toggleInput(setShowEmailInput, 'email', email)} className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"><CiEdit /></button>
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex justify-center mt-10">
            <button type="submit" className={`${(age !== data.age || gender !== data.gender || height !== data.height || weight !== data.weight || disease !== data.disease || email !== data.email) ? "block" : "hidden"} bg-blue-500 text-white rounded-lg p-4 shadow-lg hover:bg-blue-700 transition-all`}>Save Changes</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default UserProfile;



