import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <div className="landing-container">

      {/* HERO SECTION */}
      <section className="landing-hero">
        <div className="hero-text">
          <h1>Preserve Your Family Legacy</h1>
          <p>
            Build, explore, and share your family tree in one place.
            Connect generations and keep your family history alive forever.
          </p>

          {!user && (
            <div className="hero-buttons">
              <button
                className="hero-btn primary"
                onClick={() => navigate("/sign-in")}
              >
                Sign In
              </button>
              <button
                className="hero-btn secondary"
                onClick={() => navigate("/sign-up")}
              >
                Get Started
              </button>
            </div>
          )}
        </div>

        <div className="hero-image">
          <img
            src="/images/family-tree.png"
            alt="Family Tree Illustration"
          />
        </div>
      </section>

      {/* FEATURES */}
      {user && (
        <section className="landing-features">
          <h2>What You Can Do</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Build Your Tree</h3>
              <p>
                Add family members and visually grow your family tree
                with ease and clarity.
              </p>
            </div>
            <div className="feature-card">
              <h3>Invite Relatives</h3>
              <p>
                Share access securely and collaborate with your relatives
                in building your history.
              </p>
            </div>
            <div className="feature-card">
              <h3>Preserve Memories</h3>
              <p>
                Document stories, relationships, and milestones
                for future generations.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Landing;
