import { useNavigate } from "react-router-dom";
import './Home.scss';

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="home-container" >
      <h1>Home</h1>
      <p>Welcome to the Home page!</p>
      <button onClick={() => navigate('/login')} className="btn">
        Login
      </button>
      <button onClick={() => navigate('/register')} className="btn">
        Register
        </button>
    </div>
  );
};

export default Home;
