import { Link } from "react-router-dom";

const PersonalityList = ({ personalities }) => {
  return (
    <div>
      <h2>👥 Personalities</h2>

      {!personalities.length ? (
        <p>No personalities yet</p>
      ) : (
        <ul>
          {personalities.map((p) => (
            <li key={p._id}>
              <Link to={`/personalities/${p._id}`}>
                {p.name} – {p.personalityType}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PersonalityList;
