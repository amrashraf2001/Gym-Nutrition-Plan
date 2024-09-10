import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import { UserContext } from "./contexts/User";
import { useState } from "react";
import Track from "./pages/Track/track";
import Private from "./pages/Private/Private";
import Demo from "./pages/demo";

function App() {
  const userData = localStorage.getItem("token")
  const userData2 = sessionStorage.getItem("token")
  const [loggedUser, setLoggedUser] = useState(userData ? userData : userData2);

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} errorElement={<h1>Erorr.....</h1>}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userPage" element={<Private Component={Track} />} />
            <Route path="/demo" element={<Private Component={Demo} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;
