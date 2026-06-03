import "./App.scss";
import ApplicationsPage from "./pages/Application/ApplicationsPage";
import Header from "./pages/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <section className="app-container">
        
        <div> <Header/></div>
     
        <div>
          <Routes>
            <Route path="/" element={<Home/>} />        
            <Route path="/Login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/application" element={<ApplicationsPage />} />

            
          </Routes>
        </div>

      </section> 
    </Router>
  );
}

export default App;