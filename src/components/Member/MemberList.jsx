import React from "react";
import { Link, useParams } from "react-router-dom";

const MemberList = ({ members }) => {
  const { treeId } = useParams();

  //choose the member based on tree id 
  const treeMembers = members.filter(
    (member) => member.tree === treeId
  );

  return (
    <div>
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
