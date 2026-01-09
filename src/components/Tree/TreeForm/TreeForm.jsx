import React, { useEffect, useState } from 'react';
import * as treeService from '../../../services/treeService';
import { useNavigate, useParams } from 'react-router-dom';
import  "./TreeForm.css";

const TreeForm = (props) => {
  const { updateTrees, updateOneTree } = props;
  const navigate = useNavigate();

  const [treeToUpdate, setTreeToUpdate] = useState(null)
  
  const [formState, setFormState] = useState(
    treeToUpdate
      ? treeToUpdate
      : {  lastName: '', code: '', numFamily: 1 }
  );
  const {treeId} = useParams()


  useEffect(()=>{
    async function fetchTree(){
    const data = await treeService.show(treeId)
    setTreeToUpdate(data.tree)
    }
     if (treeId) fetchTree();
}, [treeId]);


  useEffect(() => {
  if (treeToUpdate) {
    setFormState({
      lastName: treeToUpdate.lastName || '',
      code: treeToUpdate.code || '',
      numFamily: treeToUpdate.numFamily ?? 1,
    });
  } else {
    setFormState({
      lastName: '',
      code: '',
      numFamily: 1,
    });
  }
}, [treeToUpdate]);



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
    if (treeId && treeToUpdate) {
      const updatedTree = await treeService.update(treeId, payload);
      if (updatedTree && updateOneTree) {
        updateOneTree(updatedTree);
        navigate('/trees');
      }
      
    } else if (updateTrees) {
      const newTree = await treeService.create(payload);
      if (newTree) {
        updateTrees(newTree);
        navigate(`/trees/${newTree._id}/members/new`);
      }
    }

  } catch (error) {
    console.error('Error in TreeForm submit:', error);
  }
};

  console.log(treeToUpdate)

  return (
    
    <div className="tree-form-container">
      <h1>{treeToUpdate ? 'Edit Tree' : 'New Tree'}</h1>
      
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
          min={1}
          onChange={handleChange}
          required
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TreeForm;