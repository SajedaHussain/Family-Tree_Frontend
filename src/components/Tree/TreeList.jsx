import React from 'react'
import { Link } from 'react-router-dom'
import Tree from 'react-d3-tree';
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
                    <Link to={`/trees/${oneTree._id}`}>{oneTree.lastName} Family</Link>
                </li>
            ))
        }
      </ul>}
    </div>
  )
}

export default TreeList
