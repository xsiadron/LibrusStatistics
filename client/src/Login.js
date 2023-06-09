import axios from "axios";
import { wrapper } from 'axios-cookiejar-support';
import "./styles/Login.css"
import { useState, createContext, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';

import { AuthContext } from "./AuthContext";

const Login = (() => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { setIsLogged } = useContext(AuthContext);

    function Loguj(e) {
        e.preventDefault();
        return new Promise((resolve) => {
            let caller = wrapper(axios.create());

            caller.post("http://localhost:4000/pobieranie", {
                "login": login,
                "password": password
            }).then(response => {
                const data = response.data;
                console.log(data);
                setIsLogged(true);
                navigate("/");
                resolve(true);
            })

            resolve(false);
        });
    }

    return (
        <section className="login">
            <h1>Login</h1>
            <form onSubmit={Loguj}>
                <div>
                    <label htmlFor="login">Email</label>
                    <input
                        type="text"
                        id="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required />
                </div>
                <div>
                    <label htmlFor="password">Hasło</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <button type="submit">Zaloguj</button>
            </form>
        </section>
    )
}
)

export default Login;