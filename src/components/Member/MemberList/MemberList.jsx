import React from "react";
import { Link, useParams , useNavigate } from "react-router-dom";
import './MemberList.css'

const MemberList = ({ members }) => {
  const { treeId } = useParams();
   const navigate = useNavigate();

  const treeMembers = members.filter(
    (member) =>
      member.treeId === treeId 
  );

  return (
    <div className="member-list-container">
      <h2>Family Members</h2>

      <button
        className="add-member-btn"
        onClick={() => navigate(`/trees/${treeId}/members/new`)}
      >
        ➕ Add New Member
      </button>

      {!treeMembers.length ? (
        <div>No members found</div>
      ) : (
        <ul>
          {treeMembers.map((oneMember) => (
            <li key={oneMember._id}>
              <button
                className="member-item-btn"
                onClick={() => navigate(`/trees/${treeId}/members/${oneMember._id}`)}
              ><span className="member-name">
                  {oneMember.firstName} {oneMember.lastName}
                </span>
                <span className="arrow-icon">→</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MemberList;
