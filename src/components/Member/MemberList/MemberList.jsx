import React from "react";
import { Link, useParams } from "react-router-dom";
import './MemberList.css'

const MemberList = ({ members }) => {
  const { treeId } = useParams();

  const treeMembers = members.filter(
    (member) =>
      member.treeId === treeId 
  );

  return (
    <div className="member-list-container">
      <h2>Family Members</h2>

      <Link to={`/trees/${treeId}/members/new`}>
        ➕ Add New Member
      </Link>

      {!treeMembers.length ? (
        <div>No members found</div>
      ) : (
        <ul>
          {treeMembers.map((oneMember) => (
            <li key={oneMember._id}>
              <Link to={`/trees/${treeId}/members/${oneMember._id}`}>
                {oneMember.firstName} {oneMember.lastName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MemberList;
