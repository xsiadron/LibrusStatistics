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
    const librusStatisticsApi = new LibrusStatisticsApi();

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
                    const data = await librusStatisticsApi.convertData(responseData);
                    const canBeLogged = data ? true : false;

                    const minutesToExpire = 5;
                    localStorage.setItem('data', JSON.stringify({ data: data, expireDate: Date.now() + minutesToExpire * 60 * 1000 }));

                    setIsLogged(canBeLogged);
                    navigate("/");
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