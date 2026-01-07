import React from "react";
import { useState } from "react";
import * as memberService from "../../services/memberService";
import { useNavigate } from "react-router-dom";
//rafce to creac this code

const MemberForm = (props) => {
  const { updateMembers, memberToUpdate, updateOneMember, trees, members } = props;
  const navigate = useNavigate();
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
        tree_id: ""
      }
  );

  //the above line is instead of writhing :
  // THIS 100% OK TOO!!!!!
  // const [name, setName] = useState('')
  //...

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    const finalValue = value === "" ? null : value;//عشان اذا تركه فاضي يعرف القيمه null
    const newFormState = { ...formState, [name]: finalValue };

    setFormState(newFormState);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const payload = {
      ...formState,
      generation: Number(formState.generation)//  لأرقام generation لتحويل ال
    };
    // payload.age = Number(payload.age); // ?????
    //dateOfBirth   ,  relation , image
    if (memberToUpdate) {
      const updatedMember = await memberService.update(memberToUpdate._id, payload);
      if (updatedMember) {
        updateOneMember(updatedMember);
        navigate("/members");
      } else {
        console.log("something wrong");
      }
    } else {
      const newMemberCreated = await memberService.create(payload);

      if (newMemberCreated) {
        updateMembers(newMemberCreated); // للحصول على اي قيمة جديدة مضافة للظهور اما باعادة رفرش للموقع او عمل ابديت
        navigate("/members");
      } else {
        console.log("some thing wrong");
      }
    }
  };

  return (
    <div>
      Member Form
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name :</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formState.firstName}
          onChange={handleChange}
        />

        <label htmlFor="lastName">Last Name :</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formState.lastName}
          onChange={handleChange}
        />

        <label htmlFor="relation"> Relation :</label>
        <select name="relation" id="relation" value={formState.relation} onChange={handleChange}>
          <option value="">Select Relation</option>
          <option value="Grandparents">Grandparents</option>
          <option value="Parents">Parents</option>
          <option value="Son">Son</option>
          <option value="Daughter">Daughter</option>
        </select>

        <label htmlFor="dateOfBirth"> Date of Birth :</label>
        <input
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
          value={formState.dateOfBirth}
          onChange={handleChange}
        />

        <label htmlFor="image"> Picture :</label>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formState.image || ""}
          onChange={handleChange}
        />

        <label htmlFor="generation"> Generation :</label>
        <input
          type="number"
          name="generation"
          id="generation"
          value={formState.generation}
          onChange={handleChange}
        />

        <label htmlFor="tree_id">Family Tree:</label>{/* اختيار اسم العائله لاخذ ال ıd */}
        <select name="tree_id" value={formState.tree_id} onChange={handleChange} required>
          <option value="">Select Family</option>
          {trees && trees.map(t => (
            <option key={t._id} value={t._id}>{t.lastName} Family</option>
          ))}
        </select>

        <label htmlFor="parentId">Parent:</label>{/* اختيار اسم الاب لاخذ ال ıd */}
        <select name="parentId" value={formState.parentId} onChange={handleChange}>
          <option value="">No Parent (Grandfather)</option>
          {members.map(m => (
            <option key={m._id} value={m._id}>{m.firstName}</option>
          ))}
        </select>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default MemberForm;
