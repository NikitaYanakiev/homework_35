import { useState } from "react";
import axios from "axios";
import SignUpForm from "../components/SIgnUpForm/SignUpForm";
import SignInForm from "../components/SignInForm/SignInForm";
import { API_SIGN_IN, API_SIGN_UP, API_URL } from "../urls";

export default function MainPage({ handleAuth }) {
    const [signUpSuccess, setSignUpSuccess] = useState("");
    const [signUpError, setSignUpError] = useState("");
    const [signInError, setSignInError] = useState("");

    const handleSignUp = async ({ login: username, password }) => {
        try {
            const data = await axios.post(API_URL + API_SIGN_UP, {
                username,
                password,
            });
            setSignUpSuccess("Registration successful! Please sign in.");
            setSignUpError("")
            setTimeout(() => {
                setSignUpSuccess("");
            }, 5000);
            console.log(data);
        } catch (error) {
            setSignUpError("Registration error! Please try sign up again");
            setSignUpSuccess("");
            setTimeout(() => {
                setSignUpError("");
            }, 5000);
        }
    };

    const handleSignIn = async ({ login: username, password }) => {
        try {
            const { data } = await axios.post(API_URL + API_SIGN_IN, {
                username,
                password,
            });
            handleAuth(data.token);
            console.log(data);
        } catch (error) {
            setSignUpError("Incorrect password or login! Try again");
            setTimeout(() => {
                setSignUpError("");
            }, 5000);
        }
    };

    return (
        <div>
            {signUpSuccess && <p className="success">{signUpSuccess}</p>}
            {signUpError && <p className="signUperror">{signUpError}</p>}
            <SignInForm handleSignIn={handleSignIn} />
            <SignUpForm handleSignUp={handleSignUp} />
        </div>
    );
}
