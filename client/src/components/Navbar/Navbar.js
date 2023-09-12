import { useNavigate } from "react-router-dom"
import './Navbar.css';
import siteIcon from '../../icons/LibrusStatisticsLogo.png';
import { useContext } from "react"
import { AuthContext } from '../../AuthContext';

const Navbar = () => {
    const { isLogged, setIsLogged } = useContext(AuthContext);

    const navigate = useNavigate();

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
        localStorage.setItem("logged-out", true);
        navigate("/");
        setIsLogged(false);
    }

    return (
        <>
            <div className='nav-placeholder'></div>
            <nav className="nav">
                <div>
                    <a href="/"><img src={siteIcon} width={60} height={60}></img></a>
                    <a href="/" className="site-title">Librus Statistics</a>
                </div>
                {isLogged && (
                    <a className="site-logout" onClick={logout}></a>
                )}
            </nav>
        </>)
}

export default Navbar;