import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './Dashboard.css';

const Dashboard = ({ trees, members }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [recentTrees, setRecentTrees] = useState([]);

  useEffect(() => {
    // جلب آخر 3 أشجار مضافة كمثال
    if (trees && trees.length > 0) {
      setRecentTrees(trees.slice(-3).reverse());
    }
  }, [trees]);

  if (!user) return <h2>Loading user data...</h2>;

  return (
    <main className="dashboard-container">
      {/* ترحيب المستخدم */}
      <div className="dashboard-welcome">
        <img
          src="/images/avatar.png"
          alt="User Avatar"
          className="dashboard-avatar"
        />
        <h1>Welcome, {user.username}!</h1>
        <p>Here's a quick overview of your Family Trees.</p>
      </div>

      {/* الكروت الرئيسية */}
      <div className="dashboard-cards">
        <div className="dashboard-card" onClick={() => navigate("/trees")}>
          <h3>Total Trees</h3>
          <p>{trees.length}</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/trees")}>
          <h3>Total Members</h3>
          <p>{members.length}</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/trees/new")}>
          <h3>Add New Tree</h3>
          <p>Create a new family tree</p>
        </div>
      </div>

      {/* آخر الأشجار */}
      <div className="dashboard-recent">
        <h2>Recently Added Trees</h2>
        {recentTrees.length === 0 ? (
          <p>No trees yet. Start by adding a new tree!</p>
        ) : (
          <ul className="dashboard-tree-list">
            {recentTrees.map((tree) => (
              <li key={tree._id} onClick={() => navigate(`/trees/${tree._id}`)}>
                {tree.lastName} Family
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
