import axios from "axios";
import { wrapper } from 'axios-cookiejar-support';
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./styles/Login.css"
import { AuthContext } from "./AuthContext";
import LibrusStatisticsApi from "./modules/LibrusStatisticsApi"
import infoCircleIcon from './icons/info-circle.svg';

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
        <>
            <section className="login">
                <form onSubmit={Loguj}>
                    <h1>Logowanie</h1>
                    <div className="input-div">
                        <input
                            type="text"
                            id="login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                            placeholder=" " />
                        <label htmlFor="login">Login</label>
                        <div className="underline"></div>
                    </div>
                    <div className="input-div">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder=" " />
                        <label htmlFor="password">Hasło</label>
                        <div className="underline"></div>
                    </div>
                    <button className="login-button" type="submit">Zaloguj</button>
                    <p>Wpisz dane konta z <a href="https://portal.librus.pl/rodzina">portal.librus.pl</a> aby się poprawnie zalogować.</p>
                </form>
            </section>
            <footer className="login-footer">
                <img src={infoCircleIcon} alt="informacja" />
                &nbsp;
                <p>Nie przechowujemy żadnych danych osobistych na serwerze po zalogowaniu. Twój login i hasło są bezpieczne</p>
            </footer>
        </>
    )
})

export default Login;