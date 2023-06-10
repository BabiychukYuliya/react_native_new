import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "../redux/auth/authOperations";



const Main = () => {
    const { stateChange } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(authStateChangeUser())
    }, []);
    
    const routing = useRoute(stateChange);
    return (
<NavigationContainer>{routing}</NavigationContainer>
        )
}

export default Main;