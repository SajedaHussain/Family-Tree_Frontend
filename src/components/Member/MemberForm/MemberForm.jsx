import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as memberService from "../../services/memberService";
import "./MemberForm.css";

const MemberForm = ({ updateMembers, memberToUpdate, updateOneMember }) => {
  const navigate = useNavigate();
  const { treeId } = useParams();

  const [formState, setFormState] = useState(
    memberToUpdate ? memberToUpdate
      : {
        firstName: "",
        lastName: "",
        relation: "",
        dateOfBirth: "",
        image: "",
        generation: "",
        parentId: null,
        tree_id: "",
         code: '',
      }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value === "" ? null : value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try{
    const payload = {
      ...formState,
      generation: Number(formState.generation),
      tree: treeId, // ⭐ أهم سطر
    };
    // payload.age = Number(payload.age); // ?????
    //dateOfBirth   ,  relation , image
    if (memberToUpdate) {
      const updatedMember = await memberService.update(memberToUpdate._id, payload);
      if (updatedMember) {
        updateOneMember(updatedMember);
      
      }
    } else if(updateMembers) {
      const newMemberCreated = await memberService.create(payload);

      if (newMemberCreated) {
        updateMembers(newMemberCreated); // للحصول على اي قيمة جديدة مضافة للظهور اما باعادة رفرش للموقع او عمل ابديت
        navigate(`/members/${newMemberCreated._id}`);
      } else {
        console.log("some thing wrong");
      }

      navigate(`/trees/${treeId}/members`);
    } 
    }catch(error){
      console.log(error)
    }
  };

  return (
    <div className="member-form-container">
    <h2>{memberToUpdate ? 'Edit Member' : 'Add New Member'}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First Name"
          value={formState.firstName}
          onChange={handleChange}
          required
        />

        <input
          name="lastName"
          placeholder="Last Name"
          value={formState.lastName}
          onChange={handleChange}
          required
        />

        <select
          name="relation"
          value={formState.relation || ""}
          onChange={handleChange}
          required
        >
          <option value="">Select Relation</option>
          <option value="Grandparents">Grandparents</option>
          <option value="Parents">Parents</option>
          <option value="Son">Son</option>
          <option value="Daughter">Daughter</option>
        </select>

        <input
          type="date"
          name="dateOfBirth"
          value={formState.dateOfBirth || ""}
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          value={formState.image || ""}
          onChange={handleChange}
        />

        <input
          type="number"
          name="generation"
          placeholder="Generation"
          value={formState.generation || ""}
          onChange={handleChange}
        />

        <label htmlFor="tree_id">Family Tree:</label>{/* اختيار اسم العائله لاخذ ال ıd */}
        <select name="tree_id" value={formState.tree_id} onChange={handleChange} required>
          <option value="">Select Family</option>
          {trees && trees.map(tree => (
            <option key={tree._id} value={tree._id}>{tree.lastName} Family</option>
          ))}
        </select>

        <label htmlFor="parentId">Parent:</label>{/* اختيار اسم الاب لاخذ ال ıd */}
        <select name="parentId" value={formState.parentId} onChange={handleChange}>
          <option value="">No Parent (Grandfather)</option>
          {members.map(member => (
            <option key={member._id} value={member._id}>{member.firstName}</option>
          ))}
        </select>

        
        <label htmlFor="code"> acssec Code :</label>
        <input
          type="text"
          name="code"
          id="code"
          value={formState.code}
          onChange={handleChange}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default MemberForm;
