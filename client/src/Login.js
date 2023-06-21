import axios from "axios";
import { wrapper } from 'axios-cookiejar-support';
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import "./styles/Login.css"
import { AuthContext } from "./AuthContext";
import LibrusStatisticsApi from "./modules/LibrusStatisticsApi"

import config from "./config/librus-config"

const Login = (() => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { isLogged, setIsLogged } = useContext(AuthContext);

    function Loguj(e) {
        e.preventDefault();
        return new Promise(async (resolve) => {
            let caller = wrapper(axios.create());

            caller.post(`${config.serverHostname}:${config.serverPort}/`, {
                login: login,
                password: password,
            }).then(async (response) => {
                const responseData = response.data;
                if (responseData) {
                    const librusStatisticsApi = new LibrusStatisticsApi(responseData);
                    const data = await librusStatisticsApi.convertData();
                    const canBeLogged = data ? true : false;

                    if (canBeLogged) {
                        const minutesToExpire = 15;
                        localStorage.setItem('data', JSON.stringify({ data: data, expireDate: Date.now() + minutesToExpire * 60 * 1000 }));
                    }
                    navigate("/");
                    setIsLogged(canBeLogged);
                    resolve(canBeLogged);
                } else {
                    resolve(false);
                }
            }).catch(resolve(false));
        });
    }

    return (
        <section className="login">
            <h1>Login</h1>
            <form onSubmit={Loguj}>
                <div>
                    <label htmlFor="login">Login</label>
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
})

export default Login;