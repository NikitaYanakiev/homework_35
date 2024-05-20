import axios from "axios";
import "./App.scss";
import MainPage from "./pages/MainPage";
import TodosPage from "./pages/TodosPage";
import { useState, useEffect } from "react";

function App() {
    const [currentToken, setCurrentToken] = useState( JSON.parse(localStorage.getItem("token")) || null );
    const [isAuthorized, setIsAuthorized] = useState(!!currentToken);

    useEffect(() => {
        if (currentToken) {
            setIsAuthorized(true);
        }
    }, [currentToken]);

    const handleUserSignIn = (token) => {
        console.log(`I received token: ${token}`);
        setIsAuthorized(true);
        setCurrentToken(token);
        localStorage.setItem("token", JSON.stringify(token));
    };

    const handleQuit = () => {
        setIsAuthorized(false);
        setCurrentToken(null);
        localStorage.removeItem("token");
    };

    return (
        <div className="App">
            {!isAuthorized && <MainPage handleAuth={handleUserSignIn} />}
            {isAuthorized && <TodosPage token={currentToken} handleQuit={handleQuit}/>}
        </div>
    );
}

export default App;
