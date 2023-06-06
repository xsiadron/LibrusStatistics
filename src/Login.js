import { useState } from "react"
import "./styles/Login.css"
import { useNavigate } from "react-router-dom"
import LibrusApi from "./modules/librusApi"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function SubmitLogin(e) {
        e.preventDefault();
        let librusApi = new LibrusApi();
        const authorized = await librusApi.authorize(email, password);
        console.log(authorized);
    }

    return (
        <section className="login">
            <h1>Login</h1>
            <form onSubmit={SubmitLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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