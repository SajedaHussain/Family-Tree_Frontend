import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import Particles from "react-tsparticles"; // للحركة الخلفية
import './Landing.css'; 

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // لو المستخدم مسجل دخول، يروح للداشبورد مباشرة
  useEffect(() => { 
    if (user) { 
      navigate('/dashboard'); 
    }
  }, [user, navigate]); 

  return (
    <div className="landing-container">
      {/* الخلفية الحركية */}
      <Particles
        className="particles"
        options={{
          background: { color: "#f0f7ef" },
          fpsLimit: 60,
          particles: {
            number: { value: 20 },
            color: { value: "#2d5a27" },
            shape: { type: "image", image: { src: "/images/leaf.png", width: 20, height: 20 } },
            size: { value: { min: 10, max: 20 } },
            move: { direction: "bottom", speed: 2, outModes: "out" },
            opacity: { value: 0.8 }
          }
        }}
      />

      <h1 className="landing-title">Family Tree</h1>

      <img 
        src="/images/family-tree.png" 
        alt="Family Tree Illustration" 
        className="landing-image"
      />

      <p className="landing-description">
        Discover, explore, and build your family's story. Connect with relatives and keep your family tree alive!
      </p>

      {!user && (
        <div className="landing-buttons">
          <button onClick={() => navigate('/sign-in')} className="landing-btn">
            Sign In
          </button>
          <button onClick={() => navigate('/sign-up')} className="landing-btn">
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default Landing;
