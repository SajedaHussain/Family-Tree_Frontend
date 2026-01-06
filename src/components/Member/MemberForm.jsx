import React from "react";
import { useState } from "react";
import * as memberService from "../../services/membrService";
import { useNavigate } from "react-router";
//rafce to creac this code

const MemberForm = (props) => {
  const { updateMembers, memberToUpdate, updateOneMember } = props;
  const { setMembers, members } = props;
  const navigate = useNavigate();
  const [formState, setFormState] = useState(
    memberToUpdate
      ? memberToUpdate
      : {
          firstName: "",
          lastName: "",
          gender: "",
          dateOfBirth: "",
          image: "",
          generation:""
        }
  );
  //the above line is instead of writhing :
  // THIS 100% OK TOO!!!!!
  // const [name, setName] = useState('')
  //...

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    const newFormState = { ...formState, [name]: value };

    setFormState(newFormState);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const payload = { ...formState };
    // payload.age = Number(payload.age); // ?????
    //dateOfBirth   ,  gender , image
    if (memberToUpdate) {
      const updatedMember = await memberService.update(memberToUpdate._id, payload);
      if (updatedMember) {
        updateOneMember(updatedMember);
        navigate("/");
      } else {
        console.log("something wrong");
      }
    } else {
      const newMemberCreated = await memberService.creat(payload);

      if (newMemberCreated) {
        updateMembers(newMemberCreated); // للحصول على اي قيمة جديدة مضافة للظهور اما باعادة رفرش للموقع او عمل ابديت
        navigate("/");
      } else {
        console.log("some thing wrong");
      }
    }
  };

  return (
    <div>
      Member Form
      <form onSubmit={handleSubmit}>
        <lable htmlFor="firstName">First Name :</lable>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formState.firstName}
          onChange={handleChange}
        />

        <lable htmlFor="lastName">Last Name :</lable>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formState.lastName}
          onChange={handleChange}
        />

<<<<<<< HEAD
        <lable htmlFor="gender">Ginder :</lable>
=======
        <lable htmlFor="gender"> Gender :</lable>
>>>>>>> main
        <select name="gender" id="gender" value={formState.gender} onChange={handleChange}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

<<<<<<< HEAD
        <lable htmlFor="dateOfBirth">Date of Birth :</lable>
=======
        <lable htmlFor="dateOfBirth"> Date of Birth :</lable>
>>>>>>> main
        <input
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
          value={formState.dateOfBirth}
          onChange={handleChange}
        />
<<<<<<< HEAD
        {/* to be niguatioted */}
        <input type="file" name="image" id="image" accept="image/*" onChange={handleChange} />
=======

        <lable htmlFor="image"> Picture :</lable>
        <input
          type="file"
          name="image"
          id="image"
          value={formState.image}
          onChange={handleChange}
        />
>>>>>>> main

        <lable htmlFor="generation"> Generation :</lable>
        <input
          type="text"
          name="generation"
          id="generation"
          value={formState.generation}
          onChange={handleChange}
        />


        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default MemberForm;
