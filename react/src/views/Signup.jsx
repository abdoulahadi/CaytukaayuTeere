import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null);
    
    const {setUser, setToken} = useStateContext();

    const [isLoading, setIsLoading] = useState(false);
    
    const onSubmit = (ev) => {
        setIsLoading(true);
        ev.preventDefault();

        const payload =
        {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        
        axiosClient.post('/signup',payload)
        .then(({data})=>{
            setUser(data.user)
            setToken(data.token)
            setIsLoading(false);
        })
        .catch(err=>{
            const response = err.response;

            console.log(err)
            if (response && response.status ===422){
                console.log(response.data.errors);
                setErrors(response.data.errors)
            }
            setIsLoading(false);
        })
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Create an account</h1>
                    {errors && <div className="alert">
                        {Object.keys(errors).map(key=>(
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                        </div>}
                    <input
                        ref={usernameRef}
                        type="text"
                        placeholder="Username"
                    />
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email Address "
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Password Confirmation"
                    />
                    <button className="btn btn-block">
                    {isLoading ? (
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : null}
                        <span>Signup</span>
                    </button>
                    <p className="message">
                        Already Registered ? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
