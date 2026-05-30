import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import '../Login/Login.scss';

const Register = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    console.log('Register Data:', formData);
  };

  return (
    <div className="auth-page register-bg">
      <div className="auth-card">
        <center><h1>Register</h1></center>
       

        <form onSubmit={handleSubmit} className="auth-form">

          {/* Name */}
          <div className="form-group">
            <div className="input-wrapper">
              <User className="icon" />
              <input
                type="text"
                name="fullName"
                placeholder="Enter name"
                onChange={handleChange}
                required
              />
            </div>
          </div>

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
                placeholder="Create password"
                onChange={handleChange}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <div className="input-wrapper">
              <Lock className="icon" />
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={handleChange}
                required
              />
              <span onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <EyeOff /> : <Eye />}
              </span>
            </div>
          </div>

          <button type="submit" className="btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;