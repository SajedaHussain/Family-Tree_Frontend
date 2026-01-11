import { Link } from "react-router-dom";
import "./PersonalityList.css";

const PersonalityList = ({ personalities }) => {
  return (
    <div className="personality-list-container">
      <h2>🧠 Personality Types</h2>

      <div className="personality-actions">
        <a
          href="https://www.16personalities.com/ar/اختبار-الشخصية"
          target="_blank"
          rel="noreferrer"
          className="test-btn"
        >
          🧪 Take the Test
        </a>

        <Link to="/personalities/new" className="add-btn">
          ➕ Add Personality
        </Link>
      </div>

      {!personalities.length ? (
        <p className="empty-text">No personalities yet</p>
      ) : (
        <ul className="personality-grid">
          {personalities.map((person) => (
            <li key={person._id} className="personality-card">
              <Link
                to={`/personalities/${person._id}`}
                className="personality-card-link"
              >
            


                <div className="card-body">
                  <p>
                    <strong> Member Name :</strong> {person.name}
                  </p>

                  <p>
                    <strong>Personality Type:</strong>{" "}
                    <span className="inline-badge">
                      {person.personalityType}
                    </span>
                  </p>

                  <p>
                    <strong>Occupation:</strong> {person.occupation}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PersonalityList;
