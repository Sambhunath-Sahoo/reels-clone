import React, { useContext } from "react";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


// user will able to access this route only if he/she is logged in.
function PrivateRoute({ component: Component, ...rest }) {

    // getting the user form context API(Global store)
    const { user } = useContext(AuthContext);
    return (
        <Route {...rest} render={(props) => {
            // checking if user exist or not 
            return user ? <Component {...props} /> : <Redirect to="login" />;
        }}
        />
    );
}

export default PrivateRoute;
