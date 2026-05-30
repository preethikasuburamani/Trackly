import { useNavigate } from "react-router-dom";
// import Logo from "../../assets/Logo.png";
import './Header.scss';

// incons
import { IoHome } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { MdPlaylistAddCircle } from "react-icons/md";
import { FaCalendarDay } from "react-icons/fa";
import { FaStar } from "react-icons/fa";



const Header = () => {

    const navigate = useNavigate();
    const HandelRedirect = () => {
        navigate('/');
    }
  return (
    <div className="header-container">

        <div  className="logo" >
            {/* <h1><img src={Logo} alt="Trackly Logo" style={{ width: '400px', height: '300px' }} onClick={HandelRedirect}/></h1> */}
            <h1 onClick={HandelRedirect}>Trackly</h1>
        </div>


        <div className="nav-links">
            <nav>
                <ul>
                    <li onClick={() => navigate('/')} className="list"> <IoHome />   Dashboard</li>
                    <li onClick={() => navigate('/')} className="list"> <MdPlaylistAddCircle />  Applications</li>
                    <li onClick={() => navigate('/')} className="list"> <FaCalendarDay /> Calendar</li>
                    <li onClick={() => navigate('/')} className="list"> <FaStar /> Saved Jobs</li>
                    <li onClick={() => navigate('/')} className="list"> <IoSettingsSharp /> Settings</li>

                </ul>
            </nav>

        </div>

        <div className="profile">
            <h3>Preethika Subramani</h3>
        </div>
        
    </div>
  )
}

export default Header

