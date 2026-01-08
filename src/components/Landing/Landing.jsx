import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import './Landing.css'; 

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      // إذا المستخدم موجود، نوجهه مباشرة للداشبورد
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // إذا المستخدم موجود، يمكن لا نعرض شيء أو عرض رسالة ترحيب
  if (user) return null;

  return (
    <div className="landing-container">
      <h1 className="landing-title">Family Tree</h1>
      <div className="landing-buttons">
        <button onClick={() => navigate('/sign-in')} className="landing-btn">
          Sign In
        </button>
        <button onClick={() => navigate('/sign-up')} className="landing-btn">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Landing;
