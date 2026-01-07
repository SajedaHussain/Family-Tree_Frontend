import React, { useState } from 'react';
import * as treeService from '../../services/treeService';
import { useNavigate } from 'react-router';

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
      } else {
        console.log('No valid function provided for TreeForm!');
      }
<<<<<<< HEAD
      else {
        console.log('something went wrong')
      }
    }else {

      const newTreeCreated = await treeService.create(payload)//creating new pet

        if(newTreeCreated){

          updateTrees(newTreeCreated)
          navigate('/members/new',{ state: { selectedTreeId: newTreeCreated._id }})

        }
        else{
          console.log('something went wrong')
        }
      }
      
=======
      navigate('/trees'); // نرجع لقائمة الأشجار بعد العملية
    } catch (error) {
      console.error('Error in TreeForm submit:', error);
>>>>>>> main
    }
  };

  return (
    <div>
      <h1>{treeToUpdate ? 'Edit Tree' : 'New Tree'}</h1>
      <form onSubmit={handleSubmit}>
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
