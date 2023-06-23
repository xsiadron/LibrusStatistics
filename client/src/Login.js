import axios from "axios";
import { wrapper } from 'axios-cookiejar-support';
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./styles/Login.css"
import { AuthContext } from "./AuthContext";
import LibrusStatisticsApi from "./modules/LibrusStatisticsApi"
import infoCircleIcon from './icons/info-circle.svg';
import exclaminationCircle from './icons/exclamination-circle.svg';

import config from "./config/librus-config"

const Login = (() => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { isLogged, setIsLogged } = useContext(AuthContext);

    window.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            this.document.querySelector(".login-button").click();
        }
    });

    function closeFooter() {
        document.querySelector(".login-footer").style.display = "none";
    }

    function showError() {
        setInputsEnabled(false);
        document.querySelector(".loader-div").classList.add("disabled");
        document.querySelector(".error-div").classList.remove("disabled");
    }

    function prepareToLogin() {
        setInputsEnabled(true);
        document.querySelector(".loader-div").classList.remove("disabled");
        document.querySelector(".error-div").classList.add("disabled");
    }

    function setInputsEnabled(enabled = false) {
        document.querySelector(".login-button").disabled = enabled;
        document.querySelector("input").disabled = enabled;
    }

    async function loginSucceed(responseData) {
        if (responseData) {
            const librusStatisticsApi = new LibrusStatisticsApi(responseData);
            const data = await librusStatisticsApi.convertData();
            const canBeLogged = data ? true : false;
            const minutesToExpire = 15;
            localStorage.setItem('data', JSON.stringify({ data: data, expireDate: Date.now() + minutesToExpire * 60 * 1000 }));
            setIsLogged(canBeLogged);
            setInputsEnabled(false);
            navigate("/");
            return true;
        } else throw new Error;
    }

    function Loguj(e) {
        e.preventDefault();
        prepareToLogin();
        return new Promise(async (resolve) => {
            let caller = wrapper(axios.create());
            caller.post(`${config.serverHostname}:${config.serverPort}/`, {
                login: login,
                password: password,
            }).then(async (response) => {
                resolve(loginSucceed(response.data));
            }).catch(() => {
                showError();
                resolve(false);
            });
        });
    }

    return (
        <section className="login">
            <form onSubmit={Loguj} autoComplete="do-not-autofill">
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
            <main>
                <div className="loader-div disabled">
                    <span className="loader"></span>
                    <p>Trwa pobieranie danych z serwera...</p>
                </div>
                <div className="error-div disabled">
                    <img src={exclaminationCircle} className="error"></img>
                    <p>Nie udało się pobrać danych z serwera :C</p>
                </div>
            </main>
            <footer className="login-footer">
                <img src={infoCircleIcon} alt="informacja" />
                &nbsp;
                <p>Nie przechowujemy żadnych danych osobistych na serwerze po zalogowaniu. Twój login i hasło są bezpieczne.</p>
                <button onClick={closeFooter}>X</button>
            </footer>
        </section>
    )
})

export default Login;