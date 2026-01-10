import { Link } from "react-router-dom";

const PersonalityList = ({ personalities }) => {
  return (
    <div>
      <h2>👥 Personalities</h2>

      {!personalities.length ? (
        <p>No personalities yet</p>
      ) : (
        <ul>
          {personalities.map((person) => (
            <li key={person._id}>
              <Link to={`/personalities/${person._id}`}>
                {person.name} – {person.personalityType}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PersonalityList;
