import { useContext } from "react";
import { UserContext } from "../../contexts/User";
import { Navigate } from "react-router-dom";

const Private = (props) => {
    const loggedData = useContext(UserContext)
    console.log(loggedData);
    return (
        loggedData.loggedUser !== null ?
            <props.Component />
            :
            <Navigate to="/login" />
    )
}

export default Private