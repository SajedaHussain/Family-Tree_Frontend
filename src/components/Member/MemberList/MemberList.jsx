import React from "react";
//rafce
import { Link } from "react-router";

const MemberList = ({ members }) => {
  // insted of doing this ->  const {ducks}=props;

  return (
    <div>
      MemberList
      {
        //the code below same as if there is no ducks(?) return the div
        !members.length ? (
          <div>No members Found</div>
        ) : (
          <ul>
            {members.map((oneMember) => (
              <li key={oneMember._id}>
                <Link to={`/members/${oneMember._id}`}> {oneMember.firstName} {oneMember.lastName}</Link>
              </li>
            ))}
          </ul>
        )
      }
    </div>
  );
};

export default MemberList;
