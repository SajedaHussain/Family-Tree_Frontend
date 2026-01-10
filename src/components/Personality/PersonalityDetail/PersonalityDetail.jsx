import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as personalityService from "../../services/personalityService";

const PersonalityDetail = () => {
  const { id } = useParams();
  const [personality, setPersonality] = useState(null);

  useEffect(() => {
    personalityService.show(id).then(setPersonality);
  }, [id]);

  if (!personality) return <p>Loading...</p>;

  return (
    <div>
      <h2>🧠 Personality Details</h2>

      <p><strong>Name:</strong> {personality.name}</p>
      <p><strong>Type:</strong> {personality.personalityType}</p>
      <p><strong>Occupation:</strong> {personality.occupation}</p>

      <Link to="/personalities">⬅ Back</Link>
    </div>
  );
};

export default PersonalityDetail;
