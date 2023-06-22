import './Navbar.css';
import logoutIcon from '../../icons/logout.svg';
import { useContext } from "react"
import { AuthContext } from '../../AuthContext';

const Navbar = () => {
    const { isLogged, setIsLogged } = useContext(AuthContext);

    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
            document.querySelector("nav").style.padding = "5px 0px";
        } else {
            document.querySelector("nav").style.padding = "20px 0px";
        }
    }

    function logout() {
        localStorage.clear();
        setIsLogged(false);
    }

    return (
        <>
            <div className='nav-placeholder'></div>
            <nav className="nav">
                <a href="/" className="site-title">Librus Statistics</a>
                {isLogged && (
                    <a href="/" className="site-logout" onClick={logout}></a>
                )}
            </nav>
        </>)
}

export default Navbar;