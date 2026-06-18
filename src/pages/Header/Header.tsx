import { useNavigate } from "react-router-dom";
import "./Header.scss";

import { IoHome } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { MdPlaylistAddCircle } from "react-icons/md";
import { FaCalendarDay } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <header className="header-container">

      <div
        className="logo"
        onClick={() =>
          navigate("/dashboard")
        }
      >
        <h1>Trackly</h1>
      </div>

         <div className="nav-links">
            <nav>
                <ul>
                    <li onClick={() => navigate('/dashboard')} className="list"> <IoHome />   Dashboard</li>
                    <li onClick={() => navigate('/application')} className="list"> <MdPlaylistAddCircle />  Applications</li>
                    <li onClick={() => navigate('/calendar')} className="list"> <FaCalendarDay /> Calendar</li>
                    <li onClick={() => navigate('/saved-jobs')} className="list"> <FaStar /> Saved Jobs</li>
                    <li onClick={() => navigate('/settings')} className="list"> <IoSettingsSharp /> Settings</li>

                </ul>
            </nav>

        </div>

      <div className="profile">
        <h3>
          {user.displayName}
        </h3>
      </div>

    </header>
  );
};

export default Header;