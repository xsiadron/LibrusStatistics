import { Route, Routes } from "react-router-dom"
import { useState, useContext } from "react"
import './styles/App.css';
import './styles/Colors.css';
import Navbar from './components/Navbar/Navbar';
import Home from './Home';
import Login from './Login';
import { AuthContext } from "./AuthContext";

const ClearLocalStorage = () => {
	const data = localStorage.getItem("data");
	if (data) {
		const expireDate = JSON.parse(data)["expireDate"];

		if (expireDate <= Date.now()) {
			localStorage.removeItem("data");
		}
	}
};

const PrivateRoute = ({ element, path }) => {
	const data = JSON.parse(localStorage.getItem("data"));
	const { isLogged, setIsLogged } = useContext(AuthContext);
	
	if (!isLogged && data && data["data"]) setIsLogged(data ? true : false);

	return isLogged ? (
		<Home />
	) : (
		<Login />
	);
};

function App() {
	const [isLogged, setIsLogged] = useState(false);

	ClearLocalStorage();

	return (
		<div className="app">
			<AuthContext.Provider value={{ isLogged, setIsLogged }}>
				< Navbar />
				<Routes>
					<Route path="/" element={<PrivateRoute />} />
				</Routes>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
