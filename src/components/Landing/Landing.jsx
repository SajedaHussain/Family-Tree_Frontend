
import React from "react";
import { useNavigate } from "react-router-dom";
import './Landing.css'; 

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1 className="landing-title"> Family Tree</h1>
      <div className="landing-buttons">
        <button onClick={() => navigate('/signin')} className="landing-btn">
          Sign In
        </button>
        <button onClick={() => navigate('/signup')} className="landing-btn">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Landing;
