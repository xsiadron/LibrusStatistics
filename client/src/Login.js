import axios from "axios";
import { wrapper } from 'axios-cookiejar-support';
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import "./styles/Login.css"
import { AuthContext } from "./AuthContext";
import LibrusStatisticsApi from "./modules/LibrusStatisticsApi"

const Login = (() => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const librusStatisticsApi = new LibrusStatisticsApi();

    const { setIsLogged } = useContext(AuthContext);

    function Loguj(e) {
        e.preventDefault();
        return new Promise(async (resolve) => {
            let caller = wrapper(axios.create());

            caller
                .post("http://localhost:4000/", {
                    login: login,
                    password: password,
                })
                .then(async (response) => {
                    const responseData = response.data;
                    if (responseData) {
                        const data = await librusStatisticsApi.convertData(responseData);
                        
                        const minutesToExpire = 5;
                        localStorage.setItem('data', JSON.stringify({ data: data, expireDate: Date.now() + minutesToExpire * 60 * 1000 }));

                        setIsLogged(data ? true : false);
                        navigate("/");
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    resolve(false);
                });
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