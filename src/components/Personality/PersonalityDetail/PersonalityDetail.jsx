import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as personalityService from "../../../services/personalityService";
import "./PersonalityDetail.css";

const PersonalityDetail = () => {
  const { id } = useParams();
  const [personality, setPersonality] = useState(null);

  useEffect(() => {
    personalityService.show(id).then(setPersonality);
  }, [id]);

 
  return (
    <div className="personality-detail">
      <h2>🧠 Personality Details</h2>

      <div className="personality-card">
        <p><strong>Name:</strong> {personality.name}</p>
        <p><strong>Type:</strong> {personality.personalityType}</p>
        <p><strong>Occupation:</strong> {personality.occupation}</p>
      </div>

    
    </div>
  );
};

export default PersonalityDetail;
