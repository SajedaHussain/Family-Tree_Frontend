import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import './Landing.css'; 

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  
  const [showCards, setShowCards] = useState(false);
  useEffect(() => { 
    if (user) { 
      setShowCards(true); // بعد ما يسوي Sign In/Up، الكروت تظهر
    }
  }, [user]); 
  if (user && !showCards) return null;
  return (
    <div className="landing-container">
      <h1 className="landing-title">Family Tree</h1>
      <img 
        src="/images/family-tree.png" 
        alt="Family Tree Illustration" 
        className="landing-image"
      />
      <p className="landing-description">
        Discover, explore, and build your family's story. Connect with relatives and keep your family tree alive!
      </p>
      <div className="landing-buttons">
        {!user && (
          <>
            <button onClick={() => navigate('/sign-in')} className="landing-btn">
              Sign In
            </button>
            <button onClick={() => navigate('/sign-up')} className="landing-btn">
              Sign Up
            </button>
          </>
        )}
      </div>
      {/* الكروت تظهر فقط بعد Sign In أو Sign Up */}
      {showCards && (
        <div className="landing-cards">
          <div className="landing-card">
            <h3>Build Your Tree</h3>
            <p>Add your family members and see your family history grow.</p>
          </div>
          <div className="landing-card">
            <h3>Connect Relatives</h3>
            <p>Invite your relatives to join and share family memories.</p>
          </div>
          <div className="landing-card">
            <h3>Explore History</h3>
            <p>Discover the stories of your ancestors and family heritage.</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Landing;