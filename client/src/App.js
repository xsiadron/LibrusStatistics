import './styles/App.css';
import './styles/Colors.css';
import Navbar from './components/Navbar/Navbar';
import Home from './Home';
import Login from './Login';
import { Route, Routes, Navigate } from "react-router-dom"
import { useState, createContext, useContext } from "react"

import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ element, path }) => {
	const { isLogged } = useContext(AuthContext);

	return isLogged ? (
		<Home />
	) : (
		<Login />
	);
};

function App() {
	const [isLogged, setIsLogged] = useState(false);

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
