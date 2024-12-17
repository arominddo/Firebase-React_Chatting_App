import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, updateProfile, } from "firebase/auth";
import { ref, set } from "firebase/database";
import app, { db } from "../../firebase";
import md5 from "md5";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

const RegisterPage = () => {
    const auth = getAuth(app);
    
    const [loading, setLoading] = useState(false);
    const [errorFromSubmit, setErrorFromSubmit] = useState("");

    const dispatch = useDispatch();

    const {register, watch, formState: { errors }, handleSubmit} = useForm();

    const password = useRef();
    password.current = watch("password");

    const onSubmit = async (data) => {
        try {
            
            setLoading(true);

            const createdUser = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(auth.currentUser, {
                displayName: data.name,
                photoURL: `http://gravatar.com/avatar/${md5(
                    createdUser.user.email
                )}?d=identicon`,
            });

            const userData = {
                uid : createdUser.user.uid,
                displayName : createdUser.user.displayName,
                photoURL : createdUser.user.photoURL,
            }

            dispatch(setUser(userData));

            set(ref(db, `users/${createdUser.user.uid}`), {
                name: createdUser.user.displayName,
                image: createdUser.user.photoURL,
            });
        } catch (error) {
            console.error(error);
            setErrorFromSubmit(error.message);
            setTimeout(() => {
                setErrorFromSubmit("");
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div style={{ textAlign: "center" }}>
                <h3>Register</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email</label>
                <input
                    name="email"
                    type="email"
                    id="email"
                    {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                    })}
                />
                {errors.email && <p>This email field is required</p>}

                <label htmlFor="name">Name</label>
                <input
                    name="text"
                    type="name"
                    id="name"
                    {...register("name", { required: true, maxLength: 10 })}
                />
                {errors.name && errors.name.type === "required" && (
                    <p>This name field is required</p>
                )}
                {errors.name && errors.name.type === "maxLength" && (
                    <p>Your input exceed maximum length</p>
                )}

                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    type="password"
                    id="password"
                    {...register("password", { required: true, minLength: 6 })}
                />
                {errors.password && errors.password.type === "required" && (<p>This password field is required</p>)}
                {errors.password && errors.password.type === "minLength" && (<p>Password must have at least 6 characters</p>)}

                <label htmlFor="password">Password Confirm</label>
                <input
                    name="password_confirm"
                    type="password"
                    id="password_confirm"
                    {...register("password_confirm", { required: true, validate: (value) => value === password.current })}
                />
                {errors.password_confirm && errors.password_confirm.type === "required" && (<p>This password field is required</p>)}
                {errors.password_confirm && errors.password_confirm.type === "validate" && (<p>Password does not match</p>)}

                {errorFromSubmit && <p>{errorFromSubmit}</p>}

                <input type="submit" disabled={loading} />
                <Link
                    style={{ color: "gray", textDecoration: "none" }}
                    to={"/login"}
                >
                    이미 아이디가 있다면...
                </Link>
            </form>
        </div>
    );
};

export default RegisterPage;
