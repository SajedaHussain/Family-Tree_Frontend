import React from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import "./TreeList.css";


const TreeList = ({ trees }) => {
  const navigate = useNavigate();

  return (
    <div className="tree-list-container">
      <h1>Tree List</h1>
      {!trees.length ? (
        <div>No Trees found</div>
      ) : (
        <ul className='tree-grid'>
          {trees.map((familyTree) => (
            <li key={familyTree._id}>
              <button onClick={() => navigate(`/trees/${familyTree._id}`)} > {familyTree.lastName} Family </button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => navigate(`/trees/new`)}>Add New Tree</button>
    </div>
  )
}

export default TreeList

