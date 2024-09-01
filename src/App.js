import React, { useEffect } from "react";
import './App.css';

import {
    Routes,
    Route,
    useNavigate
} from "react-router-dom";

import ChatPage from "./components/ChatPage/ChatPage.js";
import LoginPage from "./components/LoginPage/LoginPage.js";
import RegisterPage from "./components/RegisterPage/RegisterPage.js";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";

import { useDispatch, useSelector } from "react-redux";
import {
    setUser
} from "./redux/actions/user_action.js"

function App() {

    const navigate = useNavigate();
    let dispatch = useDispatch();
    const isLoading = useSelector(state => state.user.isLoading)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/");
                dispatch(setUser(user))
            }
            else {
                navigate("/login")
            }
        })
    }, [])

    if(isLoading) {
        return (
            <div>
                ...loading
            </div>
        )
    }

    else {
        return (
            <Routes>
                <Route path="/" element={<ChatPage />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/register" element={<RegisterPage />} />
            </Routes>
        );
    }
}

export default App;
