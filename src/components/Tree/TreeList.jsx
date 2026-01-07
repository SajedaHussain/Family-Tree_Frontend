import React from 'react'
import { Link } from 'react-router-dom'

const TreeList = ({ trees }) => {
  return (
    <div>
      <h1>Tree List</h1>
      {!trees.length ? (
        <div>No Trees found</div>
      ) : (
        <ul>
          {trees.map((familyTree) => (
            <li key={familyTree._id}>
              <Link to={`/trees/${familyTree._id}`}>
                {familyTree.lastName} Family
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TreeList

