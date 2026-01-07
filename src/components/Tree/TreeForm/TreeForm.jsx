import React, { useState } from 'react';
import * as treeService from '../../../services/treeService';
import { useNavigate } from 'react-router';
import  "./TreeForm.css";

const TreeForm = (props) => {
  const { updateTrees, treeToUpdate, updateOneTree } = props;
  const navigate = useNavigate();

  // الحالة الافتراضية: تعديل أو إنشاء
  const [formState, setFormState] = useState(
    treeToUpdate
      ? treeToUpdate
      : { lastName: '', code: '', numFamily: 0 }
  );

  // handleChange: يدعم النصوص والأرقام
  const handleChange = (e) => {
    const { name, value } = e.target;
    const finalValue = name === 'numFamily' ? Number(value) : value;
    setFormState({ ...formState, [name]: finalValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formState };

    try {
      if (treeToUpdate && updateOneTree) {
        // حالة التعديل
        const updatedTree = await treeService.update(treeToUpdate._id, payload);
        if (updatedTree) updateOneTree(updatedTree);

      } else if (updateTrees) {
        // حالة الإضافة
        const newTree = await treeService.create(payload);
        if (newTree) updateTrees(newTree);
        navigate(`/members/new`,{ state: { selectedTreeId: newTree._id }})

      } else {
        console.log('No valid function provided for TreeForm!');
      }
      
    } catch (error) {
      console.error('Error in TreeForm submit:', error);
    }
  };

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
          min={0}
          onChange={handleChange}
          required
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TreeForm;
