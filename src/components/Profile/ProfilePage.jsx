import { useState, useEffect } from "react";
import * as profileService from "../../services/profileService";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    personalityType: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const userProfile = await profileService.getMyProfile();
      if (userProfile) {
        setProfile(userProfile);
        setFormData(userProfile);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updated = await profileService.createOrUpdate(formData);
    setProfile(updated);
  };

  return (
    <div className="profile-container">
      <h1>{profile ? "Edit" : "Create"} Your Profile</h1>

      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </label>

        <label>
          Bio:
          <textarea name="bio" value={formData.bio} onChange={handleChange} />
        </label>

        <label>
          Personality Type:
          <input type="text" name="personalityType" value={formData.personalityType} onChange={handleChange} />
        </label>

        <label>
          Avatar URL:
          <input type="text" name="avatar" value={formData.avatar} onChange={handleChange} placeholder="Paste image URL here" />
        </label>

        <button type="submit">{profile ? "Update" : "Create"}</button>
      </form>

      {profile && (
        <div className="profile-card">
          <div className="profile-avatar">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile Avatar" />
            ) : (
              <div className="placeholder-avatar">No Image</div>
            )}
          </div>
          <div className="profile-info">
            <h2>{profile.fullName}</h2>
            <p><strong>Bio:</strong> {profile.bio}</p>
            <p><strong>Personality:</strong> {profile.personalityType}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
