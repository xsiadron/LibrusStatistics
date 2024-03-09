import { useNavigate } from "react-router-dom"
import './Navbar.css';
import logoutIcon from '../../icons/logout.svg';
import librusStatisticsIcon from '../../icons/LibrusStatisticsIcon.png';
import { useContext } from "react"
import { AuthContext } from '../../AuthContext';
import { sampleData } from "../../modules/SampleData"

const Navbar = () => {
    const { isLogged, setIsLogged } = useContext(AuthContext);

    console.log(sampleData);

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

    function previewData() {
        const minutesToExpire = 15;
        const validSampleData = JSON.stringify({ data: sampleData, expireDate: Date.now() + minutesToExpire * 60 * 1000 })
        localStorage.setItem("data", validSampleData);
        localStorage.setItem("semester", 0);
        setIsLogged(true);
    }

    return (
        <>
            <div className='nav-placeholder'></div>
            <nav className="nav">
                <div className="title-links-section">
                    <a href="https://xsiadron.com" className="site-title">
                        <img src={librusStatisticsIcon} height={60} />
                        <div>
                            <b>xsiadron.com</b><br />
                            <small>Librus Statistics</small>
                        </div>
                    </a>
                </div>
                {!isLogged && (
                    <a className="site-preview-data" onClick={previewData}>Uruchom wersję podglądową</a>
                )}
                {isLogged && (
                    <a className="site-logout" onClick={logout}></a>
                )}
            </nav>
        </>)
}

export default Navbar;