import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
    return(
        <div className="auth-wrapper">
            <div style={{textAlign : "center"}}>
                <h3>Register</h3>
            </div>
            <form>
                <label htmlFor="email">Email</label>
                <input
                    name="email"
                    type="email"
                    id="email"
                />

                <label htmlFor="name">Name</label>
                <input
                    name="text"
                    type="name"
                    id="name"
                />

                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    type="password"
                    id="password"
                />

                <input type="submit" disabled />
                <Link style={{color : "gray", textDecoration : "none"}} to={"/login"}>이미 아이디가 있다면...</Link>
            </form>
        </div>
    );
};

export default RegisterPage;
