import './Navbar.css';
import logoutIcon from '../../icons/logout.svg';
import { useContext } from "react"
import { AuthContext } from '../../AuthContext';

const Navbar = () => {
    const { isLogged, setIsLogged } = useContext(AuthContext);

    function logout() {
        localStorage.clear();
        setIsLogged(false);
    }

    return <nav className="nav">
        <a href="/" className="site-title">Librus Statistics</a>
        {isLogged && (
            <a href="/" className="site-logout" onClick={logout}></a>
        )}
    </nav>
}

export default Navbar;