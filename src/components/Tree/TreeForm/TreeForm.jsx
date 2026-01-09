import React, { useEffect, useState } from 'react';
import * as treeService from '../../../services/treeService';
import { useNavigate, useParams } from 'react-router-dom';
import  "./TreeForm.css";

const TreeForm = (props) => {
  const { updateTrees, updateOneTree } = props;
  const navigate = useNavigate();

  const [treeToUpdate, setTreeToUpdate] = useState(null)
  // الحالة الافتراضية: تعديل أو إنشاء
  const [formState, setFormState] = useState(
    treeToUpdate
      ? treeToUpdate
      : { lastName: '', code: '', numFamily: 0 }
  );
  const {treeId} = useParams()


 useEffect(() => {
  async function fetchTree() {
    try {
      const data = await treeService.show(treeId);
      const treeData = data.tree ? data.tree : data;
      setTreeToUpdate(treeData);
    } catch (error) {
      console.error("Error fetching tree:", error);
    }
  }
  if (treeId) fetchTree();
}, [treeId])

  useEffect(()=>{
    setFormState(treeToUpdate
      ? treeToUpdate
      : { lastName: '', code: '', numFamily: 0 })
  },[treeToUpdate])


  // handleChange: يدعم النصوص والأرقام
  const handleChange = (event) => {
    const { name, value } = event.target;
    const finalValue = name === 'numFamily' ? Number(value) : value;
    setFormState({ ...formState, [name]: finalValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { ...formState };

  try {
    if (treeId ) {
      const updatedTree = await treeService.update(treeId, payload);
      if (updatedTree && updateOneTree) {
        updateOneTree(updatedTree);
        navigate(`/trees/${treeId}`);
      }
      
    } else {
      const newTree = await treeService.create(payload);
      if (newTree) {
        updateTrees(newTree);
        navigate(`/trees/${newTree._id}/members/new`);
      }
    }
  };

  console.log(treeToUpdate)

  return (
    
    <div className="tree-form-container">
      <h1>{treeId ? 'Edit Tree' : 'New Tree'}</h1>
      
      <form onSubmit={handleSubmit} className="tree-form">
        <label htmlFor="lastName">Family Name:</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formState.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="code">Tree Access Code:</label>
        <input
          type="text"
          name="code"
          id="code"
          value={formState.code}
          onChange={handleChange}
          required
        />

        <label htmlFor="numFamily">No. of Family Members:</label>
        <input
          type="number"
          name="numFamily"
          id="numFamily"
          value={formState.numFamily}
          min={0}
          onChange={handleChange}
          required
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};}

export default TreeForm;
