import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import './Login.scss';
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    await AuthService.login(
      formData.email,
      formData.password
    );

    navigate("/");
  } catch {
    alert(
      "Invalid email or password"
    );
  }
};

  return (
    <div className="auth-page login-bg">
      <div className="auth-card">
        <center><h1>Login</h1></center>
       

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email */}
          <div className="form-group">
            
            <div className="input-wrapper">
              <Mail className="icon" />
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
           
            <div className="input-wrapper">
              <Lock className="icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>
          </div>

          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;