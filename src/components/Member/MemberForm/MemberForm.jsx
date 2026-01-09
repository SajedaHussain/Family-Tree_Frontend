import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as memberService from "../../../services/memberService";
import "./MemberForm.css";

const MemberForm = ({ members, updateMembers, updateOneMember }) => {
  const navigate = useNavigate();
  const { treeId, memberId } = useParams();

  const [memberToUpdate, setMemberToUpdate] = useState(null)
  const [formState, setFormState] = useState(
    memberToUpdate ? memberToUpdate
      : {
        firstName: "",
        lastName: "",
        relation: "",
        dateOfBirth: "",
        image: "",
        generation: "",
        parentId: "",
        treeId: "",
        code: '',
      }
  );


  useEffect(() => {
    if (memberId) {

      const fetchMember = async () => {
        try {
          const data = await memberService.show(memberId);
          setFormState({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            relation: data.relation || "",
            dateOfBirth: data.dateOfBirth?.slice(0, 10) || "",
            image: data.image || "",
            generation: data.generation?.toString() || "",
            parentId: data.parentId?._id || data.parentId || "",
            code: "",
          });

          setMemberToUpdate(data);
        } catch (err) {
          console.error("Error fetching member:", err);
        }
      };
      fetchMember();
    } else {
      // حالة الإضافة: تصفير الفورم
      setFormState({
        firstName: "",
        lastName: "",
        relation: "",
        dateOfBirth: "",
        image: "",
        generation: "",
        parentId: "",
        treeId: treeId,
        code: "",
      });
      setMemberToUpdate(null);
    }
  }, [memberId, treeId]);


  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormState({
      ...formState,
      [name]: value || ""
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const payload = {
        ...formState,
        generation: Number(formState.generation),
        treeId: treeId,
        parentId: formState.parentId || null,
        code: formState.code,
      };

      if (memberToUpdate) {
        const updatedMember = await memberService.update(
          memberToUpdate._id,
          payload
        );
        if (updatedMember) {
          updateOneMember(updatedMember, treeId);
          navigate(`/trees/${treeId}/members`);
        }

      } else if (updateMembers) {
        const newMemberCreated = await memberService.create(payload);
        if (newMemberCreated) {
          updateMembers(newMemberCreated, treeId);
          navigate(`/trees/${treeId}/members`);
        } else {
          console.log("something wrong");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="member-form-container">
      <h2>{memberToUpdate ? 'Edit Member' : 'Add New Member'}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First Name"
          value={formState.firstName || ""}
          onChange={handleChange}
          required
        />

        <input
          name="lastName"
          placeholder="Last Name"
          value={formState.lastName || ""}
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

        {members.length !== 0 &&
          <>
            <label htmlFor="parentId">Parent:</label>{/* اختيار اسم الاب لاخذ ال ıd */}
            <select name="parentId" value={formState.parentId || ""} onChange={handleChange}>
              <option value="">No Parent (Grandfather)</option>
              {members
                .filter(memb => memb.treeId === treeId)
                .map(member => (
                  <option key={member._id} value={member._id}>{member.firstName}</option>
                ))}
            </select>
          </>
        }


        <label htmlFor="code"> acssec Code :</label>
        <input

          type="text"
          name="code"
          id="code"
          value={formState.code || ""}
          onChange={handleChange}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default MemberForm;
