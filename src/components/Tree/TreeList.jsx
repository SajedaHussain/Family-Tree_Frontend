import React from 'react'
import { Link } from 'react-router'
//rafce for arrow function
const TreeList = ({trees}) => {

  return (
    <div>
      <h1>Tree List</h1>
      {!trees.length ? <div>No Trees found </div> : 
        <ul>
        {
            trees.map((oneTree)=> (
                <li key={oneTree._id}>
                    <Link to={`/trees/${oneTree._id}`}>{oneTree.name}</Link>
                </li>
            ))
        }
      </ul>}
    </div>
  )
}

export default TreeList
