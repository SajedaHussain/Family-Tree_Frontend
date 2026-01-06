import React from "react";
//rafce
import { Link } from "react-router";

const DuckList = ({ ducks }) => {
  // insted of doing this ->  const {ducks}=props;

  return (
    <div>
      DuckList
      {
        //the code below same as if there is no ducks(?) return the div
        !ducks.length ? (
          <div>No ducks Found</div>
        ) : (
          <ul>
            {ducks.map((oneDuck) => (
              <li key={oneDuck._id}>
                <Link to={`/ducks/${oneDuck._id}`}> {oneDuck.name}</Link>
              </li>
            ))}
          </ul>
        )
      }
    </div>
  );
};

export default DuckList;
