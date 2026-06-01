import { useNavigate } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      
      <div className="welcom">
        <h1>Welcome Preethika </h1>
      </div>

      <div>
        <div className="application">
          <button onClick={() => navigate("/application")} className="btn">
            + Application
          </button>
        </div>
        <div className="auth">
          <button onClick={() => navigate("/login")} className="btn">
            Login
          </button>
          <button onClick={() => navigate("/register")} className="btn">
            Register
          </button>
        </div>
      </div>

    </div>
  );
};

export default Home;
