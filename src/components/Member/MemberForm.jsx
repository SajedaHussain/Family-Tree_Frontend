import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as memberService from "../../services/memberService";

const MemberForm = ({ updateMembers, memberToUpdate, updateOneMember }) => {
  const navigate = useNavigate();
  const { treeId } = useParams();

  const [formState, setFormState] = useState(
    memberToUpdate || {
      firstName: "",
      lastName: "",
      relation: "",
      dateOfBirth: "",
      image: "",
      generation: "",
      parentId: null,
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value === "" ? null : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formState,
      generation: Number(formState.generation),
      tree: treeId, // ⭐ أهم سطر
    };

    try {
      if (memberToUpdate && updateOneMember) {
        const updated = await memberService.update(
          memberToUpdate._id,
          payload
        );
        if (updated) updateOneMember(updated, treeId);
      } else if (updateMembers) {
        const created = await memberService.create(payload);
        if (created) updateMembers(created, treeId);
      }

      navigate(`/trees/${treeId}/members`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{memberToUpdate ? "Edit Member" : "Add Member"}</h2>

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

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default MemberForm;
